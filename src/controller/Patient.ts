import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Patient } from "../entity/Patient";


export const getAllPatients = async (req: Request, res: Response) => {
    const patientRepository = getManager().getRepository(Patient);
    const patients = await patientRepository.find();
    res.send(patients);
};

export const getPatient = async (req: Request, res: Response) => {
    const patientRepository = getManager().getRepository(Patient);
    const patients = await patientRepository.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(patients);
};

export const getPatientStatut = async (req: Request, res: Response) => {
    const patientRepository = getManager().getRepository(Patient);
    const patients = await patientRepository.find({
        where: {
            statut: req.params.statut
        }
    });
    res.send(patients);
};

export const savePatient = async (req: Request, res: Response) => {
    const patientRepository = getManager().getRepository(Patient);
    var message = '';
    try {
        await patientRepository.save(req.body);
        message = "Patient enregistré avec succès..";
    } catch (error) {
        message = error.message;
    }
    res.send(message);
}

export const updatePatient = async (req: Request, res: Response) => {
    const patientRepository = getManager().getRepository(Patient);
    const patient = await patientRepository.findOne({
        where : {
            id: req.params.id
        }
    })
    if(!patient) {
        throw new Error("Patient introuvable")
    }
    
    patient.email = req.body.email || patient.email;
    patient.nom = req.body.nom || patient.nom;
    patient.prenom = req.body.prenom || patient.prenom;
    patient.birthday = req.body.birthday || patient.birthday;
    patient.adress = req.body.adress || patient.adress;
    patient.contact = req.body.description || patient.contact;
    patient.statut = req.body.statut || patient.statut;
    patient.userUpdate = req.body.userUpdate || patient.userUpdate;

    const updatePatient = await patientRepository.save(patient);
    res.send(updatePatient);
}

