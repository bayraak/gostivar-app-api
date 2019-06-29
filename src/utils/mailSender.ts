import * as nodemailer from "nodemailer";
import config from '../config/config';

export default class MailSender {

    static sendResetPassword = async (email: string, link: string) => {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass
            }
        });

        const mailOptions = {
            from: `"Gostivar App 👻" <support@gostivarapp.com>`,
            to: email,
            subject: "Reset Password",
            html: '<p>Click <a href="http://localhost:3000/api/auth/resetpassword?token=' + link + '">here</a> to reset your password</p>'        
        };

        const response = await transporter.sendMail(mailOptions);
        const url = nodemailer.getTestMessageUrl(response);
        return;
    }

    static sendNewPassword = async (email: string, password: string) => {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: testAccount.user,
              pass: testAccount.pass
            }
        });

        const mailOptions = {
            from: `"Gostivar App 👻" <support@gostivarapp.com>`,
            to: email,
            subject: "New Password",
            html: '<p>Your new password: ' + password + '</p>'        
        };

        const response = await transporter.sendMail(mailOptions);
        const url = nodemailer.getTestMessageUrl(response);
        return;
    }
}