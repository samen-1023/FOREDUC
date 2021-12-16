import { Planned_hours } from './Planned_hours';
import { Grade } from './Grade';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Discipline {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    // унифицированный код предмета
    index: string;

    @Column({
        unique: true
    })
    name: string;

    @Column({
        unique: true
    })
    // потому что название предмета 
    // в аверсе может отличаться от оригинального
    aversName: string;

    @Column()
    // тип итоговой сдачи: зачёт, экзамен, контрольная
    certification: string;

    @OneToMany(() => Grade, grade => grade.discipline)
    grades: Grade[];

    @OneToMany(() => Planned_hours, plannedHours => plannedHours.discipline)
    plannedHours: Planned_hours[];
}