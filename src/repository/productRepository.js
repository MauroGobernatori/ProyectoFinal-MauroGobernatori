import ProductDao from "../daos/productDao.js";
const productDao = new ProductDao();

import { ProductResDTO, ProductReqDTO } from "../dtos/productDto.js";

export default class ProductRepository{
    async getAllProducts(){
        try {
            const prods = await productDao.getAll();
            const prodsDTO = [];
            if(prods){
                for(const prod of prods){
                    prodsDTO.push(new ProductResDTO(prod));
                }
                return prodsDTO
            }else{
                return false
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductById(id){
        try {
            const prod = await productDao.getById(id);
            return new ProductResDTO(prod)
        } catch (error) {
            throw new Error(error);
        }
    }

    async createProduct(prod){
        try {
            const prodAfterDTO = new ProductReqDTO(prod);
            const prodCreated = await productDao.createProduct(prodAfterDTO);
            if(prodCreated){
                return prodCreated
            }else{
                return false
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}