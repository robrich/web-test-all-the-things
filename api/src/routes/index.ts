import { Request, Response } from 'express';
import Router from 'express-promise-router';
import path from 'path';

const router = Router();
const dir = path.join(__dirname, '../public');

router.get('/', function(req: Request, res: Response) {
  res.sendFile(path.join(dir, 'index.html'));
});

export default router;
