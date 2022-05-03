//#region Importaciones
import { DataTypes } from "sequelize";
import database from "../config/database.config"; 
import { Product } from "../utils/interfaces/Product";
//#endregion


export const TBL_ProductModel = Product.init({
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.FLOAT,
        validate: {
            notEmpty: true
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    sequelize: database
});

TBL_ProductModel.addHook('beforeCreate', ( product: Product ) => {
    product.name = product.name.toLowerCase();
});
