import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    app: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column()
    statut: string;

    @Column({
        default: 0
    })
    token: string;
}