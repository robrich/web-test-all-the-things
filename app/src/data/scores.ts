import axios, { AxiosResponse } from 'axios';
import { Winner } from '../types/player';
import { Score } from '../types/score';

export async function getScores(): Promise<Score> {
  const res: AxiosResponse<Score> = await axios.get('/api/score');
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`Failed to get scores: ${res.status} ${res.statusText}`);
  }
  return res.data;
}

export async function updateScore(player: Winner): Promise<Score> {
  const res: AxiosResponse<Score> = await axios.post('/api/score', { player });
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`Failed to update score: ${res.status} ${res.statusText}`);
  }
  return res.data;
}

export async function clearScores(): Promise<void> {
  const res = await axios.delete('/api/score');
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`Failed to clear scores: ${res.status} ${res.statusText}`);
  }
}
