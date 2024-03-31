import UserDao from '../daos/userDao.js';
const userDao = new UserDao();

import UserRepository from '../repository/userRepository.js';
const userRepository = new UserRepository();

import { cartService } from './cartService.js';
import { deletedByConnectionEmail } from './emailService.js';

class UserService{
    async getAllUsers(){
        try{
            const users = await userRepository.getAllUsersMainData();
            if(users){
                return users
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getByEmail(email){
        try{
            // return await userDao.getByEmail(email)
            const user = await userRepository.getUserByEmail(email);
            if(user){
                return user
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            // return await userDao.getById(id)
            const user = await userRepository.getUserById(id);
            if(user){
                return user
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async register(user){
        try{
            const newCart = await cartService.createCart();
            if(newCart){
                const newUser = await userDao.register({...user, cart: newCart._id});
                if(newUser){
                    return newUser
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

    async login(email, password){
        try{
            const userExists = await userDao.login(email, password);
            if(userExists){
                return userExists
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async wipeCart(id){
        try{
            // const user = await userDao.getById(id);
            const user = await this.getById(id);
            if(user){
                const cartWiped = await cartService.wipeCart(user.cart)
                if(cartWiped){
                    return cartWiped
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

    async modifyRole(id){
        try{
            const user = await userDao.modifyRole(id);
            if(user){
                return user
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async updatePass(user, pass){
        try {
            const response = await userDao.updatePass(user, pass);
            if (!response){
                return false
            }else{
                return response
            }
        }catch(error) {
            throw new Error(error)
        }
    }

    async deleteUser(uid){
        try {
            const user = await this.getById(uid);
            if(user){
                const cartDeleted = await cartService.deleteCart(user.cart);
                if(cartDeleted){
                    const userDeleted = await userDao.deleteUser(uid);
                    if(userDeleted){
                        return userDeleted
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            }else{
                return false
            }
        }catch(error) {
            throw new Error(error)
        }
    }

    async updateLastConnection(uid){
        try {
            const connection_updated = await userDao.updateLastConnection(uid);
            if(connection_updated){
                return connection_updated
            }else{
                return false
            }
        }catch(error) {
            throw new Error(error)
        }
    }

    async deleteByConnection(){
        try {
            const users = await this.getAllUsers();
            if(users){
                const userIds = [];
                const userEmails = [];
                const date_now = new Date();
                for(const user of users){
                    let diffTime = Math.abs(date_now - user.last_connection);
                    let diffDays = Math.ceil(diffTime / (1000*60*60*24));
                    if(diffDays >= 2){
                        userIds.push(user._id);
                        userEmails.push(user.email);
                    }
                }
                const deleteUsers = await userDao.deleteByConnection(userIds);
                if(deleteUsers){
                    // Sends the email of account deleted
                    for(const email of userEmails){
                        const emailSended = await deletedByConnectionEmail(email);
                    }
                    return deleteUsers
                }else{
                    return false
                }
            }else{
                return false
            }
        }catch(error) {
            throw new Error(error)
        }
    }
}

export const userService = new UserService();