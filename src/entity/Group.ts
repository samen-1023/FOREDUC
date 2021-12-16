import { Planned_hours } from './Planned_hours';
import { Specialization } from './Specialization';
import { Educator } from './Educator';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Student } from './Student';

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    course: string;

    @Column()
    department: string;

    @Column()
    trainingLevel: string;

    @ManyToOne(() => Specialization, specialization => specialization.groups)
    specialization: Specialization;

    @ManyToOne(() => Educator, educator => educator.groups)
    educator: Educator;

    @OneToMany(() => Student, student => student.group)
    students: Student[];

    @OneToMany(() => Planned_hours, plannedHours => plannedHours.group)
    plannedHours: Planned_hours[];
}
