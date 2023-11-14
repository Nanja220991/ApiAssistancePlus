import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";

@Entity("docteur")
export class Docteur {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nomprenoms: string;

    @Column()
    email: string;

    @Column()
    localisation: string;

    @Column()
    url_image: string;

    @Column()
    statut: string;

    @Column()
    userCreate: string;

    @Column()
    userUpdate: string;

    @Column()
    createAt: Date;

    @Column()
    updateAt: Date;

}