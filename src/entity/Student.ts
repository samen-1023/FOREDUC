import { Grade } from './Grade';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./Group";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    surname: string;

    @Column()
    name: string;

    @Column()
    patronymic: string;

    // бюджет или коммерция
    @Column()
    educationForm: string;

    // исключен или нет
    @Column()
    dismissed: boolean;

    // скрыто
    @Column({
        unique: true
    })
    email: string;

    // скрыто
    @Column({
        unique: true
    })
    phone: string;

    @Column({
        unique: true,
        nullable: true
    })
    recordCard: number;

    @ManyToOne(() => Group, group => group.students)
    group: Group;

    @OneToMany(() => Grade, grade => grade.student)
    grades: Grade[];
}
