import ProductService from "../../app/service";
import { IGetRequest } from "../interfaces/ServiceRequest";

/**
* Permite verificar si el producto existe o no dentro de la base de datos.
* @param {number} id_product     Identificador del producto que se desea verificar.
* @param {boolean} shouldExist   Determina si se desea que el producto exista. 
*/
export const productExist = async ( id_product: number, shouldExist: boolean = true ) => {
    const productService = new ProductService();
    const request: IGetRequest = {
        params: { id_product }
    }

    return productService.getProduct(request)
        .then(({ count }) => {
            const exist = ( count < 1 )? false : true;

            if (exist && !shouldExist) return Promise.reject('El identificador del producto proporcionado ya existe');
            if (!exist && shouldExist) return Promise.reject('El identificador del producto proporcionado no existe');
        });
}