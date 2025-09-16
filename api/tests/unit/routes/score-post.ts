import { describe, it, expect, afterEach, vi } from 'vitest';
import { Request, Response } from 'express';
import * as scoreData from '../../../src/data/score';
import { post } from '../../../src/routes/score';
import { RedisClient } from '../../../src/types/redis-client';
import { Player } from '../../../src/types/player';
import { Score } from '../../../src/types/score';


describe('/routes/score#post', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  ['invalid', undefined].forEach((p: string | undefined) => {

    const player: Player = p as Player; // invalid value

    it('should return 400 on invalid player: ' + player, async () => {

      // arrange
      const expectedStatus = 400;
      let resStatus: number = 0;
      let jsonBody: Score | undefined | { error: string } = undefined;

      const { req, res } = mockRequestResponse({
        player,
        onJsonBody: (body) => { jsonBody = body; },
        onStatus: (status) => { resStatus = status; }
      });

      // act
      await post(req, res);

      // assert
      expect(jsonBody).toStrictEqual({ error: 'please set a valid player: x, o, or tie' });
      expect(resStatus).toBe(expectedStatus);
    });
  });

  it('should call redis and update score on valid player', async () => {

    // arrange
    const player: Player = 'x';
    const expectedStatus = 0;
    let jsonBody: Score | undefined | { error: string } = undefined;
    let resStatus: number = 0;

    const redisScores: Score = { x: 1, o: 0, tie: 0 };
    vi.spyOn(scoreData, 'updateScore').mockImplementation(async (db: RedisClient, p: Player, num: number) => {
      // assert
      expect(p).toBe(player);
      expect(num).toBe(1);
      return redisScores;
    });

    const { req, res } = mockRequestResponse({
      player,
      onJsonBody: (body) => { jsonBody = body; },
      onStatus: (status) => { resStatus = status; }
    });

    // act
    await post(req, res);

    // assert
    expect(jsonBody).toBe(redisScores);
    expect(resStatus).toBe(expectedStatus);
  });

  interface MockRequestResponseParams {
    player: Player;
    onJsonBody: (body: Score | undefined | { error: string }) => void;
    onStatus: (status: number) => void;
  }

  function mockRequestResponse({player, onJsonBody, onStatus}: MockRequestResponseParams): { req: Request; res: Response } {

    const redisMock = {} as RedisClient;
    const req = {
      app: {
        get: function (_name: string) { return redisMock; }
      },
      body: {
        player
      }
    } as Partial<Request>;
    const res: Partial<Response> = {
      json: function (body: Score | undefined) {
        onJsonBody(body);
        return this as Response;
      },
      status: function (status: number) {
        onStatus(status);
        return this as Response;
      }
    };

    return { req: req as Request, res: res as Response };
  }
});
