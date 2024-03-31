import  { productService }  from '../services/productService.js';

import { HttpResponse, errorsDictionary } from '../middlewares/httpResponse.js';
const httpResponse = new HttpResponse();

export default class ProductController{

    async createProduct(req, res, next){
        try{
            const { name, description, price, stock } = req.body;
            const prod = {
                name: name, description: description, price: price, stock: stock
            }
            const { _id, role } = req.user;
            const newProduct = await productService.createProduct(prod, _id, role);
            if(newProduct){
                req.logger.debug(`Product created successfully. ${newProduct}`);
                res.redirect('/create_product');
            }else{
                req.logger.error('Product creation error!');
                return httpResponse.NotFound(res, errorsDictionary.ERROR_CREATE_PRODUCT);
            }
        }catch(error){
            req.logger.error('Error with product creation function!');
            next(error);
        }
    }

    async deletedProduct(req, res, next){
        try{
            const {id} = req.params;
            if(id){
                const deletedProduct = await productService.deleteProduct(id);
                if(deletedProduct){
                    req.logger.debug(`Product deleted successfully. ${deletedProduct}`);
                    res.redirect(303, '/product_list');
                }else{
                    req.logger.error('Product deletion error!');
                    return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_PRODUCT);
                }
            }else{
                req.logger.error(`Product deletion error! Incorrect method '${method}'.`);
                return httpResponse.NotFound(res, errorsDictionary.ERROR_DELETE_PRODUCT);
            }
        }catch(error){
            req.logger.error('Error with product deletion function!');
            next(error);
        }
    }

    async updateProduct(req, res, next){
        try{
            const { name, description, price, stock } = req.body;
            const { id } = req.params;
            const prod = {
                name: name,
                description: description,
                price: price,
                stock: stock
            }
            if(id){
                const updatedProduct = await productService.updateProduct(id, prod)
                if(updatedProduct){
                    req.logger.debug(`Product updated successfully. ${updatedProduct}`);
                    res.redirect(303, '/product_list');
                }else{
                    req.logger.error('Product update error!');
                    return httpResponse.NotFound(res, errorsDictionary.ERROR_UPDATE_PRODUCT);
                }
            }else{
                req.logger.error(`Product update error! Incorrect method '${method}'.`);
                return httpResponse.NotFound(res, errorsDictionary.ERROR_UPDATE_PRODUCT);
            }
        }catch(error){
            req.logger.error('Error with product update function!');
            next(error);
        }
    }

    async getAllProducts(req, res, next){
        try{
            const allProducts = await productService.getAll();
            if(allProducts){
                res.json({ allProducts });
            }else{
                req.logger.error(`All products visualization error!`);
                return httpResponse.NotFound(res, errorsDictionary.ERROR_SHOW_ALL_PRODUCTS);
            }
        }catch(error){
            req.logger.error('Error with all product visualization!');
            next(error);
        }
    }

    async getProductById(req, res, next){
        try{
            const { id } = req.params;
            const product = await productService.getById(id);
            if(product){
                res.json({ product });
            }else{
                req.logger.error(`Product by id visualization error!`);
                return httpResponse.NotFound(res, errorsDictionary.ERROR_SHOW_PRODUCT_BY_ID);
            }
        }catch(error){
            req.logger.error('Error with product by id visualization!');
            next(error);
        }
    }
}