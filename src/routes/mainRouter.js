import { Router } from 'express';

import userRouter from './userRouter.js';
import viewRouter from './viewRouter.js';
import cartRouter from './cartRouter.js';
import productRouter from './productRouter.js';
import emailRouter from './emailRouter.js';

export default class MainRouter {
    constructor(){
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.use('/users', userRouter);
        this.router.use('', viewRouter);
        this.router.use('/products', productRouter);
        this.router.use('/cart', cartRouter);
        this.router.use('/email', emailRouter);
    }

    getRouter() {
        return this.router;
    }
}