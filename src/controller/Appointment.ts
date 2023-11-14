import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Appointment } from "../entity/Appointment";

export const getAllAppoitments = async (req: Request, res: Response) => {
    const appointmentRepository = getManager().getRepository(Appointment);
    const appointments = await appointmentRepository.find();
    res.send(appointments);
};

export const getAppoitmentStatut = async (req: Request, res: Response) => {
    const appointmentRepository = getManager().getRepository(Appointment);
    const appointments = await appointmentRepository.find({
        where: {
            statut: req.params.statut
        }
    });
    res.send(appointments);
};

export const getAppoitmentType = async (req: Request, res: Response) => {
    const appointmentRepository = getManager().getRepository(Appointment);
    const appointments = await appointmentRepository.find({
        where: {
            type: req.params.type
        }
    });
    res.send(appointments);
};

export const getAppoitmentDoctor = async (req: Request, res: Response) => {
    const appointmentRepository = getManager().getRepository(Appointment);
    console.log(req.params.id_docteur)
    const appointments = await appointmentRepository.find({
        where: {
            id_docteur: req.params.id_docteur
        }
    });
    res.send(appointments);
};

export const getOneAppoitment = async (req: Request, res: Response) => {
    const appointmentRepository = getManager().getRepository(Appointment);
    const appointments = await appointmentRepository.findOne({
        where: {
            id: req.params.id
        }
    });
    res.send(appointments);
};

export const saveAppointment = async (req: Request, res: Response) => {
    const appointmentRepository = getManager().getRepository(Appointment);
    var message = '';
    try {
        await appointmentRepository.save(req.body);
        message = "Appointment enregistré avec succès..";
    } catch (error) {
        message = error.message;
    }
    res.send(message);
};

export const updateAppointment = async (req: Request, res: Response) => {
    const appointmentRepository = getManager().getRepository(Appointment);
    const appointment = await appointmentRepository.findOne({
        where : {
            id: req.params.id
        }
    })
    if(!appointment) {
        throw new Error("Rendez-vous introuvable")
    }
    
    appointment.date = req.body.date || appointment.date;
    appointment.heure_debut = req.body.heure_debut || appointment.heure_debut;
    appointment.motif = req.body.date || appointment.motif;
    appointment.payment_mode = req.body.payment_mode || appointment.payment_mode;
    appointment.payment_state = req.body.payment_state || appointment.payment_state;
    //appointment.lien = req.body.lien || appointment.lien;
    appointment.type = req.body.type || appointment.type;
    appointment.id_docteur = req.body.id_docteur || appointment.id_docteur;
    appointment.description = req.body.description || appointment.description;
    appointment.statut = req.body.statut || appointment.statut;
    appointment.userUpdate = req.body.userUpdate || appointment.userUpdate;

    const updateAppointment = await appointmentRepository.save(appointment);
    res.send(updateAppointment);
}

export const deleteAppointment = async (req: Request, res: Response) => {
    const appointmentRepository = getManager().getRepository(Appointment);
    const appointment = await appointmentRepository.findOne({
        where : {
            id: req.params.id
        }
    })
    if(!appointment) {
        throw new Error("Rendez-vous introuvable")
    }

    const deleteAppointment = await appointmentRepository.remove(appointment);
    res.send(deleteAppointment.id);
}