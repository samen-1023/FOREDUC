import { Entity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { BasicEntity } from "./common/basic-entity";
import { EDepartment, ERoles, IPersonalData } from "./common/types";

@Entity()
export class User extends BasicEntity {
  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column('enum', { nullable: true, array: true })
  role?: ERoles[];

  @Column({ type: 'varchar', nullable: true })
  accessToken?: string;

  @Column('enum', { nullable: true })
  department?: EDepartment;

  @Column({ type: 'varchar', array: true, nullable: true })
  leadsGroup?: string[];

  @Column('jsonb')
  personalData: IPersonalData;

  @BeforeInsert()
  @BeforeUpdate()
  toLowerCaseUsername() {
    this.username = this.username.toLowerCase();
  }
}

