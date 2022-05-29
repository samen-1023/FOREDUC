import { Group } from './group';
import { Column, Entity } from "typeorm";
import { BasicEntity } from "./common/basic-entity";
import { EDepartment, EDocType, EFileNames, ERoles } from "./common/enums";

@Entity()
export class Document extends BasicEntity {
  @Column('enum', { enum: ERoles, array: true, default: [ERoles.All] })
  canRead: ERoles[];

  @Column('enum', { enum: ERoles, array: true, default: [ERoles.All] })
  canEdit: ERoles[];

  @Column('enum', { enum: EFileNames })
  name: EFileNames;

  @Column('enum', { enum: EDepartment, default: EDepartment.Any })
  department: EDepartment;

  @Column('enum', { enum: EDocType, default: EDocType.Any })
  type: EDocType;

  @Column(type => Group, { array: true })
  groups: Group[];

  @Column('jsonb', { nullable: true })
  data?: string;
}