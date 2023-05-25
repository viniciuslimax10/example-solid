import { ImailProvider,IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from "nodemailer/lib/mailer";

export class MailTrapMailProvider implements ImailProvider{
    private transporter;
    
    constructor(){
        this.transporter = nodemailer.createTransport({
            host:'sandbox.smtp.mailtrap.io',
            port:2525,
            auth:{
                user:'9702acab74e6fe',
                pass:'c68752553b6980'
            }
        })
    }
    async sendMail(message:IMessage) : Promise<void>{
        await this.transporter.sendMail({
            to:{
                name:message.to.name,
                address:message.to.email,
            },
            from:{
                name:message.from.name,
                address:message.from.email,
            },
            subject:message.subject,
            html:message.body,
        })
    }
}