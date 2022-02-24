import { Entity, Column, BeforeInsert } from "typeorm";
import { BasicEntity } from "./common/BasicEntity";
import { EDepartment, IEducatorPersonalData } from "./common/types";

@Entity()
export class User extends BasicEntity {
  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  role?: string;

  @Column({ type: 'varchar', nullable: true })
  accessToken?: string;

  @Column({ type: 'enum', default: null, nullable: true })
  department?: EDepartment;

  @Column({ type: 'varchar', array: true })
  leadsGroup: string[];

  @Column({ type: 'jsonb' })
  personalData: IEducatorPersonalData;
}

