import { Model, InferAttributes, InferCreationAttributes, CreationOptional, WhereOptions, Optional } from 'sequelize';

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id_product: number;
    declare name: string;
    declare price: number;
    declare stock: CreationOptional<number>;
    declare status: CreationOptional<boolean>;
}

export interface IProductOutput {
    id_product: number;
    name: string;
    price: number;
    stock: number;
    status: boolean;
}

/** Interface de elementos con los posibles parámetros de consulta */
export interface IProductQuery extends Optional<IProductOutput, "id_product" | "name" | "price" | "stock" | "status"> {
    limit?: number;
    offset?: number;
}