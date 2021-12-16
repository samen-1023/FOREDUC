import { Planned_hours } from './Planned_hours';
import { Group } from './Group';
import { User } from './User';
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Educator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    surname: string;

    @Column()
    name: string;

    @Column()
    patronymic: string;

    @Column()
    department: string;

    @OneToOne(() => User) 
    @JoinColumn()
    user: User;

    @OneToMany(() => Group, group => group.educator)
    groups: Group[];

    @OneToMany(() => Planned_hours, plannedHours => plannedHours.educator)
    plannedHours: Planned_hours[];
}
