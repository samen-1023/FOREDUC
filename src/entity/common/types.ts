import { FindManyOptions, ObjectID } from "typeorm";
import { User } from "../User";

export interface IEducatorPersonalData {
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  SNILS: string;
  INN: string;
  email: string;
  residentialAddress: IResidentialAddress;
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

export type Payload = Pick<User, 'username' | 'role'>;

export type BaseFindFilters<E> = string | ObjectID | Partial<E>;

export type BaseFilters<E> = BaseFindFilters<E> & FindManyOptions<E>;