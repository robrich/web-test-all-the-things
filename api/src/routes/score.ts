import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { getScores, updateScore, resetScores } from '../data/score';
import defaultScore from '../services/score-default';
import { Player, players } from '../types/player';
import { RedisClient } from '../types/redis-client';
import { Score } from '../types/score';

const router = Router();

router.get('/', get);
export async function get(req: Request, res: Response) {
  const db: RedisClient = req.app.get('redis');
  const scores: Score = await getScores(db) ?? defaultScore();
  res.json(scores);
}

router.post('/', post);
export async function post(req: Request, res: Response) {
  const db: RedisClient = req.app.get('redis');
  const player: Player = req.body.player;
  if (!player || players.indexOf(player) === -1) {
    res.status(400);
    res.json({error: 'please set a valid player: x, o, or tie'});
    return;
  }
  const scores: Score = await updateScore(db, player, 1);
  res.json(scores);
}

router.delete('/', del);
export async function del(req: Request, res: Response) {
  const db: RedisClient = req.app.get('redis');
  await resetScores(db);
  res.json();
}

export default router;
