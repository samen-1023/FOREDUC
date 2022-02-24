import { Column, Entity } from "typeorm";
import { BasicEntity } from "./common/BasicEntity";
import { EDepartment, EDocType, ERoles } from "./common/types";

@Entity()
export class Document extends BasicEntity {
  @Column({ type: 'varchar', array: true, default: [ERoles.All] })
  canRead: string[];

  @Column({ type: 'varchar', array: true, default: [ERoles.All] })
  canEdit: string[];

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: EDepartment, default: EDepartment.Any })
  department: EDepartment;

  @Column({ type: 'enum', enum: EDocType, default: EDocType.Any })
  type: EDocType;

  @Column({ type: 'varchar', array: true, default: []})
  groups: string[];

  @Column({ type: 'jsonb', default: {} })
  data: string;
}