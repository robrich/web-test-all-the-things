import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import logger from 'morgan';
import indexRouter from './routes/index';
import scoreRouter from './routes/score';
import db from './db';
import { RedisClient } from './types/redis-client';

export default async function init(): Promise<Application> {

  const app: Application = express();

  const redisClient: RedisClient = await db();
  app.set('redis', redisClient);

  app.use(logger('dev'));
  app.use(express.static(path.join(__dirname, '../public')));
  app.use('/', indexRouter);

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/score', scoreRouter);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`Error processing ${req.url}`, err);
    res.status(500).send({error: true});
  });

  return app;
}
