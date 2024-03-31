import { productService } from "./productService.js";
import { userService  } from "./userService.js";
import { cartService } from "./cartService.js";
import { ticketService } from "./ticketService.js";

class ViewService{
    async getAllProducts(){
        try{
            const products = await productService.getAll();
            return products
        }catch(error){
            throw new Error(error)
        }
    }

    async getProductById(id){
        try{
            return await productService.getById(id)
        }catch(error){
            throw new Error(error)
        }
    }

    async getProductsOfCart(cid){
        try{
            const cart = await cartService.getProductsOfCart(cid);
            if(cart){
                return cart    
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getTicketById(tid){
        try{
            const ticket = await ticketService.getTicketById(tid);
            if(ticket){
                return ticket
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async createProductsMock(cant=100){
        try{
            const products = await productService.createPRoductMock(cant);
            if(products){
                return products
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getAllUsers(){
        try{
            const users = await userService.getAllUsers();
            if(users){
                return users
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}

export const viewService = new ViewService();