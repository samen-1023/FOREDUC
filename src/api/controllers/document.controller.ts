import { ExegesisContext } from 'exegesis';
import { EDepartment, EDocType, EFileNames, ERoles } from '../../entity/common/enums';
import { Group } from '../../entity/group';
import { DocumentService } from '../services/document.services';

export function getItem(ctx: ExegesisContext) {
  const service = new DocumentService();

  return service.getItem(ctx.params.path.id);
}

export function getList(ctx: ExegesisContext) {

}

export function createItem(ctx: ExegesisContext) {
  const data = ctx.requestBody as {
    canRead: ERoles[];
    canEdit: ERoles[];
    name: EFileNames;
    department: EDepartment;
    type: EDocType;
    groups : Group[];
    data?: string;
  };
  const service = new DocumentService();

  return service.createItem(data);
}

export function updateItem(ctx: ExegesisContext) {

}

export function deleteItem(ctx: ExegesisContext) {

}