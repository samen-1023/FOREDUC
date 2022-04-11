import { FindConditions } from "typeorm";
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

export interface IResidentialAddress {
  real?: string;
  registration: string;
}

export type BaseFilters<E extends BasicEntity> = {
  conditions: FindConditions<E> | string | Record<string, any>,
  pagination?: {
    take?: number;
    skip?: number;
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
