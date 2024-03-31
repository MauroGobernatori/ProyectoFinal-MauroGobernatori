import { Router } from 'express';
import { authRoleAdminPremium, authRoleAdminOwner } from '../middlewares/authRole.js';
import { isAuth } from '../middlewares/isAuth.js';

import ProductController from '../controllers/productController.js';
const controller = new ProductController();

const router = Router();

router.get('/products', isAuth, controller.getAllProducts);

router.get('/product/:id', isAuth, controller.getProductById);

router.post('/create', authRoleAdminPremium, controller.createProduct);

router.delete('/delete/:id', authRoleAdminOwner, controller.deletedProduct);

router.put('/update/:id', authRoleAdminOwner, controller.updateProduct);

export default router;