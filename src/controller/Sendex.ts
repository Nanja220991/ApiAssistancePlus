import * as esendex from 'esendex';
import { Request, Response } from 'express';

export const EmailJs = async (req: Request, res: Response) => {


}

export const sendTexto = async (req: Request, res: Response) => {
    const sender = esendex({
        username: 'dsi@assistanceplus.mg',
        password: 'NDX@+80194'
    });

    var messages = {
        accountreference: 'EX0000000',
        message: [{
          to: '07987654321',
          body: 'Every message matters!'
        },{
          to: '07123456789',
          body: 'Really, every message matters!'
        }]
      };
      
      sender.messages.send(messages, function (err, response) {
        if (err) return console.log('error: ', err);
        console.log(response);
      });
}