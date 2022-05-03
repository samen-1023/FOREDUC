import { ExegesisOptions, ExegesisPluginContext } from 'exegesis';
import * as path from 'path';
import * as Koa from 'koa';
import { exegesisKoaMiddleware } from './exegesis-koa-middleware';
import { getPluginOptions } from './auth-plugin';
import { TokenService } from '../api/services/token.services';
import { TypeORMError } from 'typeorm';
import * as uuid from 'uuid';

export default async (prefix = '') => {
  const koaMiddlewareOptions: ExegesisOptions = {
    controllers: path.resolve(__dirname, '../api/controllers'),
    controllersPattern: '**/*.controller.@(ts|js)',
    authenticators: {
      BearerAuth: (ctx: ExegesisPluginContext) =>
        new TokenService().checkToken(ctx),
    },

    plugins: [getPluginOptions({ prefix })],
    mimeTypeParsers: {
      'multipart/form-data': {
        parseReq: (_req, _res, next) => next(),
      },
    },
    ignoreServers: false,
  };

  const app = new Koa();

  app.use(async (ctx, next) => {
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
  });

  app.use(
    await exegesisKoaMiddleware(
      path.resolve(__dirname, '../api/openapi.yml'),
      koaMiddlewareOptions,
    ),
  );

  return app;
};
