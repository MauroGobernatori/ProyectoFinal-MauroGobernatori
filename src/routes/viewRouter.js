import { Router } from 'express';
import {
    login,
    register,
    errorLogin,
    errorRegister,
    profile,
    logout,
    current,
    products,
    productUpdate,
    purchase,
    productsMock,
    reset_password,
    new_password,
    admin_user_panel,
    create_product
} from '../controllers/viewController.js';
import { isAuth } from '../middlewares/isAuth.js';
import { authRoleAdmin, authRoleAdminPremium } from '../middlewares/authRole.js';

import { developmentLogger, productionLogger } from '../utils.js';

const router = Router();

router.get('/login', login);
router.get('/register', register);
router.get('/error-login', errorLogin);
router.get('/error-register', errorRegister);
router.get('/profile', isAuth, profile);
router.get('/logout', logout);

router.get('/product_list', isAuth, products);
router.get('/product_update/:id', isAuth, productUpdate);
router.get('/purchase/:tid', isAuth, purchase);

router.get('/create_product', authRoleAdminPremium, create_product)

router.get('/reset-password', reset_password);
router.get('/new-pass', new_password);

router.get('/mockingproducts', isAuth, productsMock);

router.get('/loggerTest', (req, res)=>{
    developmentLogger.debug('Debug  error');
    developmentLogger.http('Http error');
    developmentLogger.info('Info error');
    developmentLogger.warning('Warning error');
    developmentLogger.error('Error error');
    developmentLogger.fatal('Fatal error');

    productionLogger.info('Info error');
    productionLogger.warning('Warning error');
    productionLogger.error('Error error');
    productionLogger.fatal('Fatal error');
});

router.get('/current', current);

router.get('/admin_panel', authRoleAdmin, admin_user_panel);

export default router;