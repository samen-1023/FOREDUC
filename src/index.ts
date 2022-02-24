import { resolve } from 'path';
import * as dotenv from 'dotenv';
import * as Koa from 'koa';

dotenv.config({ path: resolve(__dirname, '../.env') });

const app = new Koa();
app.listen(3000);