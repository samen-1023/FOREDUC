import { dataSource } from './data-source';
import * as path from 'path';
import * as dotenv from 'dotenv';
import startServer from './core/start-server';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = +process.env.NODE_PORT || 3000;

async function start() {
  const app = await startServer();

  dataSource.initialize()
    .catch(e => console.log(e));

  app.listen(PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`Server started on http://localhost:${PORT}`)
  });
}

start();
