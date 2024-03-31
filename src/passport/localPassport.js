// Passport crea un objeto dentro de la session creada por express-session, dentro de la request, donde guarda información del usuario

import { userService } from '../services/userService.js';

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { generateToken } from '../middlewares/jwtAuth.js';

// Como default usa los nombres 'username' y 'password' para chequear en el login, en nuestro caso se llaman 'email' y 'password', con estas opciones le decimos los nombres que queremos que use
const strategyOptions = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
};
  
const signup = async (req, email, password, done) => {
    try{
        const user = await userService.getByEmail(email);
        if(user){
            return done(null, false)
        }else{
            const newUser = await userService.register(req.body);
            return done(null, newUser)
        }
    }catch(error){
        console.log(error);
        return done(null, false)
    }
};

const login = async (req, email, password, done) => {
    try{
        const userLogin = await userService.login(email, password);
        if(userLogin){
            const access_token = generateToken(userLogin);
            const obj = {
                ...userLogin._doc,
                access_token: access_token
            }
            return done(null, obj)
        }else{
            return done(null, false, { msg: "User not found" })
        }
    }catch(error){
        console.log(error);
    }
};

const signUpStrategy = new LocalStrategy(strategyOptions, signup);
const loginStrategy = new LocalStrategy(strategyOptions, login);

passport.use("register", signUpStrategy);
passport.use("login", loginStrategy);

// Con la estrategia creada, al pasar el user en la función done(), se ejecuta el serializeUser

// serializeUser guarda el usuario recibido en el req.session.passport, en nuestro caso va a guardar el _id, dentro de req.session.passport.user
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Con ese _id, deserializeUser hace la búsqueda en la base de datos
passport.deserializeUser( async (id, done) => {
    const user = await userService.getById(id);
    return done(null, user)
});