import { ObjectId } from 'mongodb';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { MongoFindOneOptions } from 'typeorm/find-options/mongodb/MongoFindOneOptions';
import { BasicEntity } from "./basic-entity";

export interface IPersonalData {
  surname: string;
  name: string;
  patronymic?: string;
  phone: string;
  SNILS?: string;
  INN?: string;
  email: string;
  residentialAddress: IResidentialAddress;
  passport: IPassport;
}

export interface IPassport {
  issuedAt: string;
  issuesPlace: string;
  number: string;
  series?: string;
  birthdate: string;
}

export interface IResidentialAddress {
  real?: string;
  registration: string;
}

export type BaseFilters<E extends BasicEntity> = {
  conditions: ObjectId | string | Record<string, any> | MongoFindOneOptions<E> | MongoFindManyOptions<E> ,
  pagination?: {
    take?: number;
    skip?: number;
  },
  select?: (keyof E)[];
  relations?: string[];
};

export type BaseFindOneOptions<E extends BasicEntity> = {
  id: string | ObjectId;
  select?: (keyof E)[];
  relations?: string[];
}
