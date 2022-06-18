import { User } from './../entity/user';
import { ExegesisOptions, ExegesisPluginContext } from 'exegesis';
import * as path from 'path';
import * as Koa from 'koa';
import { exegesisKoaMiddleware } from './exegesis-koa-middleware';
import logger from '../functions/logger';

import UserService from '../api/services/user.services';
import {Form} from 'multiparty';
import { FileConverter } from './buffer-file-converter';


export default async (prefix = '') => {
  const koaMiddlewareOptions: ExegesisOptions = {
    controllers: path.resolve(__dirname, '../api/controllers'),
    controllersPattern: '**/*.controller.@(ts|js)',
    authenticators: {
      BearerAuth: (ctx: ExegesisPluginContext & { user?: User }) =>
        new UserService().checkAuthToken(ctx),
    },

    mimeTypeParsers: {
      'multipart/form-data': {
        parseReq: async (req, res, next) => {
          const form = new Form({
            autoFiles: true,
          });
          
          form.parse(req, async (err, fields, files) => {
            if (!err) {
              try {
                if (files?.data && files?.data?.[0].size !== 0) {
                  const {path, headers: { 'content-type': mimetype }} = files.data[0];
                  const container = new FileConverter(
                    path,
                    mimetype
                  );
                  const json = container.toJSON();
                  const props = Object.entries(fields).reduce((acc, [k, v]) => {
                    acc[k] = v[0];

                    return acc;
                  }, {} as Record<string, any>);
                  
                  
                  next(null, {
                    ...props,
                    data: JSON.stringify(json),
                  }); 
                } else {
                  throw new Error('FILE_IS_NOT_FOUND_OR_FILE_IS_EMPTY')
                }
              } catch (err) {
                next(err)
              }
            }
          });         
        },
      },

    },
    ignoreServers: false,
  };

  const app = new Koa();
  app.use(logger);
  app.use(
    await exegesisKoaMiddleware(
      path.resolve(__dirname, '../api/openapi.yml'),
      koaMiddlewareOptions,
    ),
  );

  return app;
};
