import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv'

//controller
import * as HomeController from "./controller/Home";
import * as PatientController from "./controller/Patient";
import * as AppointmentController from "./controller/Appointment";
import * as DocteurController from "./controller/Docteur";
import * as Mailer from "./controller/Mailer";
import * as SendexController from "./controller/Sendex";

//Entity
import { Patient } from "./entity/Patient";
import { Appointment } from "./entity/Appointment";
import { Consultation } from "./entity/Consultation";
import { Docteur } from "./entity/Docteur";
import { User } from "./entity/User";
import authRouter from "./controller/AuthController";
import authenticateToken from "./middleware/authMiddleware";
import * as nodemailer from "nodemailer";
import { Statut } from "./entity/Statut";

dotenv.config({path: __dirname+'/.env'});

createConnection({
    type: "mysql", 
    host: process.env.TYPEORM_HOST,
    port: 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [
        Patient,
        Consultation,
        Appointment,
        Docteur,
        User,
        Statut
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    console.log("Express application is up and running on port 3010");
}).catch(error => console.log(error));

// create express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//primary routes
app.get("/", authenticateToken, HomeController.showHomePage);

//Login
app.use('/api/auth', authRouter);

//MedManager
//Appointments
app.get('/api/appointments', authenticateToken,AppointmentController.getAllAppoitments);
app.get('/api/appointments/:statut', authenticateToken, AppointmentController.getAppoitmentStatut);
app.get('/api/appointments/docteur/:id_docteur', authenticateToken, AppointmentController.getAppoitmentDoctor);
app.post('/api/appointment', authenticateToken, AppointmentController.saveAppointment);
app.put('/api/appointment/:id', authenticateToken, AppointmentController.updateAppointment);
app.delete('/api/appointment/:id', authenticateToken, AppointmentController.deleteAppointment);

//Patients
app.get('/api/patients', authenticateToken, PatientController.getAllPatients);
app.get('/api/patient:id', authenticateToken, PatientController.getPatient);
app.get('/api/patients/:statut', authenticateToken, PatientController.getPatientStatut);
app.post('/api/patient', authenticateToken, PatientController.savePatient);
app.put('/api/patient/:id', authenticateToken, PatientController.updatePatient);

//Docteurs
app.get('/api/docteurs', authenticateToken, DocteurController.getAllDocteurs);
app.get('/api/docteurs/:docteur', authenticateToken, DocteurController.getDocteurStatut);
app.get('/api/docteur/:id', authenticateToken, DocteurController.getDocteurId);
app.post('/api/docteur', authenticateToken, DocteurController.saveDocteur);
app.put('/api/docteur/:id', authenticateToken, DocteurController.updateDocteur);

//sendex
app.post('/api/sendMessage', SendexController.sendTexto);

//emailJs
app.post('/api/sendMail', SendexController.EmailJs);

//nodemailer
app.post('/api/sendmail', Mailer.SendMail)

app.post('/sendemail',(req,res,next)=>{
  
    console.log(req.body)

    var transporter = nodemailer.createTransport({
        host: 'mail.assistanceplus.mg',
        port: 465,
        secure: true,
        auth: {
            user: 'it.assistant@assistanceplus.mg',
            pass: 'AdmSysRes2023'
        }
    }); 
  
    var mailOptions = {
      from: 'it.assistant@assistanceplus.mg',
      to: 'it.assistant@assistanceplus.mg',
      subject: `Contact name: ${req.body.name}`,
      html:`<h1>Contact details</h1>
            <h2> name:${req.body.name} </h2><br>
            <h2> email:${req.body.email} </h2><br>
            <h2> phonenumber:${req.body.phonenumber} </h2><br>
            <h2> message:${req.body.message} </h2><br>`
    };

    transporter.verify((error, success) =>{
        if(error) {
            console.log(error)
        }else{
            console.log('serveur prêt')
        }
    })
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error.message);
        res.send(error.message)
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Sent Successfully')
      }
    });
  })

// run app
app.listen(3010);