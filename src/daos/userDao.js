import { UserModel } from "./models/userModel.js";
import { createHash, isValidPassword } from '../utils.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class UserDaoMongoDB {
    async getAll(){
        try{
            const response = await UserModel.find().lean();
            if(response){
                return response
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getByEmail(email){
        try{
            const response = await UserModel.findOne({ email });
            if(response){
                return response
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            const user = await UserModel.findById(id);
            if(user){
                return user
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    // Realiza el registro del usuario
    async register(user){
        try {
            const { email, password } = user;
            const exists = await this.getByEmail(email);
            if (!exists){
                if(email === 'adminCoder@coder.com' && password === 'adminCoder123'){
                    return await UserModel.create({
                        ...user,
                        password: createHash(password),
                        role: 'admin'
                    });
                }
                return await UserModel.create({
                    ...user,
                    password: createHash(password)
                });
            }else{
                return false;
            }
        }catch(error){
            throw new Error(error)
        }
    }

    // Chequea el email y contraseña en la base de datos para realizar el login del usuario
    async login(email, password){
        try{
            const userExist = await this.getByEmail(email);
            if (userExist){
                const isValid = isValidPassword(userExist, password);
                if(isValid){
                    return userExist
                }else{
                    return false
                }
            }else{
                return false;
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async modifyRole(id){
        try{
            const user = await this.getById(id);
            if(user){
                if(user.role == 'user'){
                    const newUser = await UserModel.findByIdAndUpdate(id, { $set: { role: 'premium'}})
                    return newUser
                }else if(user.role == 'premium'){
                    const newUser = await UserModel.findByIdAndUpdate(id, { $set: { role: 'user'}})
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
    
    async updatePass(email, pass){
        try{
            const userExist = await this.getByEmail(email);
            if (userExist){
                const isEqual = isValidPassword(userExist, pass);
                if(isEqual){
                    return false
                }
                const newPass = createHash(pass);
                return await UserModel.findByIdAndUpdate(userExist._id, {password: newPass})
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async deleteUser(id){
        try{
            const userDeleted = await UserModel.findByIdAndDelete(id);
            if(userDeleted){
                return userDeleted
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async updateLastConnection(uid){
        try{
            const user = await this.getById(uid);
            if(user){
                const date_now = new Date();
                const userUpdated = await UserModel.findByIdAndUpdate(user._id, { $set: { last_connection: date_now }});
                if(userUpdated){
                    return userUpdated
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

    async deleteByConnection(userIds){
        try{
            for(const userId of userIds){
                await UserModel.findByIdAndDelete(userId)
            }
            return true
        }catch(error){
            throw new Error(error)
        }
    }
}