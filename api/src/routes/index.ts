import { Request, Response, Router } from 'express';
import path from 'path';
import { existsSync } from 'fs';

const router = Router();
const dir = path.join(__dirname, '../public');
const index = path.join(dir, 'index.html');
const exists = existsSync(index);
const isProd = process.env.NODE_ENV === 'production';

router.get('/', function(req: Request, res: Response) {
  if (!isProd && !exists) {
    // so start-server-and-test knows the api is running
    res.send('<h1>Tic Tac Toe</h1><p>This page is replaced with the game in production.</p>');
  } else {
    res.sendFile(path.join(dir, 'index.html'));
  }
});

export default router;
