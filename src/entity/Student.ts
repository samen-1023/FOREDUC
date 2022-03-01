import { IResidentialAddress, IPassport } from './common/types';
import { Entity } from "typeorm";
import { BasicEntity } from "./common/BasicEntity";

@Entity()
export class Student extends BasicEntity {
  surname: string;
  name: string;
  patronymic: string;
  SNILS: string;
  INN: string;
  email: string;
  phone: string;
  specialization: string;
  group: string;
  creditCardNum: string;
  residentialAddress: IResidentialAddress;
  passport: IPassport;
}