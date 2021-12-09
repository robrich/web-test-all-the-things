import dotenv from 'dotenv';
import { Application } from 'express';
import http, { Server } from 'http';
import appInit from './app';

dotenv.config();

const main = async () => {

  const port = parseInt(process.env.PORT || '3000', 10);
  const app: Application = await appInit();
  app.set('port', port);
  const server: Server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Listening on http://+:${port}`);
  }).on('error', (e: Error) => {
    console.log(`Error starging on ${port}`, e);
  });

};
main();
