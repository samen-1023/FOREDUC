import {
  ExegesisContext,
  ExegesisPluginContext,
  ExegesisPluginInstance,
  HttpError
} from 'exegesis';
import {
  StatusCodes,
  ReasonPhrases
} from 'http-status-codes';

export interface IAuthServiceOptions {
  prefix: string;
}

class AuthService implements ExegesisPluginInstance {
  private mountPrefix = '';

  constructor(opts: IAuthServiceOptions) {
    this.mountPrefix = opts.prefix || '';
  }

  async postSecurity(pluginCtx: ExegesisPluginContext) {
    // const params = await pluginCtx.getParams();
    // const query = this.mountPrefix + pluginCtx.req.url.toLowerCase();
    // const body = await pluginCtx.getRequestBody();

    // TODO: провалидировать здесь акцес-токен
    // const token = params.cookie?.token || null;

    // if (!token) {
    //   throw new HttpError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    // }
  }

  public async postController(context: ExegesisContext) {
    context.res.set('Content-Type', 'application/json; charset=utf-8');
  }
}

export const getPluginOptions = ({ prefix }) => {
  return {
    info: {
      name: 'exegesis-plugin-access-token-auth'
    },
    makeExegesisPlugin(): ExegesisPluginInstance {
      return new AuthService({ prefix });
    }
  };
}