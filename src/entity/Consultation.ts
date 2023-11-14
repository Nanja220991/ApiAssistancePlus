import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Patient } from "./Patient";
import { Docteur } from "./Docteur";

@Entity("consultation")
export class Consultation {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date_consultation: string;

    @Column()
    motif: string;

    @Column()
    histo: string;

    @Column()
    info_paraclinique: string;

    @Column()
    info_clinique: string;

    @Column()
    description: string;

    @Column()
    conduite: string;

    @Column()
    diagnostic: string;

    @Column()
    statut: string;

    @Column()
    docteur: string;

    @Column()
    userCreate: string;

    @Column()
    userUpdate: string;

    @Column()
    createAt: Date;

    @Column()
    updateAt: Date;

    @ManyToOne(type => Patient,patient => patient.consultations)
    patient: Patient[];

}