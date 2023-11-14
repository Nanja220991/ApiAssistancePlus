import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("role")
export class Role {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    type: number;

    @Column()
    libelle: string;
    
}