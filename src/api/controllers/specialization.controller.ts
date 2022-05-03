import { ExegesisContext } from 'exegesis';
import { SpecializationService } from '../services/specialization.services';

export async function getItem(ctx: ExegesisContext) {
  const service = new SpecializationService();    

  return service.getItem(ctx.params.path.id);
}

export async function getList(ctx: ExegesisContext) {
  const service = new SpecializationService();

  return service.getList({
      conditions: {},
      pagination: {
          take: ctx.params.query?.take || 0,
          skip: ctx.params.query?.skip || 0,
      },
  });
}

export async function createItem(ctx: ExegesisContext) {
  const data = ctx.requestBody as { name: string };
  const service = new SpecializationService();

  return service.saveItem(data);
}

export async function updateItem(ctx: ExegesisContext) {
  const service = new SpecializationService();

  return service.saveItem({
      id: ctx.params.path.id,
      ...ctx.requestBody,
  });
}

export async function deleteItem(ctx: ExegesisContext) {
  const service = new SpecializationService();

  return service.deleteItem(ctx.params.path.id);
}