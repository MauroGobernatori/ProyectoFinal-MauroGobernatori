import CartDao from '../daos/cartDao.js';
const cartDao = new CartDao();

import { userService } from "./userService.js";
import { productService } from './productService.js';
import { ticketService } from './ticketService.js';

class CartService{
    async createCart(){
        try{
            const newCart = await cartDao.createCart();
            if(newCart){
                return newCart
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            const cart = await cartDao.getById(id);
            if(cart){
                return cart
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async wipeCart(id){
        try{
            const cartWiped = await cartDao.wipeCart(id);
            if(cartWiped){
                return cartWiped
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async addItemToCart(cid, pid, quantity){
        try{
            const itemAdded = await cartDao.addItemToCart(cid, pid, quantity);
            if(itemAdded){
                return itemAdded
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getProductsOfCart(cid){
        try{
            const productsQuantity = [];
            const cart = await this.getById(cid);
            if(cart){
                for(const product of cart.products){
                    const fullProduct = await productService.getById(product.product_id);
                    const obj = {
                        product_id: fullProduct._id,
                        product_name: fullProduct.name,
                        price: (fullProduct.price * product.quantity),
                        quantity: product.quantity
                    };
                    productsQuantity.push(obj);
                }
                return productsQuantity
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async generateTicket(userId, cid){
        try{
            const cart = await this.getById(cid);
            const user = await userService.getById(userId);
            const cartProducts = await this.getProductsOfCart(cid);

            let total = 0;
            let indexToRemove = [];

            for(const prod of cartProducts){
                const productDb = await productService.getById(prod.product_id);
                if(prod.quantity <= productDb.stock){
                    total = total + prod.price;

                    productDb.stock = productDb.stock - prod.quantity;
                    await productService.updateProduct(productDb._id, productDb);

                    indexToRemove.push(cartProducts.findIndex( (p) => p == prod ));
                }else{
                    // console.log('No se compra');
                }
            }
            
            indexToRemove = indexToRemove.reverse();
            for(const index of indexToRemove){
                cartProducts.splice(index, 1);
            }

            cart.products = cartProducts;
            await this.updateCart(cid, cart);
            
            const ticket = await ticketService.generateTicket(user.email, total);
            if(ticket){
                return ticket
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async updateCart(cid, cart){
        try{
            const updatedCart = await cartDao.updateCart(cid, cart);
            if(updatedCart){
                return updatedCart
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async quantityUpdate(cid, pid, new_quantity){
        try{
            const cart = await this.getById(cid);

            if(cart){
                for(const product of cart.products){
                    if(product.product_id == pid){
                        product.quantity = new_quantity
                    }
                }

                const updatedCart = await this.updateCart(cid, cart);
                if(updatedCart){
                    return updatedCart
                }else{
                    return false
                }

            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async removeItemFromCart(cid, pid){
        try{
            const response = await cartDao.removeItemFromCart(cid, pid);
            if(response){
                return response
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async deleteCart(cid){
        try{
            const response = await cartDao.deleteCart(cid);
            if(response){
                return response
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}

export const cartService = new CartService();