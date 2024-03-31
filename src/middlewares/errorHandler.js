import { HttpResponse } from './httpResponse.js';
const httpResponse = new HttpResponse();

export const errorHandler = (error, req, res, next) => {
    console.log( `Error: ${error}`);
    return httpResponse.NotFound(res, error.message)
}