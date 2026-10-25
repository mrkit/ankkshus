import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import { config } from './config.js';
import { errorHandler, notFound } from './middleware/errors.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import quizzesRouter from './routes/quizzes.js';
import videoChannelsRouter from './routes/videoChannels.js';
import videosRouter from './routes/videos.js';

const distDir = fileURLToPath(new URL('../../dist', import.meta.url));

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  if (!config.isProd) app.use(morgan('dev'));
  app.use(express.json({ limit: '100kb' }));
  app.use(cookieParser());

  app.use('/api/auth', authRouter);
  app.use('/api/posts', postsRouter);
  app.use('/api/videos', videosRouter);
  app.use('/api/video-channels', videoChannelsRouter);
  app.use('/api/quizzes', quizzesRouter);
  app.use('/api', notFound);

  // In production the built site is served by this process. In development Vite serves it.
  if (existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get('/luci', (_req, res) =>
      res.sendFile('luci.html', { root: distDir }),
    );
    app.get('/{*splat}', (_req, res) =>
      res.sendFile('index.html', { root: distDir }),
    );
  }

  app.use(errorHandler);
  return app;
}
