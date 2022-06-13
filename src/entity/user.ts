import { Group } from './group';
import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToMany, OneToMany } from "typeorm";
import { BasicEntity } from "./common/basic-entity";
import { IPersonalData } from "./common/types";
import { EDepartment, ERoles } from "./common/enums";

@Entity()
export class User extends BasicEntity {
  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @Column('enum', { nullable: true, enum: ERoles, array: true })
  role?: ERoles[];

  @Column('varchar', { nullable: true })
  accessToken?: string;

  @Column('enum', { nullable: true, enum: EDepartment })
  department?: EDepartment;

  @OneToMany(() => Group, group => group.user)
  groups?: Group[];

  @Column('jsonb', { nullable: true })
  personalData?: IPersonalData;

  @BeforeInsert()
  @BeforeUpdate()
  toLowerCaseUsername() {
    this.username = this.username.toLowerCase();
  }
}
