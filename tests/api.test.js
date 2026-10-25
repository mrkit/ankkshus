import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from '../src/server/app.js';
import { sequelize } from '../src/server/db/index.js';
import { Post, Video } from '../src/server/db/models.js';
import { seedIfEmpty } from '../src/server/db/seed.js';
import '../src/server/db/models.js';

const app = createApp();
const user = { username: 'tester', password: 'correct-horse-battery' };

async function signIn(agent) {
  await agent.post('/api/auth/signup').send(user);
  const res = await agent.post('/api/auth/login').send(user);
  return res.headers['set-cookie'];
}

describe('api', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await seedIfEmpty();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('signs up and never returns the password hash', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'alice', password: 'long-enough-pw' });
    expect(res.status).toBe(201);
    expect(res.body.user.username).toBe('alice');
    expect(JSON.stringify(res.body)).not.toMatch(/passwordHash|\$2[aby]\$/);
    expect(res.headers['set-cookie'][0]).toMatch(/^session=.*HttpOnly/);
  });

  it('rejects a duplicate username with 409', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ username: 'alice', password: 'another-pw-1' });
    expect(res.status).toBe(409);
  });

  it('rejects a wrong password and an unknown user with the same message', async () => {
    const wrong = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'not-the-pw' });
    const unknown = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nobody', password: 'not-the-pw' });
    expect(wrong.status).toBe(401);
    expect(unknown.status).toBe(401);
    expect(wrong.body).toEqual(unknown.body);
  });

  it('logs in with the right password and returns no hash', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'long-enough-pw' });
    expect(res.status).toBe(200);
    expect(res.body.user.passwordHash).toBeUndefined();
  });

  it('blocks writes without a session', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({ title: 't', date: 'd', author: 'a', article: 'x' });
    expect(res.status).toBe(401);
  });

  it('creates, partially updates and deletes a post with a session', async () => {
    const agent = request.agent(app);
    await signIn(agent);

    const created = await agent
      .post('/api/posts')
      .send({ title: 'Hello', date: 'today', author: 'me', article: 'body' });
    expect(created.status).toBe(201);

    const updated = await agent
      .put(`/api/posts/${created.body.id}`)
      .send({ title: 'Renamed' });
    expect(updated.status).toBe(200);
    expect(updated.body.title).toBe('Renamed');
    expect(updated.body.article).toBe('body');

    const deleted = await agent.delete(`/api/posts/${created.body.id}`);
    expect(deleted.status).toBe(204);
    expect(await Post.findByPk(created.body.id)).toBeNull();
  });

  it('returns 404 for a missing video and 400 for a bad id', async () => {
    const agent = request.agent(app);
    await signIn(agent);
    expect(
      (await agent.put('/api/videos/999999').send({ title: 'x' })).status,
    ).toBe(404);
    expect((await agent.delete('/api/videos/abc')).status).toBe(400);
  });

  it('rejects a video whose url is not a URL', async () => {
    const agent = request.agent(app);
    await signIn(agent);
    const res = await agent
      .post('/api/videos')
      .send({ title: 'bad', url: 'not a url' });
    expect(res.status).toBe(400);
    expect(await Video.count({ where: { title: 'bad' } })).toBe(0);
  });

  it('returns the seeded quiz with sections and questions nested', async () => {
    const res = await request(app).get('/api/quizzes');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    const [quiz] = res.body;
    expect(quiz.title).toBe('Burns Depression Checklist');
    expect(quiz.quizSections).toHaveLength(4);
    expect(quiz.quizSections[0].quizQuestions.length).toBeGreaterThan(0);
  });

  it('seeds only once', async () => {
    expect(await seedIfEmpty()).toBe(false);
  });
});
