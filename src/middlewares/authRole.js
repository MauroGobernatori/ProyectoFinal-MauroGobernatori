export const authRoleAdmin = (req, res, next) => {
    if(req.user.role == 'admin'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only admins can delete or update products' })
    }
}

export const authRoleUserOrPremium = (req, res, next) => {
    if(req.user.role == 'user' || req.user.role == 'premium'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only users can manipulate carts' })
    }
}

export const authRoleAdminPremium = (req, res, next) => {
    if(req.user.role == 'admin' || req.user.role == 'premium'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only admins or premiums can create products' })
    }
}

export const authRoleAdminOwner = (req, res, next) => {
    if(req.user._id == req.body.owner || req.user.role == 'admin'){
        return next()
    }else{
        res.status(401).send({ msg: 'Only admins or owners can delete or update products' })
    }
}

export const authRoleUserNotOwner = (req, res, next) => {
    if((req.user.role == 'user' || req.user.role == 'premium') && req.user._id != req.body.owner){
        return next()
    }else{
        res.status(401).send({ msg: 'Only users and premium users that are not owners of the product can add the product to the cart' })
    }
}