import { AbstractBaseService } from "../../core/abstract-base-service";
import { User } from '../../entity/user';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'bcryptjs';
import R = require("ramda");
import * as path from 'path';
import * as dotenv from 'dotenv';

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
    
    return this.saveItem({
      ...savedUser,
      accessToken: token
    })
  }
}