import { viewService } from "../services/viewService.js";

export const register = (req, res) => {
    res.render('register');
};

export const errorRegister = (req, res) => {
    res.render('errorRegister');
};

export const login = (req, res) => {
    res.render('login');
};

export const errorLogin = (req, res) => {
    res.render('errorLogin');
};

export const profile = (req, res) => {
    if(req.user.role == 'admin'){
        res.render('profile', { ...req.user, admin: true, premium: false });
    }else if(req.user.role == 'premium'){
        res.render('profile', { ...req.user, admin: false, premium: true });
    }else{
        res.render('profile', { ...req.user, admin: false, premium: false });
    }
};

export const logout = (req, res) => {
    res.render('logout');
}

export const products = async (req, res) => {
    const products = await viewService.getAllProducts();
    if(req.user.role=='admin'){
        res.render('products', { ...req.user, products: products, admin: true, premium: false });
    }else if(req.user.role=='premium'){
        const cart = await viewService.getProductsOfCart(req.user.cart);
        res.render('products', { ...req.user, products: products, admin: false, premium: true, fullCart: cart });
    }else{
        const cart = await viewService.getProductsOfCart(req.user.cart);
        res.render('products', { ...req.user, products: products, admin: false, premium: false, fullCart: cart });
    }
}

export const current = (req, res) => {
    res.render('current', { ...req.user });
}

export const productUpdate = async (req, res) => {
    const { id } = req.params
    const prod = await viewService.getProductById(id);
    res.render('product_update', { ...prod});
}

export const purchase = async (req, res) => {
    const { tid } = req.params;
    const ticket = await viewService.getTicketById(tid);
    res.render('purchase', ticket);
}

export const productsMock = async (req, res) => {
    const cant = 100;
    const products = await viewService.createProductsMock(cant);
    res.redirect('product_list');
}

export const reset_password = async (req, res) => {
    res.render('reset-password');
}

export const new_password = async (req, res) => {
    const { email } = req.query;
    res.render('new-password', {email: email});
}

export const admin_user_panel = async (req, res) => {
    const users = await viewService.getAllUsers();
    res.render('admin_user_panel', {users: users});
}

export const create_product = async (req, res) => {
    res.render('create_product');
}