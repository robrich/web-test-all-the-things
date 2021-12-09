import { Score } from '../types/score';

export default function defaultScore(): Score {
  return {
    x: 0,
    o: 0,
    tie: 0
  };
}
