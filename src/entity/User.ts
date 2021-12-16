import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    phone: string;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @Column({
        nullable: true
    })
    role!: string;

    @Column({
        unique: true,
        nullable: true
    })
    refreshToken!: string;
}