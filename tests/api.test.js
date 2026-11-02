import jwt from 'jsonwebtoken';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../src/server/app.js';
import { config } from '../src/server/config.js';
import { sequelize } from '../src/server/db/index.js';
import { Post, User, Video } from '../src/server/db/models.js';
import { leftoverColumns, missingColumns } from '../src/server/db/schema.js';
import { seedMissing } from '../src/server/db/seed.js';
import '../src/server/db/models.js';

const app = createApp();

// Passkeys need a real authenticator, so tests seat a user directly and hand
// the agent a session cookie signed the way the server signs one.
async function agentFor(username) {
  const [user] = await User.findOrCreate({ where: { username } });
  const token = jwt.sign({ sub: String(user.id) }, config.jwtSecret);
  return request.agent(app).set('Cookie', `session=${token}`);
}

const seat = (username, setupCode = config.setupCode) =>
  request(app).post('/api/auth/register/options').send({ username, setupCode });

describe('api', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await seedMissing();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('asks for the setup code before offering a passkey', async () => {
    expect((await seat('carol', 'wrong-code')).status).toBe(403);
    const res = await seat('carol');
    expect(res.status).toBe(200);
    expect(res.body.rp.id).toBe('localhost');
    expect(res.body.user.name).toBe('carol');
    expect(res.body.challenge).toBeTruthy();
    expect(res.headers['set-cookie'][0]).toMatch(
      /^passkey-challenge=.*HttpOnly/,
    );
  });

  it('refuses a taken name and a third seat', async () => {
    await User.create({ username: 'carol' });
    expect((await seat('carol')).status).toBe(409);
    await User.create({ username: 'dave' });
    const third = await seat('erin');
    expect(third.status).toBe(403);
    expect(third.body.error).toMatch(/Both seats/);
    await User.destroy({ where: { username: ['carol', 'dave'] } });
  });

  it('refuses a passkey response without a challenge, or from an unknown passkey', async () => {
    const stale = await request(app)
      .post('/api/auth/login/verify')
      .send({ id: 'abc', response: {} });
    expect(stale.status).toBe(400);

    const agent = request.agent(app);
    const options = await agent.post('/api/auth/login/options');
    expect(options.status).toBe(200);
    expect(options.body.rpId).toBe('localhost');
    const unknown = await agent
      .post('/api/auth/login/verify')
      .send({ id: 'not-a-known-credential', response: {} });
    expect(unknown.status).toBe(401);
  });

  it('serves the signed-in person from a session', async () => {
    const alice = await agentFor('alice');
    const me = await alice.get('/api/auth/me');
    expect(me.status).toBe(200);
    expect(me.body.user.username).toBe('alice');
    expect(Object.keys(me.body.user).sort()).toEqual([
      'createdAt',
      'id',
      'username',
    ]);
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

  it('reports a column the models expect and the database lacks', async () => {
    expect(await missingColumns()).toEqual([]);
    await sequelize.query('ALTER TABLE videos DROP COLUMN "addedById"');
    expect(await missingColumns()).toEqual(['videos.addedById']);
    await sequelize.query('ALTER TABLE videos ADD COLUMN "addedById" integer');
    expect(await missingColumns()).toEqual([]);
  });

  it('reports a required column the models no longer have', async () => {
    expect(await leftoverColumns()).toEqual([]);
    await sequelize.query(
      `ALTER TABLE "users" ADD COLUMN "passwordHash" TEXT NOT NULL DEFAULT 'x'`,
    );
    await sequelize.query(
      'ALTER TABLE "users" ALTER COLUMN "passwordHash" DROP DEFAULT',
    );
    expect(await leftoverColumns()).toEqual(['users.passwordHash']);
    await sequelize.query('ALTER TABLE "users" DROP COLUMN "passwordHash"');
  });
});
