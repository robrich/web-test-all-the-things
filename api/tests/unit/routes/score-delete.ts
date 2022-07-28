import { Request, Response } from 'express';
import { createMock } from 'ts-auto-mock';
import { ImportMock } from 'ts-mock-imports';
import { SinonStub } from 'sinon';
import * as scoreData from '../../../src/data/score';
import { del } from '../../../src/routes/score';
import { RedisClient } from '../../../src/types/redis-client';

describe('/routes/score#del', () => {
  let scoreMock!: SinonStub<[RedisClient], undefined>;

  afterEach(() => {
    if (scoreMock) {
      scoreMock.restore();
    }
  });

  it('should run redis delete', async () => {

    // arrange

    const { req, res } = mockRequestResponse();

    scoreMock = ImportMock.mockFunction(scoreData, 'resetScores') as SinonStub<[RedisClient], undefined>;

    // act
    await del(req, res);

    // assert
    expect(scoreMock.called).toBe(true);

  });

  function mockRequestResponse(): { req: Request; res: Response } {

    const redisMock: RedisClient = createMock<RedisClient>();
    const req: Request = createMock<Request>({
      app: {
        get: function (name: string) { return redisMock; }
      }
    } as Partial<Request>);
    const res: Response = createMock<Response>();

    return {req, res};
  }

});
