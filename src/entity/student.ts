import { Group } from './group';
import { IPersonalData } from './common/types';
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BasicEntity } from "./common/basic-entity";
import { Specialization } from './specialization';

@Entity()
export class Student extends BasicEntity {
  @Column('jsonb')
  personalData: IPersonalData;

  @Column('varchar', { nullable: true })
  creditCard?: string;

  @ManyToOne(() => Specialization, specialization => specialization.students)
  @JoinColumn()
  specialization: Specialization;

  @ManyToOne(() => Group, group => group.students)
  @JoinColumn()
  group: Group;
}
