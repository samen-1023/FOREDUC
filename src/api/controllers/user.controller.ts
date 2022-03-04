import { ERoles, EDepartment } from './../../entity/common/types';
import UserService from "../services/user.services";
import { ExegesisContext } from 'exegesis';
import { User } from '../../entity/user';
import { TokenService } from '../services/Token.services';
import { hash } from 'bcryptjs';

export async function getUser(ctx: ExegesisContext) {
  const service = new UserService();
  const user = await service.getItem({
    conditions: ctx.params.path._id
  });

  return user;
}

export async function createAdmin(ctx: ExegesisContext) {
  const data = ctx.requestBody as Omit<Partial<User>, '_id' | 'createdAt' | 'updatedAt'>;
  const service = new UserService();
  const jwt = new TokenService();
  const user = await service.saveItem({
    ...data,
    password: await hash(data.password, process.env.JWT_SECRET_KEY),
    role: [ERoles.Admin],
    department: EDepartment.Any,
    accessToken: jwt.generateToken({
      username: data.username,
      department: EDepartment.Any,
      role: [ERoles.Admin]
    })
  });

  return user;
}

export async function getList(ctx: ExegesisContext) {
  const conditions = ctx.params.query as { department?: EDepartment };
  const service = new UserService();
  const users = await service.getList({ conditions });

  return users;
}

export async function updateItem(ctx: ExegesisContext) {
  const service = new UserService();
  const item = await service.saveItem({
    _id: ctx.params.path._id,
    ...ctx.requestBody
  });

  return item;
}