//#region Importaciones
import { Request, Response } from "express";
import HttpStatusCode from "../utils/enums/HttpStatusCode";
import { IDeleteRequest, IGetRequest, IPostRequest, IPutRequest } from "../utils/interfaces/ServiceRequest";
import { Product } from "../utils/interfaces/Product";
import ProductService from './service';
import SendResponse from "../utils/helpers/Response";
//#endregion

const productService = new ProductService();
const sendResponse = new SendResponse<Product>('Product - Controller');

export const getProducts = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'getProducts';
    try {
        const request: IGetRequest = {
            query: req?.query
        }

        const { rows: products, count: total } = await productService.getProducts(request);
        sendResponse.SuccesResponse(res, products, total);
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const getProduct = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'getProduct';
    try {
        const request: IGetRequest = {
            query: req?.query,
            params: req?.params
        }
        
        const { rows: products, count: total } = await productService.getProduct(request);
        sendResponse.SuccesResponse(res, products, total);
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const putProduct = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'putProduct';
    try {
        const request: IPutRequest = {
            body: req.body,
            params: req.params,
            query: req?.query,
        }

        const { rows: products, count: total } = await productService.putProduct(request);

        (products)
        ? sendResponse.SuccesResponse(res, products, total)
        : sendResponse.BadResponse(res, 'El identificador suministrado no existe o no es posible modificarlo.');
    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const postProduct = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'postProduct';
    try {
        const request: IPostRequest = {
            body: req.body,
            params: req.params,
            query: req?.query
        }
        
        const { rows: products, count: total } = await productService.postProduct(request);
        
        (products)
        ? sendResponse.SuccesResponse(res, products)
        : sendResponse.BadResponse(res, `No se puede crear el producto con el ID suministrado.`);

    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}

export const deleteProduct = async( req: Request, res: Response ) => {
    sendResponse.subcomponente = 'deleteProduct';
    try {
        const request: IDeleteRequest = {
            params: req.params,
            query: req?.query,
            body: { status: false }
        }
        
        const { rows: products, count: total } = await productService.deleteProduct(request);
        
        (products)
        ? sendResponse.SuccesResponse(res, products, total)
        : sendResponse.BadResponse(res, `No se puede crear el producto con el ID suministrado .`);

    }
    catch (error: unknown) {
        sendResponse.ErrorResponse(res, HttpStatusCode.InternalServerError, 'Contacte a un administrador', error);
    }
}