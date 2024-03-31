import  ProductDao  from '../daos/productDao.js';
const productDao = new ProductDao();

import ProductRepository from '../repository/productRepository.js';
const productRepository = new ProductRepository();

import { userService } from './userService.js';
import { deletedProductOwnerEmail } from './emailService.js';

class ProductService{
    async getAll(){
        try{
            // return await productDao.getAll()
            const prods = await productRepository.getAllProducts();
            if(prods){
                return prods
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getById(id){
        try{
            // const prod = await productDao.getById(id);
            const prod = await productRepository.getProductById(id);
            if(prod){
                return prod
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async createProduct(prod, id, role){
        try{
            // const product = await productDao.createProduct(prod);
            if(role == 'premium'){
                prod = { ...prod, owner: id}
            }else{
                prod = { ...prod, owner: 'admin'}
            }

            const product = await productRepository.createProduct(prod);
            if(product){
                return product
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async deleteProduct(pid){
        try{
            const product = await this.getById(pid);
            if(product){
                const deletedProduct = await productDao.deleteProduct(pid);
                if(deletedProduct){
                    if(product.owner != 'admin'){
                        const user = await userService.getById(product.owner);
                        if(user){
                            //Send email to owner of product deleted
                            // console.log(user.email);
                            const response = await deletedProductOwnerEmail(user.email);
                        }
                    }
                    return deletedProduct
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

    async updateProduct(id, prod){
        try{
            const updatedProduct = await productDao.updateProduct(id, prod)
            if(updatedProduct){
                return updatedProduct
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async createPRoductMock(cant=100){
        try{
            const products = await productDao.createPRoductMock(cant);
            if(products){
                return products
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}

export const productService = new ProductService();