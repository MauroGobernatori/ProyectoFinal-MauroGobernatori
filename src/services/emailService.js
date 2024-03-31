import { userService } from './userService.js';
import { createTransport } from "nodemailer";
import 'dotenv/config';

export const transporter = createTransport({
    service: 'gmail',
    port: process.env.PORT_EMAIL,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const createMsgResetPass = (email) => {
    return `<p>¡Hola!
        Hace click 
        <a href='http://localhost:8080/new-pass?email=${email}'>AQUÍ</a>
        para restablecer tu contraseña.
    </p>`;
};

export const sendMail = async (email, token = null) => {
    try{
        const userExists = await userService.getByEmail(email);
        if(userExists){
            const msg= createMsgResetPass(email);

            const subj = "Recuperación de contraseña";

            const emailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: subj,
                html: msg,
            };
            
            const response = await transporter.sendMail(emailOptions);
            // console.log("email enviado", response);
            if (token !== null){
                return token
            }
        }else{
            return false
        }
    }catch(error){
        throw new Error(error)
    }
}

export const updatePassword = async (email, pass) => {
    try{
        const userExists = await userService.getByEmail(email);
        if(userExists){
            const response = await userService.updatePass(email, pass)
            if(response){
                return response
            }else{
                return false
            }
        }else{
            return false
        }
    }catch(error){
        throw new Error(error)
    }
}

export const deletedByConnectionEmail = async (email) => {
    try{
        const subj = 'Account deleted'
        const msg = 'Your account has been deleted by inactivity.'

        const emailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subj,
            html: msg
        };

        const response = await transporter.sendMail(emailOptions);
        // console.log("email enviado", response);
    }catch(error){
        throw new Error(error)
    }
}

export const deletedProductOwnerEmail = async (email) => {
    try{
        const subj = 'Product deleted'
        const msg = 'A product you created was deleted.'

        const emailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subj,
            html: msg
        };

        const response = await transporter.sendMail(emailOptions);
        console.log("email enviado", response);
    }catch(error){
        throw new Error(error)
    }
}