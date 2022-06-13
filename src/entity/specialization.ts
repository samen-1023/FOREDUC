import { Column, Entity, OneToMany } from "typeorm";
import { BasicEntity } from "./common/basic-entity";
import { Student } from "./student";

@Entity()
export class Specialization extends BasicEntity {
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Student, student => student.specialization)
  students: Student[];
}
