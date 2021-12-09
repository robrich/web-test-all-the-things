import { Score, ScoreListItem } from '../types/score';

export default function scoreToList(score: Score | undefined): ScoreListItem[] {
  if (!score) {
    return []; // don't blow up for a blank list
  }

  const scoreList: ScoreListItem[] = [
    { player: 'x', score: score.x },
    { player: 'o', score: score.o },
    { player: 'tie', score: score.tie }
  ];

  // sort with winner at the top:
  scoreList.sort((a, b) => b.score - a.score);

  return scoreList;
}
