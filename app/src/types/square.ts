import { Player } from './player';

export interface Square {
  value: Player;
  id: number;
  win: boolean;
}
