import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    _id: false,
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const cartSchema = new Schema({
    products: {
        type: [productSchema]
    }
});

export const CartModel = model('carts', cartSchema);