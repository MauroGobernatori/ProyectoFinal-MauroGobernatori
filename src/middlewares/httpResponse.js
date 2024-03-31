const httpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
};

export const errorsDictionary = {
    ERROR_SHOW_ALL_PRODUCTS: 'Error showing all products',
    ERROR_SHOW_PRODUCT_BY_ID: 'Error showing product by id',
    ERROR_CREATE_PRODUCT: 'Error creating product',
    ERROR_DELETE_PRODUCT: 'Error deleting product',
    ERROR_UPDATE_PRODUCT: 'Error updating product',
    ERROR_SHOW_CART: 'Error showing cart',
    ERROR_ADD_TO_CART: 'Error adding product to cart',
    ERROR_WIPE_CART: 'Error wiping cart',
    ERROR_REMOVE_ITEM: 'Error removing item',
    ERROR_UPDATE_QUANTITY: 'Error updating quantity',
    ERROR_CREATE_USER: 'Error creating user',
    ERROR_PURCHASE: 'Error making purchase',
    ERROR_LOGOUT: 'Error with logout'
}

export class HttpResponse {
    Ok(res, data) {
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            message: "Success",
            data: data,
        });
    }

    NotFound(res, data) {
        return res.status(httpStatus.NOT_FOUND).json({
            status: httpStatus.NOT_FOUND,
            message: "Not Found",
            error: data,
        });
    }

    Unauthorized(res, data) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            status: httpStatus.UNAUTHORIZED,
            message: "Unauthorized",
            error: data,
        });
    }

    Forbidden(res, data) {
        return res.status(httpStatus.FORBIDDEN).json({
            status: httpStatus.FORBIDDEN,
            message: "Forbidden",
            error: data,
        });
    }

    ServerError(res, data) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error",
            error: data,
        });
    }
}