import { ExegesisOptions, ExegesisPluginContext } from 'exegesis';
import * as path from 'path';
import * as Koa from 'koa';
import { exegesisKoaMiddleware } from './exegesis-koa-middleware';
import { getPluginOptions } from './auth-plugin';
import { TokenService } from '../api/services/token.services';

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
    ignoreServers: true,
  };

  const app = new Koa();

  app.use(
    await exegesisKoaMiddleware(
      path.resolve(__dirname, '../api/openapi.yml'),
      koaMiddlewareOptions,
    ),
  );

  return app;
};
