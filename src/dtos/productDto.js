// Object that goes from the back to the front
export class ProductResDTO {
    constructor(product) {
        this._id = product._id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.owner = product.owner;
    }
}

// Object that goes from the front to the back
export class ProductReqDTO {
    constructor(product) {
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.owner = product.owner;
    }
}