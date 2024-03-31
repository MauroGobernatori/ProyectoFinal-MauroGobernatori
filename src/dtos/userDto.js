// Object from back to front
export class UserResDTO {
    constructor(user){
        this._id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
        this.isGithub = user.isGithub;
        this.cart = user.cart;
        this.last_connection = user.last_connection
    }
}

export class UserResDTOMainData {
    constructor(user){
        this._id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.role = user.role;
        this.last_connection = user.last_connection
    }
}

export class UserReqDTO {
    constructor(user){
        // this.
    }
}