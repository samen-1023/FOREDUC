import { Planned_hours } from './Planned_hours';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Hour {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    quantity: string;

    @Column()
    semester: string;

    @OneToMany(() => Planned_hours, plannedHours => plannedHours.hours)
    plannedHours: Planned_hours[];
}
