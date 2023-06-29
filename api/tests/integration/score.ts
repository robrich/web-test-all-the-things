import dotenv from 'dotenv';
import { Application } from 'express';
import request, { Response } from 'supertest';
import appInit from '../../src/app';
import { Player } from '../../src/types/player';
import { RedisClient } from '../../src/types/redis-client';
import { Score } from '../../src/types/score';

dotenv.config();

describe('/api/score', () => {
  let app: Application;

  beforeAll(async () => {
    // FRAGILE: ASSUME: Redis is running and connection is defined in .env or env vars
    app = await appInit();
  });
  afterAll(async () => {
    if (app) {
      // close the database connection, avoids passed tests but suite times out and fails
      const db: RedisClient = app.get('redis');
      await db.quit();
    }
  });

  it('should get and then change the current scores', async () => {

    // arrange
    const player: Player = 'x';

    // act
    const initialScores: Score = await getScores(app);
    const updatedScores: Score = await postScores(app, player);

    // assert
    expect(updatedScores.x - initialScores.x).toBe(1);
    expect(updatedScores.o - initialScores.o).toBe(0);
    expect(updatedScores.tie - initialScores.tie).toBe(0);

  });

  async function getScores(app: Application): Promise<Score> {

    // act
    const res: Response = await request(app)
      .get('/api/score');
    const score: Score | undefined = res.body as Score | undefined;

    // assert
    expect(score).toBeTruthy();
    if (!score) throw new Error(`GET /api/score didn't return a value`);

    return score;
  }

  async function postScores(app: Application, player: Player): Promise<Score> {

    // act
    const res: Response = await request(app)
      .post('/api/score')
      .send({player});
    const score: Score | undefined = res.body as Score | undefined;

    // assert
    expect(score).toBeTruthy();
    if (!score) throw new Error(`POST /api/score didn't return a value`);

    return score;
  }

});
