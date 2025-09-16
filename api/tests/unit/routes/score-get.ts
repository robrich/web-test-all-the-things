import { describe, it, expect, afterEach, vi } from 'vitest';
import { Request, Response } from 'express';
import * as scoreData from '../../../src/data/score';
import * as scoreDefault from '../../../src/services/score-default';
import { get } from '../../../src/routes/score';
import { RedisClient } from '../../../src/types/redis-client';
import { Score } from '../../../src/types/score';


describe('/routes/score#get', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should get default when Redis returns null', async () => {

    // arrange
    const defaults: Score = { x: 5, o: 10, tie: 15 };
    const redisScores: undefined = undefined;
    let actual: Score | undefined = undefined;

    vi.spyOn(scoreData, 'getScores').mockResolvedValue(redisScores);
    vi.spyOn(scoreDefault, 'default').mockReturnValue(defaults);
    const { req, res } = mockRequestResponse((body) => { actual = body; });

    // act
    await get(req, res);

    // assert
    expect(actual).toBe(defaults);
  });

  it('should return Redis content when Redis has content', async () => {

    // arrange
    const defaults: Score = { x: 5, o: 10, tie: 15 };
    const redisScores: Score = { x: 1, o: 2, tie: 3 };
    let actual: Score | undefined = undefined;

    vi.spyOn(scoreData, 'getScores').mockResolvedValue(redisScores);
    vi.spyOn(scoreDefault, 'default').mockReturnValue(defaults);
    const { req, res } = mockRequestResponse((body) => { actual = body; });

    // act
    await get(req, res);

    // assert
    expect(actual).toBe(redisScores);
  });

  function mockRequestResponse(onJsonBody: (body: Score | undefined) => void): { req: Request; res: Response } {

    const redisMock = {} as RedisClient;
    const req = {
      app: {
        get: function (_name: string): RedisClient { return redisMock; }
      }
    } as Partial<Request>;
    const res: Partial<Response> = {
      json: function (body: Score | undefined) {
        onJsonBody(body);
        return this as Response;
      }
    };

    return { req: req as Request, res: res as Response };
  }
});
