import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Docteur } from "../entity/Docteur";


export const getAllDocteurs = async (req: Request, res: Response) => {
    const docteurRepository = getManager().getRepository(Docteur);
    const docteurs = await docteurRepository.find();
    res.send(docteurs);
};

export const getDocteurStatut = async (req: Request, res: Response) => {
    const docteurRepository = getManager().getRepository(Docteur);
    const docteurs = await docteurRepository.find({
        where: {
            statut: req.params.statut
        }
    });
    res.send(docteurs);
};

export const getDocteurId = async (req: Request, res: Response) => {
    const docteurRepository = getManager().getRepository(Docteur);
    const docteurs = await docteurRepository.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(docteurs);
};

export const saveDocteur = async (req: Request, res: Response) => {
    const docteurRepository = getManager().getRepository(Docteur);
    var message = '';
    try {
        await docteurRepository.save(req.body);
        message = "Docteur enregistré avec succès..";
    } catch (error) {
        message = error.message;
    }
    res.send(message);
}

export const updateDocteur = async (req: Request, res: Response) => {
    const docteurRepository = getManager().getRepository(Docteur);
    const docteur = await docteurRepository.findOne({
        where : {
            id: req.params.id
        }
    })
    if(!docteur) {
        throw new Error("Docteur introuvable")
    }
    
    docteur.nomprenoms = req.body.nomprenoms || docteur.nomprenoms;
    docteur.email = req.body.email || docteur.email;
    docteur.localisation = req.body.date || docteur.localisation;
    docteur.statut = req.body.type || docteur.statut;

    const updateDocteur = await docteurRepository.save(docteur);
    res.send(updateDocteur);
}

