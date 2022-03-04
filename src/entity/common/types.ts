import { FindCondition, FindManyOptions, ObjectID } from "typeorm";
import { User } from "../user";
import { BasicEntity } from "./basic-entity";

export interface IPersonalData {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  SNILS: string;
  INN: string;
  email: string;
  residentialAddress: IResidentialAddress;
  passport: IPassport;
}

export interface IPassport {
  issuedAt: string;
  issuesPlace: string;
  number: string;
  series: string;
  birthdate: string;
}

export enum EDepartment {
  Any = 'any',
  It = 'it'
}

export interface IResidentialAddress {
  real?: string;
  registration: string;
}

export enum ERoles {
  All = 'all',
  Admin = 'admin',
  Curator = 'curator',
  Educator = 'educator',
  Supervisor = 'supervisor'
}

export enum EDocType {
  // В случае, если тип документа не входит в стандартные
  Any = 'any',
  // Отчёт
  Report = 'report',
  // Ведомость
  Statement = 'statement'
}

export type BaseFilters<E extends BasicEntity> = {
  conditions: FindCondition<E> | string | Record<string, any>,
  pagination?: {
    take: number;
    skip: number;
  },
  order?: Partial<
    Record<
      keyof E,
      'ASC' | 'DESC'
    >
  >,
  select?: (keyof E)[];
  relations?: string[];
};
