//#region Importaciones
import Log from "./Logs";
import HttpStatusCode from "../../utils/enums/HttpStatusCode";
import objectToArray from "../functions/objectToArray";
import { Response } from "express";
//#endregion

/** Clase para responder a solicitudes HTTP */
class SendResponse<T> {
    public subcomponente: string = '';
    private component: string;
    private log: Log;

    /**
    * Establece el nombre del componente sobre el cual se está trabajando, a fin de generar logs en caso de errores.
    * @param {string} component Nombre del componente en el que se está instanciando la clase.
    */
    constructor( component: string ) {
        this.component = component;
        this.log = new Log(component);
    }

    /**
    * Response con un JSON que retornará el código http, la data suministrada y la cantidad de datos devueltos.
    * @param {Response} response                Respuesta (Express)
    * @param {object | array | string} data     Data que se retornará al cliente.
    * @param {number} total                     Total de datos existentes en la base de datos.
    * @param {HttpStatusCode} httpStatusCode    Código HTTP que se responderá al cliente.
    */
    public async SuccesResponse(
        response: Response, 
        data: T | T[] | string | null = null,
        total: number | null = null,
        httpStatusCode: HttpStatusCode = HttpStatusCode.Ok
    ) {
        try {
            if ( !data ) return this.CustomResponse(response, HttpStatusCode.NoContent, data);
            
            response.status(httpStatusCode).json({
                ok: true,
                errorMessage: null,
                total,
                data: objectToArray(data)
            });
            
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.SuccesResponse');
        }
    }

    /**
    * Response con un JSON que retornará el código http y la data suministrada. No retorna la cantidad de datos retornados.
    * @param {Response} response                Respuesta (Express)
    * @param {object | Array | string} data     Data que se retornará al cliente.
    * @param {HttpStatusCode} httpStatusCode    Código HTTP que se responderá al cliente.
    */
    public async CustomResponse(
        response: Response, 
        httpStatusCode: HttpStatusCode = HttpStatusCode.NoContent, 
        data: T | T[] | string | null = null
    ) {
        try {
            response.status(httpStatusCode).json({
                ok: true,
                errorMessage: null,
                data
            });
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.CustomResponse');
        }
    }

    /**
    * Response con un JSON que retornará mensajes de error generados por el middleware de validarCampos.
    * @param {Response} response                        Respuesta (Express)
    * @param {string} errorMessage                      Mensaje de error que se retornará al cliente
    * @param {object | Array | string | null} data      Data que se retornará al cliente.
    */
    public async BadResponse(
        response: Response, 
        errorMessage: string, 
        data: object | Array<T> | string | null = null
    ) {
        try {
            response.status(HttpStatusCode.BadRequest).json({
                ok: false,
                errorMessage,
                total: 0,
                data
            });
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.BadResponse');
        }
    }

    /**
    * Response con un JSON que retornará respuestas enfocadas a errores. Sólo debe utilizarse para excepciones
    * @param {Response} res                     Respuesta (Express)
    * @param {HttpStatusCode} httpStatusCode    Código HTTP que se responderá al cliente
    * @param {string} errorMessage              Mensaje de error que se retornará al cliente
    * @param {unknown} error                    Mensaje de error de la excepción. (Se almacenará en un log)
    * @param {object | array | string | null} data      Data que se retornará al cliente.
    */
    public async ErrorResponse( 
        res: Response, 
        httpStatusCode: HttpStatusCode = HttpStatusCode.InternalServerError, 
        errorMessage: string = 'Error no especificado', 
        error: unknown = 'No especificado',
        data: object | Array<T> | string | null = null
    ): Promise<void> {
        try {
            this.log.Error(error, this.subcomponente, errorMessage);
            res.status(httpStatusCode | HttpStatusCode.InternalServerError).json({
                ok: false,
                errorMessage,
                total: 0,
                data
            });
        } catch (ex) {
            this.log.Error(ex, this.subcomponente, 'Error TryCatch SendResponse.ErrorResponse');
        }
    }
}

export default SendResponse;