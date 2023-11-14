import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";

/*
0 : Annulé
1 : Nouveau
2 : En attente de validation
3 : Payé
4 : Validé
5 : Terminé
*/
@Entity("statut")
export class Statut {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    code: string;

    @Column()
    libelle: string;

}