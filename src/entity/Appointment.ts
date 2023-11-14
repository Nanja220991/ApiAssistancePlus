import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Patient } from "./Patient";

@Entity("appointment")
export class Appointment {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: string;

    @Column()
    heure_debut: string;

    @Column()
    motif: string;

    @Column()
    payment_mode: string;

    @Column({
        default: 0
    })
    payment_state: number;

    @Column()
    type: string;

    @Column()
    id_docteur: string;

    @Column()
    lien: string;

    @Column()
    description: string;

    @Column()
    patientId: string;

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