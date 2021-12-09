import { Square } from '../types/square';

export default function checkStalemate(squares: Square[]): boolean {
  const unplayed = squares.filter(s => s.value === undefined);
  return unplayed.length === 0;
}
