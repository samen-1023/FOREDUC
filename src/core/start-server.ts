import { User } from './../entity/user';
import { ExegesisOptions, ExegesisPluginContext } from 'exegesis';
import * as path from 'path';
import * as Koa from 'koa';
import { exegesisKoaMiddleware } from './exegesis-koa-middleware';
import logger from '../functions/logger';

import * as router from 'koa-router'
import * as multer from '@koa/multer';
import { BufferFileConverter } from './buffer-file-converter';
import { EDocumentMIMEType } from '../entity/common/enums';
import UserService from '../api/services/user.services';
import {Form} from 'multiparty';
import * as fs from 'fs/promises';
import * as xlsx from 'xlsx';
import { request } from 'http';


export default async (prefix = '') => {
  const koaMiddlewareOptions: ExegesisOptions = {
    controllers: path.resolve(__dirname, '../api/controllers'),
    controllersPattern: '**/*.controller.@(ts|js)',
    authenticators: {
      BearerAuth: (ctx: ExegesisPluginContext & { user?: User }) => {
        return (new UserService()).checkAuthToken(ctx);
      },
    },

    mimeTypeParsers: {
      'multipart/form-data': {
        parseReq: async (req, res, next) => {
          const form = new Form({
            autoFiles: true,
          });
          
          form.parse(req, async (err, fields, files) => {
            if (!err) {
              console.log(files.data);
              const {path, headers: { 'content-type': mimetype }} = files.data[0];

              const file = await fs.readFile(path, { encoding: 'utf-8' });
              console.log(mimetype);
              const container = new BufferFileConverter({
                buffer: Buffer.from(file, 'utf-8'), 
                mimetype
              });
              const json = container.toJSON();

              console.log(json)
            }
          });

          next();          
        },
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

  app.use(logger);
  
  // _.post('/upload', upload.single('document'), async (ctx) => {
  //   // const sheet = ctx.params.sheet;
  //   const file = ctx.file || ctx.request.file;
  //   const container = new BufferFileConverter(file);
  //   const json = container.toJSON();

  //   ctx.body = json;
  // });

  // app.use(_.routes())
  //   .use(_.allowedMethods());

  app.use(
    await exegesisKoaMiddleware(
      path.resolve(__dirname, '../api/openapi.yml'),
      koaMiddlewareOptions,
    ),
  );

  return app;
};
