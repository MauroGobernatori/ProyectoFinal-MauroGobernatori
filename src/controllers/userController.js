// Agregar clase general de controller, de donde UserController, ViewController y CartController van a heredar
import { userService } from '../services/userService.js';

import { HttpResponse, errorsDictionary } from '../middlewares/httpResponse.js';
const httpResponse = new HttpResponse();

export default class UserController {

    // Esta función destruye la session que se creó
    async logout(req, res, next){
        try{
            const { _id } = req.user
            await userService.wipeCart(_id)
            await userService.updateLastConnection(_id)
            req.session.destroy((err) => {
                if(!err){
                    res.redirect('/logout');
                }else{
                    req.logger.fatal('Fatal error logging out');
                    return httpResponse.NotFound(res, errorsDictionary.ERROR_LOGOUT)
                    // res.json({ status: 'Error with logout', body: err });
                }
            });
        }catch(error){
            next(error);
        }
    }

    async registerResponse(req, res, next){
        try{
            res.redirect('/login');
        }catch(error){
            req.logger.error('Error with the registration!');
            res.redirect('/error-register');
        }
    }

    async loginResponse(req, res, next){
        try{
            const { _id } = req.user
            await userService.updateLastConnection(_id)
            res.cookie('token', req.user.access_token, {httpOnly: true}).redirect('/profile');
        }catch(error){
            req.logger.error('Error logging in!');
            res.redirect('/error-login');
        }
    }

    async githubResponse(req, res, next){
        try {
            res.redirect('/profile');
        } catch (error) {
            req.logger.error('Error with github login!');
            res.redirect('/error-login');
        }
    }
    
    async currentUser(req, res, next){
        try{
            console.log(req.user);
            res.redirect('/current');
        }catch(error){
            req.logger.error('Error showing current user!');
            res.redirect('/profile');
        }
    }

    async modifyUser(req, res, next){
        try{
            const { uid } = req.params;
            const user = await userService.modifyRole(uid);
            res.redirect('/profile');
        }catch(error){
            req.logger.error('Error modifying user!');
            res.redirect('/profile');
        }
    }

    async getAllUsers(req, res, next){
        try{
            const users = await userService.getAllUsers();
            if(users){
                res.json({users})
            }else{
                req.logger.error('Error getting all users!');
                res.redirect('/profile');
            }
        }catch(error){
            req.logger.error('Error getting all users!');
            res.redirect('/profile');
        }
    }

    async deleteUser(req, res, next){
        try{
            const { id } = req.params;
            const userDeleted = await userService.deleteUser(id);
            if(userDeleted){
                req.logger.debug(`Product deleted successfully.`);
                res.redirect(303, '/admin_panel');
            }else{
                req.logger.error('Error deleting user!');
                res.redirect('/admin_panel');
            }
        }catch(error){
            req.logger.error('Error deleting user!');
            res.redirect('/profile');
        }
    }

    async deleteByConnection(req, res, next){
        try{
            const deletedConnection = await userService.deleteByConnection();
            if(deletedConnection){
                req.logger.debug(`Users deleted successfully.`);
                res.redirect(303, '/admin_panel');
            }else{
                req.logger.error('Error deleting users!');
                res.redirect('/admin_panel');
            }
        }catch(error){
            req.logger.error('Error deleting users!');
            res.redirect('/admin_panel');
        }
    }
}