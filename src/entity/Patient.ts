import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Consultation } from "./Consultation";

@Entity("patient")
export class Patient {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false
    })
    nom: string;

    @Column({
        nullable: false
    })
    prenom: string;

    @Column({
        nullable: false
    })
    birthday: string;

    @Column({
        nullable: false
    })
    adress: string;

    @Column({
        nullable: false
    })
    contact: string;

    @Column({
        default: '0'
    })
    statut: string;

    @Column()
    userCreate: string;

    @Column()
    userUpdate: string;

    @Column()
    createAt: Date;

    @Column()
    updateAt: Date;

    @OneToMany(type => Consultation, consultation => consultation.patient, {
        cascade: true
    })
    consultations: Consultation[];
}