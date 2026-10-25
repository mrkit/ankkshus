import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../src/server/app.js';
import { sequelize } from '../src/server/db/index.js';
import { Post, Video } from '../src/server/db/models.js';
import { seedMissing } from '../src/server/db/seed.js';
import '../src/server/db/models.js';

const app = createApp();

async function agentFor(username) {
  const agent = request.agent(app);
  await agent
    .post('/api/auth/signup')
    .send({ username, password: `${username}-long-password` });
  await agent
    .post('/api/auth/login')
    .send({ username, password: `${username}-long-password` });
  return agent;
}

describe('api', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await seedMissing();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('signs up and never returns the password hash', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'carol', password: 'long-enough-pw' });
    expect(res.status).toBe(201);
    expect(res.body.user.username).toBe('carol');
    expect(JSON.stringify(res.body)).not.toMatch(/passwordHash|\$2[aby]\$/);
    expect(res.headers['set-cookie'][0]).toMatch(/^session=.*HttpOnly/);
  });

  it('rejects a duplicate username with 409', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'carol', password: 'another-pw-1' });
    expect(res.status).toBe(409);
  });

  it('rejects a wrong password and an unknown user with the same message', async () => {
    const wrong = await request(app)
      .post('/api/auth/login')
      .send({ username: 'carol', password: 'not-the-pw' });
    const unknown = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nobody', password: 'not-the-pw' });
    expect(wrong.status).toBe(401);
    expect(unknown.status).toBe(401);
    expect(wrong.body).toEqual(unknown.body);
  });

  it('keeps every read behind login', async () => {
    for (const url of [
      '/api/posts',
      '/api/videos',
      '/api/quizzes',
      '/api/users',
    ]) {
      expect((await request(app).get(url)).status).toBe(401);
    }
  });

  it('creates, updates and deletes a note, and only the author may', async () => {
    const alice = await agentFor('alice');
    const bob = await agentFor('bob');

    const created = await alice
      .post('/api/posts')
      .send({ title: 'Hello', article: 'body' });
    expect(created.status).toBe(201);
    expect(created.body.author.username).toBe('alice');

    expect(
      (await bob.put(`/api/posts/${created.body.id}`).send({ title: 'Nope' }))
        .status,
    ).toBe(403);

    const updated = await alice
      .put(`/api/posts/${created.body.id}`)
      .send({ title: 'Renamed' });
    expect(updated.body.title).toBe('Renamed');
    expect(updated.body.article).toBe('body');

    expect((await alice.delete(`/api/posts/${created.body.id}`)).status).toBe(
      204,
    );
    expect(await Post.findByPk(created.body.id)).toBeNull();
  });

  it('returns 404 for a missing video and 400 for a bad id or url', async () => {
    const alice = await agentFor('alice');
    expect(
      (await alice.put('/api/videos/999999').send({ title: 'x' })).status,
    ).toBe(404);
    expect((await alice.delete('/api/videos/abc')).status).toBe(400);
    expect(
      (await alice.post('/api/videos').send({ title: 'bad', url: 'not a url' }))
        .status,
    ).toBe(400);
    expect(await Video.count({ where: { title: 'bad' } })).toBe(0);
  });

  it('lists quizzes with sizes and the seeded Burns checklist', async () => {
    const alice = await agentFor('alice');
    const res = await alice.get('/api/quizzes');
    expect(res.status).toBe(200);
    const burns = res.body.find((q) => q.slug === 'burns');
    expect(burns.kind).toBe('checklist');
    expect(burns.sectionCount).toBe(4);
    expect(burns.questionCount).toBe(25);
    expect(burns.attemptCount).toBe(0);
  });

  it('refuses a partial checklist and saves a complete one with its total', async () => {
    const alice = await agentFor('alice');
    const quiz = (await alice.get('/api/quizzes/burns')).body;
    const questions = quiz.sections.flatMap((s) => s.questions);

    const partial = await alice.post('/api/quizzes/burns/attempts').send({
      answers: [{ questionId: questions[0].id, value: 2 }],
    });
    expect(partial.status).toBe(400);

    const full = await alice.post('/api/quizzes/burns/attempts').send({
      answers: questions.map((q, i) => ({ questionId: q.id, value: i % 5 })),
    });
    expect(full.status).toBe(201);
    expect(full.body.total).toBe(
      questions.reduce((sum, _q, i) => sum + (i % 5), 0),
    );

    const history = await alice.get('/api/quizzes/burns/attempts');
    expect(history.body).toHaveLength(1);
    expect(history.body[0].user.username).toBe('alice');

    const detail = await alice.get(`/api/quizzes/attempts/${full.body.id}`);
    expect(detail.status).toBe(200);
    expect(detail.body.answers).toHaveLength(25);

    const strip = await alice.get('/api/quizzes/attempts?weeks=4');
    expect(strip.body.map((a) => a.id)).toContain(full.body.id);
  });

  it('rejects a score outside 0 to 4 and a question from another quiz', async () => {
    const alice = await agentFor('alice');
    const quiz = (await alice.get('/api/quizzes/burns')).body;
    const questions = quiz.sections.flatMap((s) => s.questions);
    const bad = await alice.post('/api/quizzes/burns/attempts').send({
      answers: questions.map((q) => ({ questionId: q.id, value: 9 })),
    });
    expect(bad.status).toBe(400);
    const foreign = await alice.post('/api/quizzes/burns/attempts').send({
      answers: [{ questionId: 999999, value: 1 }],
    });
    expect(foreign.status).toBe(400);
  });

  it('seeds only what is missing', async () => {
    expect(await seedMissing()).toEqual({ videos: 0, quizzes: 0 });
  });
});
