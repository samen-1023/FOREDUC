import { ExegesisContext, HttpError } from 'exegesis';
import R = require('ramda');
import { User } from '../../entity/user';
import UserService from '../services/user.services';

export async function getItem(ctx: ExegesisContext) {
    const service = new UserService();

    return await service.getItem({
        id: ctx.params.path.id,
    }).then(
        user => R.omit(['password', 'accessToken'], user)
    );
}

export async function getList(ctx: ExegesisContext) {
    const service = new UserService();

    return await service.getList({
        conditions: { ...ctx.params.query },
        pagination: {
            take: ctx.params.path?.take,
            skip: ctx.params.path?.skip,
        }
    }).then(
        users => users.map(user =>  R.omit(['password', 'accessToken'], user))
    );
}

export function updateItem(ctx: ExegesisContext) {
    const data = ctx.requestBody as Partial<User>;
    const service = new UserService();

    return service.saveItem({
        id: ctx.params.path.id,
        ...data,
    });
}

export function deleteItem(ctx: ExegesisContext) {
    const service = new UserService();

    return service.deleteItem(ctx.params.path.id);
}

export async function login(ctx: ExegesisContext) {
    const data = ctx.requestBody as { username: string; password: string };
    const service = new UserService();   

    try {
        const user = await service.checkCredentials({
            username: data.username,
            password: data.password,
        });
        const token = service.generateToken(user);
        await service.saveToken(token, user);

        return { token };
    } catch (error) {
        console.error(error);
        throw new HttpError(403, error.message)
    }
}

export async function sign(ctx: ExegesisContext) {
    const service = new UserService();

    return service.sign(ctx.requestBody as Partial<User>);
}