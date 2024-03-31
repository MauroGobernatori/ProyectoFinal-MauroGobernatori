import { sendMail, updatePassword } from "../services/emailService.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { HttpResponse } from "../middlewares/httpResponse.js";
const httpResponse = new HttpResponse();

const generateToken = (email, expTime) => {
    const payload = {
        email: email
    }
    const token = jwt.sign(payload, process.env.jwt_secret_key, {
        expiresIn: expTime
    });
    return token
}

export const sendEmail = async (req, res) => {
    try{
        const { dest } = req.body;

        const tokenPass = generateToken(dest, '1h');

        if(tokenPass){
            const response = await sendMail(dest, tokenPass);
            if(response){
                res.cookie("tokenpass", response);
                res.json({msg: 'Email send successfully'});
            }else{
                res.clearCookie("tokenpass");
                res.json({msg: 'Error with sendMail'})
            }
        }else{
            res.json({msg: 'Error with tokenPass'})
        }
        
    }catch(error){
        console.log(error);
    }
}

export const newPassword = async (req, res) => {
    try{
        const { password, email } = req.body;
        const { tokenpass } = req.cookies;
        if(!tokenpass){
            return httpResponse.Forbidden(res, errorsDictionary.TOKEN_NOT_FOUND);
        }

        const updPass = await updatePassword(email, password);
        if(updPass){
            res.clearCookie("tokenpass");
            return httpResponse.Ok(res, updPass)
        }else{
            return httpResponse.NotFound(res, errorsDictionary.PASSWORD_EQUAL);
        }

    }catch(error){
        console.log(error);
    }
}