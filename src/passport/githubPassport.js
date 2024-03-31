import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import { userService } from '../services/userService.js';

import 'dotenv/config';

const strategyOptions = {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:8080/users/github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    // const email = profile._json.email;
    const email = "pepito@gmail.com";
    const user = await userService.getByEmail(email);
    if(user){
        return done(null, user);
    }else{
        const newUser = await userService.register({
            first_name: profile._json.name,
            // email,
            email: "pepito@gmail.com",
            password: '1234',
            isGithub: true
        });
        return done(null, newUser)
    }
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));