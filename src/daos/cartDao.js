import { CartModel } from "./models/cartModel.js";

export default class CartDao{
    async createCart(){
        try{
            return await CartModel.create({})
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            return await CartModel.findById(id)
        }catch(error){
            throw new Error(error)
        }
    }

    async wipeCart(cid){
        try{
            const cart = { products: [] };
            return await CartModel.findByIdAndUpdate({ _id: cid }, cart)
        }catch(error){
            throw new Error(error)
        }
    }

    async getQuantityInCart(cid, pid){
        try{
            let returnQuantity = 0;
            const cart = await this.getById(cid);
            cart.products.forEach( (product) => {
                if(product.product_id == pid){
                    returnQuantity = product.quantity;
                }
            });
            return returnQuantity
        }catch(error){
            throw new Error(error)
        }
    }

    async addItemToCart(cid, pid, quantity){
        try{
            const quantity_number = Number(quantity)
            const checkCart = await this.getQuantityInCart(cid, pid);
            const cart = await this.getById(cid);
            if(checkCart == 0){
                cart.products.push({
                    product_id: pid, quantity
                });
            }else{
                const index = cart.products.map(el => el.product_id).indexOf(pid)
                cart.products[index].quantity = cart.products[index].quantity + quantity_number
            }
            return await CartModel.findByIdAndUpdate({ _id: cid }, cart)
        }catch(error){
            throw new Error(error)
        }
    }

    async updateCart(cid, cart){
        try{
            const updatedCart = await CartModel.findByIdAndUpdate({_id: cid}, cart);
            if(updatedCart){
                return updatedCart
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async removeItemFromCart(cid, pid){
        try{
            let contains = false;
            let prodIndex = -1;
            const cart = await this.getById(cid);
            cart.products.forEach( (product, index) => {
                if(product.product_id == pid){
                    contains = true;
                    prodIndex = index
                }
            })
            if(contains){
                const x = cart.products.splice(prodIndex, 1);

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

    async deleteCart(cid){
        try{
            const deletedCart = await CartModel.findByIdAndDelete(cid);
            if(deletedCart){
                return deletedCart
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}