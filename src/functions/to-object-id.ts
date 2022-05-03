import { ObjectId } from "mongodb";

export function toObjectID(value: string | ObjectId) {
  if (typeof value === 'string') {
    return new ObjectId(value);
  }
  
  return value;
}