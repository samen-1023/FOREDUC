import { ExegesisOptions, ExegesisPluginContext } from 'exegesis';
import * as path from 'path';
import * as Koa from 'koa';
import { exegesisKoaMiddleware } from './exegesis-koa-middleware';
import { getPluginOptions } from './auth-plugin';
import { TokenService } from '../api/services/token.services';
import { TypeORMError } from 'typeorm';
import * as uuid from 'uuid';
import * as router from 'koa-router'
import * as multer from '@koa/multer';
import { BufferFileConverter } from './buffer-file-converter';
import { EDocumentMIMEType } from '../entity/common/enums';

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
  const _ = new router();
  const upload = multer({
    fileFilter: (req, file, cb) => {
      switch(file.mimetype) {
        case EDocumentMIMEType.xlsx:
        case EDocumentMIMEType.xls:
        case EDocumentMIMEType.xml:
        case EDocumentMIMEType.json:
          cb(null, true);
          break;
        default:
          cb(new Error('MIMETYPE_IS_NOT_SUPPORTED'), false);
          break;
      }
    }
  });

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
  
  _.post('/upload', upload.single('document'), async (ctx) => {
    const file = ctx.file;
    const container = new BufferFileConverter(file);

    console.log('ctx.request.file', ctx.request.file);
    console.log('ctx.file', ctx.file);

    ctx.body = container.toJSON();
  });

  app.use(_.routes())
    .use(_.allowedMethods());

  app.use(
    await exegesisKoaMiddleware(
      path.resolve(__dirname, '../api/openapi.yml'),
      koaMiddlewareOptions,
    ),
  );

  return app;
};
