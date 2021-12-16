import { Discipline } from './Discipline';
import { Student } from './Student';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true
    })
    value: number;

    @Column()
    semester: number;

    @ManyToOne(() => Student, student => student.grades)
    student: Student;

    @ManyToOne(() => Discipline, discipline => discipline.grades)
    discipline: Discipline;
}
