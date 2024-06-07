const nodemailer = require('nodemailer');
require('dotenv').config()
const { generateOneTimeCode } = require('../Models/OneTimeCode');




// /*
const transporter = nodemailer.createTransport({
    // service: 'hotmail',
    host:"smtp.gmail.com" ,
    port: 465,
    secure:true,
    auth: {
        user: process.env.MAILER,
        pass: process.env.MAILER_PASSWORD
    }
});
// */

async function sendVerificationEmail(email,role) {
    const verificationCode = await generateOneTimeCode(email);
    const mailOptions = {
        from:`CRYPTAVITA <${process.env.MAILER}>`,
        to: email,
        subject: 'Cryptavita Verification Code',
        text: 'Below is a code for your email validation',
        html: `
            <h1 color="#00ff00">${verificationCode}</h1>
            <p>
            Click the following link to verify:
            <a href="http://localhost:5000/v1/verify/email?email=${email}&code=${verificationCode}&role=${role}">Verify</a>
            </p>
            `
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

module.exports = {sendVerificationEmail}