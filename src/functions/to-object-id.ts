import { ObjectID } from 'typeorm';

export function toObjectID(value: string | ObjectID) {
  if (typeof value === 'string') {
    return new ObjectID(value);
  }
  
  return value;
}