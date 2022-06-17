import { ERoles } from './../../entity/common/enums';
import { AbstractBaseService } from "../../core/abstract-base-service";
import { User } from '../../entity/user';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'bcryptjs';
import R = require("ramda");
import * as path from 'path';
import * as dotenv from 'dotenv';
import { ExegesisPluginContext } from "exegesis";
import configs from "../../core/configs";
import { log } from 'console';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default class UserService extends AbstractBaseService<User> {
  constructor() {
    super(User); 
  }

  async checkCredentials({
    username,
    password,
  }: {username: string, password: string}): Promise<{id: string; username: string}> {
    const user = await this.repo.findOne({
      where: {
        username: username,
      },
      select: ['id', 'username', 'password']
    });

    if (!user) {
      throw new Error('CREDENTIAL_ISNT_CORRECT');
    }

    const isMatch = crypto.compare(password, user.password);

    if (isMatch) return R.pick(['id', 'username'], user);

    throw new Error('AUTH_FAILED');
  }

  generateToken(user: { id: string; username: string }) {
    return jwt.sign(user, process.env.SECRET) as string;
  }

  async sign(data: Partial<User>) {
    const user = await this.repo.findOne({
      where: {
        username: data.username
      }
    });

    if (user) throw new Error('USER_ALREADY_EXISTS');
    
    const hashPassword = crypto.hashSync(data.password, process.env.SECRET);
    
    const savedUser = await this.saveItem({
      ...data,
      password: hashPassword,
    });
    const token = this.generateToken({
      id: savedUser.id,
      username: savedUser.username,
    });
    
    return this.saveToken(token, savedUser);
  }

  async checkAuthToken(pluginCtx: ExegesisPluginContext & { user?: User }) {
    const tokenRaw = pluginCtx.req.headers.authorization;

    if (R.isNil(tokenRaw)) {
      return {
        type: 'invalid',
        statusCode: 401,
        message: 'No token provided',
      };
    }

    try {
      const token = tokenRaw.replace(/^Bearer:?\s+/i, '');
      jwt.verify(token, configs.jwt.secret);
      const jwtData = jwt.decode(token) as { id: string; username: string };
      
      if (!jwtData.id || !jwtData.username) {
        return {
          type: 'invalid',
          statusCode: 401,
          message: 'Auth token has bad payload',
        };
      }

      const user = await this.repo.findOne({
        where: {
          id: jwtData.id,
          username: jwtData.username,
        }
      });
      
      if (!user || user?.accessToken !== token) {
        return {
          type: 'invalid', 
          statusCode: 401, 
          message: 'Incorrect token'
        };
      }

      return {
        type: 'success',
        user,
        roles: user.role,
      }
    } catch (error) {
      console.log(error);

      return {
        type: 'invalid',
        statusCode: 401,
        message: 'Incorrect token',
      };
    }
  }

  async saveToken(token: string, user: Partial<User>) {
    return this.saveItem({
      ...user,
      accessToken: token,
    });
  }
}