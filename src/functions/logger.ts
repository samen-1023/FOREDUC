import * as uuid from 'uuid';
import { TypeORMError } from 'typeorm';

export default async (ctx, next) => {
  const requestId = uuid.v4();
  const start = Date.now();

  try {
    console.log(`[REQ_START: ${ctx.method} ${ctx.url}]`);
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    ctx.set('X-Request-Id', requestId);

    console.log(
      `[REQ_END: ${ctx.method} ${ctx.url}] [STATUS: ${ctx.status}, REQ_TIME: ${ms}ms]`,
    );
  } catch (err) {
    const ms = Date.now() - start;
    console.error(
      `[REQ_END: ${ctx.method} ${ctx.url}] [STATUS: ${ctx.status}, REQ_TIME: ${ms}ms]`,
      err,
    );

    if (typeof err === 'string') {
      ctx.status = 500;
      ctx.body = { message: err };
    } else {
      ctx.status = err.status || err.statusCode || 500;
      ctx.body =
        err instanceof TypeORMError
          ? { message: err.message }
          : { message: err.message, ...err };
    }
  }
}