import { ObjectId } from "mongodb";
import { toObjectID } from "./to-object-id";

export function transformConditions(cond: { id?: string | ObjectId } & Record<string, any>) {
  let conditions = {...cond};

  if ('id' in cond && cond.id) {
    conditions.id = toObjectID(cond.id);
  }

  return conditions;
}