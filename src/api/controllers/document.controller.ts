import { ExegesisContext } from 'exegesis';
import { EDepartment, EDocType, EFileNames, ERoles } from '../../entity/common/enums';
import { Document } from '../../entity/document';
import { Group } from '../../entity/group';
import { DocumentService } from '../services/document.services';

export function getItem(ctx: ExegesisContext) {
  const service = new DocumentService();

  return service.getItem(ctx.params.path.id);
}

export function getList(ctx: ExegesisContext) {
  const data = ctx.params.path as {
    take?: number;
    skip?: number;
    name?: EFileNames[];
    department?: EDepartment[];
    type?: EDocType[];
  };
  const service = new DocumentService();

  return service.getList({
    conditions: {
      name: data.name,
      department: data.department,
      type: data.type
    },
    pagination: {
      take: data?.take,
      skip: data?.skip,
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