import { ExegesisContext } from 'exegesis';
import { Group } from '../../entity/group';
import { GroupService } from '../services/group.services';

export async function getItem(ctx: ExegesisContext) {
    const service = new GroupService();    

    return service.getItem({
        id: ctx.params.path.id
    });
}

export async function getList(ctx: ExegesisContext) {
    const service = new GroupService();

    return service.getList({
        conditions: {},
        pagination: {
            take: ctx.params.path?.take,
            skip: ctx.params.path?.skip,
        },
    });
}

export async function createItem(ctx: ExegesisContext) {
    const data = ctx.requestBody as Partial<Group>;
    const service = new GroupService();

    return service.saveItem(data);
}

export async function updateItem(ctx: ExegesisContext) {
    const service = new GroupService();

    return service.saveItem({
        id: ctx.params.path.id,
        ...ctx.requestBody,
    });
}

export async function deleteItem(ctx: ExegesisContext) {
    const service = new GroupService();

    return service.deleteItem(ctx.params.path.id);
}