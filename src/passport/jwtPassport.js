import passport from 'passport';
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import UserDao from '../daos/userDao.js';
const userDao = new UserDao();

import 'dotenv/config';

/* ------------------------------------ - ----------------------------------- */

const verifyToken = async (jwt_payload, done) => {
    // console.log('payload', jwt_payload);
    const user = await userDao.getById(jwt_payload.userId);
    if(!user){
        return done(null, false);
    }else{
        return done(null, jwt_payload)
    }
}

const cookieExtractor = (req)=>{
    const token = req.cookies.token
    return token
}
  
const strategyOptionsCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.jwt_secret_key,
}

passport.use('current', new jwtStrategy(strategyOptionsCookies, verifyToken))
  
passport.serializeUser((user, done)=>{
    done(null, user.userId);
});

passport.deserializeUser(async(id, done)=>{
    const user = await userDao.getById(id);
    return done(null, user);
});