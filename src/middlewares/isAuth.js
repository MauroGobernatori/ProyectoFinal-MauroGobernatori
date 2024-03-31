import { HttpResponse } from "./httpResponse.js";
const httpResponse = new HttpResponse();

export const isAuth = (req,res,next) => {
    // console.log('isAuth: ', req.session.passport.user);
    // console.log('isAuth: ', req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }else{
        return httpResponse.Unauthorized(res, 'Unauthorized');
    } 
    // throw new Error('Unauthorized')
    // res.status(401).send({ msg: 'Unauthorized' })
}