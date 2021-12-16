import { Educator } from './Educator';
import { Discipline } from './Discipline';
import { Hour } from './Hour';
import { Group } from './Group';
import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Planned_hours {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Group, group => group.plannedHours)
    group: Group;

    @ManyToOne(() => Hour, hour => hour.plannedHours)
    hours: Hour;

    @ManyToOne(() => Discipline, discipline => discipline.plannedHours)
    discipline: Discipline;

    @ManyToOne(() => Educator, educator => educator.plannedHours)
    educator: Educator;
}
