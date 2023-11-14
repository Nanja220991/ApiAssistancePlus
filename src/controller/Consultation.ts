import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Consultation } from "../entity/Consultation";

export const getAllConsultations = async (req: Request, res: Response) => {
    const consultationRepository = getManager().getRepository(Consultation);
    const consultations = await consultationRepository.find();
    res.send(consultations);
};

export const getConsultationType = async (req: Request, res: Response) => {
    const consultationRepository = getManager().getRepository(Consultation);
    const consultations = await consultationRepository.find({
        where: {
            type: req.params.type
        }
    });
    res.send(consultations);
};

export const getConsultationDoctor = async (req: Request, res: Response) => {
    const consultationRepository = getManager().getRepository(Consultation);
    const consultations = await consultationRepository.find({
        where: {
            docteur: req.params.docteur
        }
    });
    res.send(consultations);
};

export const getOneConsultations = async (req: Request, res: Response) => {
    const consultationRepository = getManager().getRepository(Consultation);
    const consultations = await consultationRepository.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(consultations);
};

export const saveconsultation = async (req: Request, res: Response) => {
    const consultationRepository = getManager().getRepository(Consultation);
    var message = '';
    try {
        await consultationRepository.save(req.body);
        message = "consultation enregistré avec succès..";
    } catch (error) {
        message = error.message;
    }
    res.send(message);
};

export const updateConsultation = async (req: Request, res: Response) => {
    const consultationRepository = getManager().getRepository(Consultation);
    const consultation = await consultationRepository.findOne({
        where : {
            id: req.params.id
        }
    })
    if(!consultation) {
        throw new Error("Consultation introuvable")
    }
    
    consultation.date_consultation = req.body.date_consultation || consultation.date_consultation;
    consultation.conduite = req.body.conduite || consultation.conduite;
    consultation.motif = req.body.date || consultation.motif;
    consultation.docteur = req.body.docteur || consultation.docteur;
    consultation.description = req.body.description || consultation.description;
    consultation.statut = req.body.statut || consultation.statut;
    consultation.userUpdate = req.body.userUpdate || consultation.userUpdate;

    const updateConsultation = await consultationRepository.save(consultation);
    res.send(updateConsultation);
}

export const deleteConsultation = async (req: Request, res: Response) => {
    const consultationRepository = getManager().getRepository(Consultation);
    const consultation = await consultationRepository.findOne({
        where : {
            id: req.params.id
        }
    })
    if(!consultation) {
        throw new Error("Consultation introuvable")
    }

    const deleteConsultation = await consultationRepository.remove(consultation);
    res.send(deleteConsultation.id);
}