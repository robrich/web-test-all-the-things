import axios, { AxiosResponse } from 'axios';
import { Winner } from '../types/player';
import { Score } from '../types/score';

export async function getScores(): Promise<Score> {
  const res: AxiosResponse<Score> = await axios.get('/api/score');
  // TODO: check status code
  return res.data;
}

export async function updateScore(player: Winner): Promise<Score> {
  const res: AxiosResponse<Score> = await axios.post('/api/score', { player });
  // TODO: check status code
  return res.data;
}

export async function clearScores(): Promise<void> {
  await axios.delete('/api/score');
  // TODO: check status code
}
