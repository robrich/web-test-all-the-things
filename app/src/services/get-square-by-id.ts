import { Square } from '../types/square';
import { Player } from '../types/player';

export function getSquareById(squares: Square[], id: number): Square | undefined {
  return squares.find(s => s.id === id);
}

export function getSquarePlayerById(squares: Square[], id: number): Player {
  return squares.find(s => s.id === id)?.value ?? undefined;
}
