import { Request, Response } from 'express';
import { createMock } from 'ts-auto-mock';
import { ImportMock } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as scoreData from '../../../src/data/score';
import { post } from '../../../src/routes/score';
import { RedisClient } from '../../../src/types/redis-client';
import { Player } from '../../../src/types/player';
import { Score } from '../../../src/types/score';

describe('/routes/score#post', () => {
  let scoreMock!: SinonStub<[RedisClient, Player, number], Score>;

  afterEach(() => {
    if (scoreMock) {
      scoreMock.restore();
    }
  });

  ['invalid', undefined].forEach((p: string|undefined) => {
    const player: Player = p as Player; // invalid value

    it('should return 400 on invalid player: '+player, async () => {

      // arrange
      let expectedStatus = 400;
      let resStatus: number = 0;

      const redisMock: RedisClient = createMock<RedisClient>();
      const req: Request = createMock<Request>({
        app: {
          get: function (name: string) { return redisMock; }
        },
        body: {
          player
        }
      } as Partial<Request>);
      const res: Response = createMock<Response>({
        status: function (status: number) {
          resStatus = status;
          return this as Response;
        }
      });

      // act
      await post(req, res);

      // assert
      expect(resStatus).toBe(expectedStatus);

    });

  });

  it('should call redis and update score on valid player', async () => {

    // arrange
    const player: Player = 'x';
    let resBody: Score | undefined = undefined;

    const redisScores: Score = createMock<Score>();
    scoreMock = ImportMock.mockFunction(scoreData, 'updateScore') as SinonStub<[RedisClient, Player, number], Score>;
    scoreMock.callsFake((db: RedisClient, p: Player, num: number) => {
      // assert
      expect(p).toBe(player);
      expect(num).toBe(1);
      return redisScores;
    });

    const redisMock: RedisClient = createMock<RedisClient>();
    const req: Request = createMock<Request>({
      app: {
        get: function (name: string) { return redisMock; }
      },
      body: {
        player
      }
    } as Partial<Request>);
    const res: Response = createMock<Response>({
      json: function (body: Score | undefined) {
        resBody = body;
        return this as Response;
      }
    });

    // act
    await post(req, res);
    const scores: Score | undefined = resBody;

    // assert
    expect(scores).toBe(redisScores);

  });

});
