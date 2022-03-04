import { Column, Entity } from "typeorm";
import { BasicEntity } from "./common/basic-entity";

@Entity()
export class Group extends BasicEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;
}