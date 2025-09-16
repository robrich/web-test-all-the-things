import defaultScore from '../services/score-default';
import { Player } from '../types/player';
import { RedisClient } from '../types/redis-client';
import { Score } from '../types/score';

export async function getScores(db: RedisClient): Promise<Score | undefined> {

  let scores: Score | undefined = undefined;
  const text = await db.get('scores');
  if (text) {
    scores = JSON.parse(text);
  }

  return scores;
}

export async function updateScore(db: RedisClient, player: Player, diff: number): Promise<Score> {

  let scores: Score;
  const text = await db.get('scores');
  if (text) {
    scores = JSON.parse(text);
  } else {
    scores = defaultScore();
  }
  scores[player] += diff;
  await db.set('scores', JSON.stringify(scores));

  return scores;
}

export async function resetScores(db: RedisClient): Promise<void> {
  await db.delete('scores');
}
