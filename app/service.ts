//#region Importaciones
import { Order } from "sequelize";
import { IDeleteRequest, IGetRequest, IPostRequest, IPutRequest } from "../utils/interfaces/ServiceRequest";
import { IProductQuery, Product } from '../utils/interfaces/Product';
import stringToBoolean from "../utils/functions/stringToBoolean";
import { TBL_ProductModel } from './model';
//#endregion

/** Servicio para la interacción de la base de datos con la tabla Product. */
class ProductService {

    private order: Order = [['id_product', 'ASC']];

    /**
    * Retorna todos los productos de la base de datos que coincidan con la consulta solicitada.
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IProductOutput[]}        Lista de productos retornados por la vista.
    */
    public async getProducts( request: IGetRequest | any = {} ) {
        const { limit = 40, offset = 0, ...conditions } = this.verifyQuery(request?.query);
        return TBL_ProductModel.findAndCountAll<Product>({ 
            where: { ...conditions },
            limit,
            offset,
            order: this.order, 
        });
    }

    /**
    * Retorna un producto específico de la de base de datos
    * @param {IGetRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IProductOutput}          Producto específico.
    */
    public async getProduct( request: IGetRequest | any = {} ) {
        const { limit = 40, offset = 0, ...conditions } = this.verifyQuery(request?.query);
        conditions['id_product'] = request?.params.id_product;
        return TBL_ProductModel.findAndCountAll({ 
            where: { ...conditions },
            limit,
            offset,
            order: this.order, 
        });
    }

    /**
    * Actualiza la información de un producto específico
    * @param {IPutRequest} request      Objeto con la data enviada de la solicitud. 
    * @return {IProductOutput[]}        Producto específico retornado por la tabla.
    */
    public async putProduct( request: IPutRequest | any = {} ) {
        const { body, params, query } = request;
        
        const { rows:data } = await this.getProduct({params});
        const update = await data[0]?.update(body) || null;

        return (update)
        ? this.getProducts(this.verifyQuery(query))
        : { rows: null, count: 0 };
    }

    /**
    * Crea un nuevo producto en la base de datos.
    * @param {IPostRequest} request     Objeto con la data enviada de la solicitud. 
    * @return {IProductOutput[]}        Producto específico retornado por la tabla.
    */
    public async postProduct( request: IPostRequest | any = {} ) { 
        const { body, query } = request;
        
        const data = await TBL_ProductModel.create(body) || null;

        return (data)
        ? this.getProducts(this.verifyQuery(query))
        : { rows: null, count: 0 };
    }

    /**
    * Realiza un borrado lógico en la base de datos del producto especificado.
    * @param {IDeleteRequest} request   Objeto con la data enviada de la solicitud.
    * @return {IProductOutput[]}        Producto específico retornado por la tabla.
    */
    public async deleteProduct( request: IDeleteRequest | any = {} ) {
        request.body.status = false;
        const product = await this.putProduct(request);

        return (product)
        ? product
        : { rows: null, count: 0 };
    }

    /**
    * Retorna un objeto con los queryParameters enviados, convertidos en su respectivo tipo de dato.
    * @param {object} queryParams   Objeto con los query parameters enviados al API.
    * @return {object}              Objeto con los query parameters convertidos a su tipo de dato.
    */
    private verifyQuery = ( queryParams: object | any ): IProductQuery => {
        try {
            const allowedParameters = {
                all: ['id_product', 'name', 'price', 'stock', 'status', 'limit', 'offset'],
                boolean: ['status'],
                number: ['id_product', 'price', 'stock', 'limit', 'offset']
            }

            let conditions: { [char: string]: IProductQuery } = {};
            for( const param in queryParams ) {
                const parameter = param.toLowerCase().trim();

                if ( allowedParameters.all.includes(parameter) && parameter != null && parameter != undefined ) {
                    if ( allowedParameters.boolean.includes(parameter) ) queryParams[ param ] = stringToBoolean(queryParams[ param ]);
                    if ( allowedParameters.number.includes(parameter) ) queryParams[ param ] = Number(queryParams[ param ]);

                    conditions[param] = queryParams[param];
                }
            }
            return conditions;

        } catch ( err: unknown) {
            return {}
        }
    }
}

export default ProductService;