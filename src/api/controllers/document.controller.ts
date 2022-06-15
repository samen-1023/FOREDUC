import { ExegesisContext } from 'exegesis';
import { EDepartment, EDocType, EFileNames, ERoles } from '../../entity/common/enums';
import { Document } from '../../entity/document';
import { DocumentService } from '../services/document.services';

export function getItem(ctx: ExegesisContext) {
  const service = new DocumentService();

  return service.getItem({
    id: ctx.params.path.id,
  });
}

export function getList(ctx: ExegesisContext) {
  const service = new DocumentService();

  return service.getList({
    conditions: { ...ctx.params.query },
    pagination: {
      take: ctx.params.path?.take,
      skip: ctx.params.path?.skip,
    }
  });
}

export function createItem(ctx: ExegesisContext) {
  const data = ctx.requestBody as Partial<Document>;
  const service = new DocumentService();

  return service.createItem(data);
}

export function updateItem(ctx: ExegesisContext) {
  const data = ctx.requestBody as Partial<Document>;
  const service = new DocumentService();

  return service.saveItem({
    id: ctx.params.path.id,
    ...data,
  });
}

export function deleteItem(ctx: ExegesisContext) {
  const service = new DocumentService();

  return service.deleteItem(ctx.params.path.id);
}