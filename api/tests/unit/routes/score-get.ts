import { Request, Response } from 'express';
import { createMock } from 'ts-auto-mock';
import { ImportMock } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as scoreData from '../../../src/data/score';
import * as scoreDefault from '../../../src/services/score-default';
import { get } from '../../../src/routes/score';
import { RedisClient } from '../../../src/types/redis-client';
import { Score } from '../../../src/types/score';

describe('/routes/score#get', () => {
  let scoreMock!: SinonStub<[], Score | undefined>;
  let defaultScoreMock!: SinonStub<[], Score> | undefined;

  afterEach(() => {
    if (scoreMock) {
      scoreMock.restore();
    }
    if (defaultScoreMock) {
      defaultScoreMock.restore();
    }
  });

  it('should get default when Redis returns null', async () => {

    // arrange
    const defaults: Score = {
      x: 5,
      o: 10,
      tie: 15
    };
    const redisScores: undefined = undefined;
    let resBody: Score | undefined = undefined;

    scoreMock = ImportMock.mockFunction(scoreData, 'getScores', redisScores) as SinonStub<[], Score | undefined>;
    defaultScoreMock = ImportMock.mockFunction(scoreDefault, 'default', defaults) as SinonStub<[], Score>;

    const redisMock: RedisClient = createMock<RedisClient>();
    const req: Request = createMock<Request>({
      app: {
        get: function (name: string) { return redisMock; }
      }
    } as Partial<Request>);
    const res: Response = createMock<Response>({
      json: function (body: Score | undefined) {
        resBody = body;
        return this as Response;
      }
    });

    // act
    await get(req, res);
    const scores: Score | undefined = resBody;

    // assert
    expect(scores).toBe(defaults);

  });

  it('should return Redis content when Redis has content', async () => {

    // arrange
    const defaults: Score = {
      x: 5,
      o: 10,
      tie: 15
    };
    const redisScores: Score = {
      x: 1,
      o: 2,
      tie: 3
    };
    let resBody: Score | undefined = undefined;

    scoreMock = ImportMock.mockFunction(scoreData, 'getScores', redisScores) as SinonStub<[], Score | undefined>;
    defaultScoreMock = ImportMock.mockFunction(scoreDefault, 'default', defaults) as SinonStub<[], Score>;

    const redisMock: RedisClient = createMock<RedisClient>();
    const req: Request = createMock<Request>({
      app: {
        get: (name: string): RedisClient => redisMock
      }
    } as Partial<Request>);
    const res: Response = createMock<Response>({
      json: function (body: Score | undefined) {
        resBody = body;
        return this as Response;
      }
    });

    // act
    await get(req, res);
    const scores: Score | undefined = resBody;

    // assert
    expect(scores).toBe(redisScores);

  });

});
