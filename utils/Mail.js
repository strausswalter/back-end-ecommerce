const nodemailer = require('nodemailer');
require('dotenv').config();

class Mail{
    constructor(){
        this.transporter = nodemailer.createTransport({
            
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // true for 465, false for other ports
            auth:{
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD, //senha de App do Google conta
            },
        })
    }
    async sendEmail(to, subject, html){
        let data = {
            from: process.env.MAIL_SENDER,
            to,
            subject,
            html,
        };

    try{
        const result = await this.transporter.sendMail(data);
        console.log("Email enviado");
        return result;
    }catch(err){
        console.log(err);
        return;
    }

        //Promisse tradicional:
        // this.transporter.sendMail(data, function (err, info){
        //     if(err){
        //         console.log(err);
        //         return;
        //     }
        //     console.log("Emal enviado");
        // });

        }

    }


module.exports = Mail;