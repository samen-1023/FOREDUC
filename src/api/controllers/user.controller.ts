import { ExegesisContext, HttpError } from 'exegesis';
import { User } from '../../entity/user';
import UserService from '../services/user.services';

export function getItem(ctx: ExegesisContext) {
    const service = new UserService();

    return service.getItem({
        id: ctx.params.path.id,
    });
}

export function getList(ctx: ExegesisContext) {
    // Пока не нужно реализовывать
}

export function createItem(ctx: ExegesisContext) {
    const user = ctx.requestBody as Partial<User>;
    const service = new UserService();

    return service.saveItem(user);
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

        return {
            token: service.generateToken(user)
        };
    } catch (error) {
        console.error(error);
        throw new HttpError(403, error.message)
    }
}

export async function sign(ctx: ExegesisContext) {
    const service = new UserService();

    return service.sign(ctx.requestBody as Partial<User>);
}