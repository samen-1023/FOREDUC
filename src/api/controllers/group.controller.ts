import { ExegesisContext } from 'exegesis';
import { Group } from '../../entity/group';
import { GroupService } from '../services/group.services';

export async function getItem(ctx: ExegesisContext) {
    const service = new GroupService();

    return service.getItem({
        conditions: ctx.params.path.id
    })
}

export async function getList(ctx: ExegesisContext) {
    const pagination = ctx.params.query as {
        take?: number;
        skip?: number;
    }
    const service = new GroupService();

    return service.getList({
        conditions: {},
        pagination: {
            take: pagination?.take,
            skip: pagination?.skip,
        }
    });
}

export async function createItem(ctx: ExegesisContext) {
    const data = ctx.requestBody as { name: string };
    const service = new GroupService();

    return service.saveItem(data);
}

export async function updateItem(ctx: ExegesisContext) {

}

export async function deleteItem(ctx: ExegesisContext) {

}