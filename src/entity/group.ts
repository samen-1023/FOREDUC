import { User } from './user';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BasicEntity } from "./common/basic-entity";
import { Student } from './student';

@Entity()
export class Group extends BasicEntity {
  @Column('varchar')
  name: string;

  @OneToMany(() => Student, student => student.group)
  students: Student[];

  @ManyToOne(() => User, user => user.groups)
  @JoinColumn()
  user: User;
}
