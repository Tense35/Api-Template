//#region Importaciones
import { body, check, param } from 'express-validator';
import { Router } from 'express';
import { validarCampos } from '../utils/helpers/validarCampos.middleware';
import { getProducts, getProduct, postProduct, putProduct, deleteProduct } from './controller';
import { productExist } from '../utils/functions/productExist';
// import { deleteRango, getRango, getRangos, postRango, putRango } from './rango.controller';
//#endregion

//#region Rutas
const router = Router();
    
router.get('/', getProducts);

router.get('/:id_product', [
    param('id_product', 'Debe de proporcionar un identificador del producto.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt(),
    validarCampos
], getProduct);

router.post('/', [
    body('id_product', 'Debe de proporcionar un identificador del producto.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom(async id_product => productExist(id_product, false)),
    body('name', 'Debe ingresar el nombre del producto.')
        .notEmpty()
        .isString().withMessage('El nombre del producto debe ser un string.')
        .isLength({ max: 60 }).withMessage('El nombre del producto es de máximo 60 caracteres.'),
    body('price', 'Debe ingresar el precio del producto.')
        .notEmpty()
        .isNumeric().withMessage('El price del producto debe ser numérico.')
        .toFloat(),
    body('stock', 'Debe ingresar el stock del producto.')
        .isNumeric().withMessage('El stock del producto debe ser numérico')
        .toInt()
        .optional({nullable: true, checkFalsy: true}),
    body('status', 'El status debe de ser de tipo boolean.')
        .isBoolean()
        .toBoolean()
        .optional({nullable: true, checkFalsy: true}),
    validarCampos
], postProduct);

router.put('/:id_product', [
    param('id_product', 'Debe de proporcionar un identificador del producto.')
        .notEmpty()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .toInt()
        .custom(async value => productExist(value, true)),
    body('name', 'Debe ingresar el nombre del producto.')
        .notEmpty()
        .isString().withMessage('El nombre del producto debe ser un string.')
        .isLength({ max: 60 }).withMessage('El nombre del producto es de máximo 60 caracteres.')
        .optional({nullable: true, checkFalsy: true}),
    body('price', 'Debe ingresar el precio del producto.')
        .notEmpty()
        .isNumeric().withMessage('El price del producto debe ser numérico.')
        .toFloat()
        .optional({nullable: true, checkFalsy: true}),
    body('stock', 'Debe ingresar el stock del producto.')
        .isNumeric().withMessage('El stock del producto debe ser numérico')
        .toInt()
        .optional({nullable: true, checkFalsy: true})
        .optional({nullable: true, checkFalsy: true}),
    body('status', 'El status debe de ser de tipo boolean.')
        .isBoolean()
        .toBoolean()
        .optional({nullable: true, checkFalsy: true}),
    validarCampos
], putProduct);

router.delete('/:id_rango', [
    param('id_rango', 'Debe de proporcionar un identificador del rango.')
        .notEmpty()
        .toInt()
        .isNumeric().withMessage('El identificador debe de ser numérico.')
        .custom(async value => productExist(value)),
    validarCampos
], deleteProduct);

//#endregion

export default router;