import defaultScore from '../services/score-default';
import { Player } from '../types/player';
import { Score } from '../types/score';

export async function getScores(db: any): Promise<Score | undefined> {

  let scores: Score | undefined = undefined;
  const text = await db.get('scores');
  if (text) {
    scores = JSON.parse(text);
  }

  return scores;
}

export async function updateScore(db: any, player: Player, diff: number): Promise<Score> {

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

export async function resetScores(db: any): Promise<void> {
  await db.del('scores');
}
