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
    let actual: Score | undefined = undefined;

    setupGetScores(redisScores);
    setupScoreDefault(defaults);
    const { req, res } = mockRequestResponse((body) => {actual = body;});

    // act
    await get(req, res);

    // assert
    expect(actual).toBe(defaults);

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
    let actual: Score | undefined = undefined;

    setupGetScores(redisScores);
    setupScoreDefault(defaults);
    const { req, res } = mockRequestResponse((body) => {actual = body;});

    // act
    await get(req, res);

    // assert
    expect(actual).toBe(redisScores);

  });

  function mockRequestResponse(onJsonBody: (body: Score | undefined) => void): { req: Request; res: Response } {

    const redisMock: RedisClient = createMock<RedisClient>();
    const req: Request = createMock<Request>({
      app: {
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        get: function (name: string): RedisClient { return redisMock; }
      }
    });
    const res: Response = createMock<Response>({
      json: function (body: Score | undefined) {
        onJsonBody(body);
        return this as Response;
      }
    });

    return {req, res};
  }

  function setupGetScores(redisScores: Score | undefined): SinonStub<[], Score | undefined> {
    scoreMock = ImportMock.mockFunction(scoreData, 'getScores', redisScores) as SinonStub<[], Score | undefined>;
    return scoreMock;
  }

  function setupScoreDefault(defaults: Score): SinonStub<[], Score> {
    defaultScoreMock = ImportMock.mockFunction(scoreDefault, 'default', defaults) as SinonStub<[], Score>;
    return defaultScoreMock;
  }

});
