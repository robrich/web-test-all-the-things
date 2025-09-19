import { describe, it, expect, afterEach, vi } from 'vitest';
import { Request, Response } from 'express';
import * as scoreData from '../../../src/data/score';
import { del } from '../../../src/routes/score';
import { RedisClient } from '../../../src/types/redis-client';


describe('/routes/score#delete', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call resetScores and return empty response', async () => {

    // arrange
    const resetScoresMock = vi.spyOn(scoreData, 'resetScores').mockResolvedValue();
    let jsonCalled = false;
    const { req, res } = mockRequestResponse(() => { jsonCalled = true; });

    // act
    await del(req, res);

    // assert
    expect(resetScoresMock).toHaveBeenCalledTimes(1);
    expect(jsonCalled).toBe(true);
  });

  function mockRequestResponse(onJson: () => void): { req: Request; res: Response } {

    const redisMock = {} as RedisClient;
    const req = {
      app: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        get: function (_name: string): RedisClient { return redisMock; }
      }
    } as Partial<Request>;
    const res: Partial<Response> = {
      json: function () {
        onJson();
        return this as Response;
      }
    };
    return { req: req as Request, res: res as Response };
  }
});
