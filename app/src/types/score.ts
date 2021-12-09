import { Winner } from './player';

// one for each player ... almost
export interface Score {
  x: number;
  o: number;
  tie: number;
}

export interface ScoreListItem {
  player: Winner;
  score: number;
}
