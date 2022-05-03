//#region Importaciones
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import SendResponse from './Response';
//#endregion

const sendResponse = new SendResponse('Validación de campos');

export const validarCampos = ( req: Request, res: Response, next: NextFunction ) => {
    const errors = validationResult( req );
    if (!errors.isEmpty()) {
        const msg = errors['errors'][0].msg;
        return sendResponse.BadResponse(res, msg);
    }
    
    next();
}