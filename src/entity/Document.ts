import { Group } from './group';
import { Column, Entity } from "typeorm";
import { BasicEntity } from "./common/basic-entity";
import { EDepartment, EDocType, ERoles } from "./common/types";

@Entity()
export class Document extends BasicEntity {
  @Column({ type: 'varchar', array: true, default: [ERoles.All] })
  canRead: string[];

  @Column({ type: 'varchar', array: true, default: [ERoles.All] })
  canEdit: string[];

  @Column({ type: 'varchar' })
  name: string;

  @Column('enum', { enum: EDepartment, default: EDepartment.Any })
  department: EDepartment;

  @Column('enum', { enum: EDocType, default: EDocType.Any })
  type: EDocType;

  @Column(type => Group)
  groups: Group[];

  @Column('jsonb', { default: {} })
  data: string;
}