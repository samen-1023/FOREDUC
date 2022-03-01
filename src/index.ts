import * as path from 'path';
import * as dotenv from 'dotenv';
import * as Koa from 'koa';
import Router = require('koa-router');
import startServer from './core/start-server';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = +process.env.NODE_PORT || 3000;

async function start() {
  const app = await startServer();

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
  });
}

start();
