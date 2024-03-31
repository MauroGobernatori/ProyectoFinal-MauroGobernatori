import { Router } from 'express';

import UserController from '../controllers/userController.js';
const controller = new UserController();

import { isAuth } from '../middlewares/isAuth.js';
import { authRoleAdmin } from '../middlewares/authRole.js';

import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register'), controller.registerResponse);
router.post('/login', passport.authenticate('login'), controller.loginResponse);

router.get('/register-github', passport.authenticate('github', { scope: ["user:email"] }));
router.get('/github', passport.authenticate('github', {
    failureRedirect: '/login', 
    successRedirect: '/profile', 
    passReqToCallback: true
}));

router.get('/premium/:uid', isAuth, controller.modifyUser);

router.post('/logout', isAuth, controller.logout);

router.get('/current', passport.authenticate('current'), controller.currentUser);

router.get('/users', authRoleAdmin, controller.getAllUsers);

router.delete('/delete/:id', authRoleAdmin, controller.deleteUser);

router.delete('/delete_connection', authRoleAdmin, controller.deleteByConnection);

export default router;