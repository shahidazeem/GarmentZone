const nodemailer = require('nodemailer');
const VerifyEmailTemplate = require("./templates/VerifyEmail");
require('dotenv').config();


const SendEmail = async (email,code)=>{
    mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        }
    });

    mailDetails = {
        // from: 'mailsender193@gmail.com',
        from: 'dtdportal@gmail.com',
        to: email,
        subject: 'Garment Zone Email Varification Code',
        html: VerifyEmailTemplate(code)
    };
    
    await mailTransporter.sendMail(mailDetails)

}

module.exports = SendEmail;