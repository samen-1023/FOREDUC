import { ExegesisContext } from 'exegesis';
import { Student } from '../../entity/student';
import { StudentService } from '../services/student.services';

export function getItem(ctx: ExegesisContext) {
  const service = new StudentService();

  return service.getItem(ctx.params.path.id);
}

export async function getList(ctx: ExegesisContext) {
  const service = new StudentService();

  return service.getList({
    conditions: { ...ctx.params.query },
    pagination: {
      take: ctx.params.query?.take || 0,
      skip: ctx.params.query?.skip || 0,
    }
  });
}

export function createItem(ctx: ExegesisContext) {
  const data = ctx.requestBody as Partial<Student>;
  const service = new StudentService();

  return service.saveItem(data);
}

export function updateItem(ctx: ExegesisContext) {
  const data = ctx.requestBody as Partial<Student>;
  const service = new StudentService();

  return service.saveItem({
    id: ctx.params.path.id,
    ...data,
  });
}

export function deleteItem(ctx: ExegesisContext) {
  const service = new StudentService();

  return service.deleteItem(ctx.params.path.id);
}