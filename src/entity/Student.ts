import { Group } from './group';
import { IPersonalData } from './common/types';
import { Column, Entity } from "typeorm";
import { BasicEntity } from "./common/basic-entity";
import { Specialization } from './specialization';

@Entity()
export class Student extends BasicEntity {
  @Column(type => Specialization)
  specialization: Specialization;

  @Column(type => Group)
  group: Group;

  @Column('jsonb')
  personalData: IPersonalData;

  @Column({ type: 'varchar', nullable: true })
  creditCardNum?: string;
}