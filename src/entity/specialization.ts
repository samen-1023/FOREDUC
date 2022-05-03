import { Column, Entity } from "typeorm";
import { BasicEntity } from "./common/basic-entity";

@Entity()
export class Specialization extends BasicEntity {
  @Column({ type: 'varchar' })
  name: string;
}
