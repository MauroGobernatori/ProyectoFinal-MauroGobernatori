import { Router } from 'express';
import { authRoleUserOrPremium, authRoleUserNotOwner } from '../middlewares/authRole.js';

import CartController from "../controllers/cartController.js";
import { isAuth } from '../middlewares/isAuth.js';
const controller = new CartController();

const router = Router();

router.put('/update_quantity/:cid/:pid', authRoleUserOrPremium, controller.updateQuantity);

router.put('/add_item/:cid/:pid', authRoleUserNotOwner, controller.addItemToCart);

router.post('/:cid/purchase', authRoleUserOrPremium, controller.generateTicket);

router.delete('/wipe/:cid', authRoleUserOrPremium, controller.wipeCart);

router.delete('/remove/:cid/:pid', authRoleUserOrPremium, controller.removeItemFromCart);

router.get('/:cid', authRoleUserOrPremium, controller.getCartById);

export default router;