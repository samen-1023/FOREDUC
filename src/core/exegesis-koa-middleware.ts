import { compileRunner, ExegesisOptions } from "exegesis";
import { ExtendableContext, Next } from "koa";
import { OpenAPIObject } from "openapi3-ts";
import R = require("ramda");


export const exegesisKoaMiddleware = async (
  openApiDoc: string | OpenAPIObject,
  options: ExegesisOptions,
): Promise<any> => {
  const exegesisRunner = await compileRunner(openApiDoc, options);
  
  return async (ctx: ExtendableContext, next: Next) => {
    const result = await exegesisRunner(ctx.req, ctx.res);

    if (result) {
      ctx.body = result.body;
      ctx.set(
        R.mapObjIndexed(
          (v, k, obj) => (obj[k] = obj[k].toString()),
          result.headers,
        ),
      );
      ctx.status = result.status;
    } else {
      ctx.status = 404;
    }

    next();
  };
};