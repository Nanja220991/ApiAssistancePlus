import { Request, Response } from "express";
import nodemailer from "nodemailer";


export const SendMail = async (req: Request, res: Response) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.assistanceplus.mg',
        port: 465,
        secure: true,
        auth: {
            user: 'it.assistant@assistanceplus.mg',
            pass: 'AdmSysRes2023',
        },
        tls: {
            rejectUnauthorized: false
          }
    });

    var mailOptions = {
        from: 'it.assistant@assistanceplus.mg',
        to: 'it.assistant@assistanceplus.mg',
        subject: 'test',
        text: 'test',
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
           console.log(error)
        }else{
            console.log(info);
            return null
            //res.send("Mail envoyé avec succès");
        }
    })
    
};
