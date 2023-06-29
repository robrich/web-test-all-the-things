import dotenv from 'dotenv';
import axios, { AxiosResponse } from 'axios';
import { Player } from '../../src/types/player';
import { Score } from '../../src/types/score';

dotenv.config();

const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
// TODO: trim trailing slash if needed

describe('/api/score', () => {

  it('should get and then change the current scores', async () => {

    // arrange
    const player: Player = 'x';

    // act
    const initialScores: Score = await getScores();
    const updatedScores: Score = await postScores(player);

    // assert
    expect(updatedScores.x - initialScores.x).toBe(1);
    expect(updatedScores.o - initialScores.o).toBe(0);
    expect(updatedScores.tie - initialScores.tie).toBe(0);

  });

  async function getScores(): Promise<Score> {

    // act
    const res: AxiosResponse<Score | undefined> = await axios.get<Score | undefined>(`${baseUrl}/api/score`);
    const score: Score | undefined = res.data;

    // assert
    expect(score).toBeTruthy();
    if (!score) throw new Error(`GET /api/score didn't return a value`);

    return score;
  }

  async function postScores(player: Player): Promise<Score> {

    // act
    const res: AxiosResponse<Score | undefined> = await axios.post<Score | undefined>(`${baseUrl}/api/score`, { player });
    const score: Score | undefined = res.data;

    // assert
    expect(score).toBeTruthy();
    if (!score) throw new Error(`POST /api/score didn't return a value`);

    return score;
  }

});
