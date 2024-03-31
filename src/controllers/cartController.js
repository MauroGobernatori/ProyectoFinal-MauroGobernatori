import { cartService } from "../services/cartService.js";

import { HttpResponse, errorsDictionary } from "../middlewares/httpResponse.js";
const httpResponse = new HttpResponse();

export default class CartController{
    async addItemToCart(req, res, next){
        try{
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const itemAdded = await cartService.addItemToCart(cid, pid, quantity);
            if(itemAdded){
                req.logger.debug(`Item added to cart successfully. ${itemAdded}`);
                res.redirect(303, '/product_list');
            }else{
                req.logger.error('Adding item to cart error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_ADD_TO_CART)
            }
        }catch(error){
            req.logger.error('Error with adding item to cart function!');
            next(error);
        }
    }

    async generateTicket(req, res, next){
        try{
            const { cid } = req.params;
            const { _id } = req.user;
            const response = await cartService.generateTicket(_id, cid);
            if(response){
                req.logger.debug(`Ticket generated successfully.`);
                res.redirect(`/purchase/${response._id}`);
            }else{
                req.logger.error('Ticket generation error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_PURCHASE)
            }
        }catch(error){
            req.logger.error('Error with ticket generation function!');
            next(error);
        }
    }

    async wipeCart(req, res, next){
        try{
            const { cid } = req.params
            const response = await cartService.wipeCart(cid);
            if(response){
                req.logger.debug(`Cart wiped successfully.`);
                res.redirect(`/product_list`);
            }else{
                req.logger.error('Wiping cart error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_WIPE_CART)
            }
        }catch(error){
            req.logger.error('Error with wiping the cart!');
            next(error);
        }
    }

    async removeItemFromCart(req, res, next){
        try{
            const { cid, pid } = req.params;
            const response = await cartService.removeItemFromCart(cid, pid);
            if(response){
                req.logger.debug(`Item removed from cart successfully.`);
                res.redirect('/product_list')
            }else{
                req.logger.error('Removing item from cart error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_REMOVE_ITEM)
            }
        }catch(error){
            req.logger.error('Error removing item from cart!');
            next(error);
        }
    }

    async getCartById(req, res, next){
        try{
            const { cid } = req.params;
            const response = await cartService.getById(cid);
            if(response){
                res.json(response)
            }else{
                req.logger.error('Getting cart by id error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_SHOW_CART);
            }
        }catch(error){
            req.logger.error('Error getting cart by id!');
            next(error);
        }
    }

    async updateQuantity(req, res, next){
        try{
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const response = await cartService.quantityUpdate(cid, pid, quantity);
            if(response){
                req.logger.debug(`Item quantity updated successfully.`);
                res.redirect(303, '/product_list');
            }else{
                req.logger.error('Updating product quantity error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_UPDATE_QUANTITY)
            }
        }catch(error){
            req.logger.error('Error updating product quantity on cart!');
            next(error);
        }
    }
}