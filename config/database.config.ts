import { Sequelize } from 'sequelize';
import config from './config';

const name: string = config.database.name;
const host: string = config.database.host;
const user: string = config.database.user;
const password: string = config.database.password;


// Parámetros: DbName, User, Contraseña, Confg - RemoteMysql
const database = new Sequelize(name, user, password, {
    host,
    dialect: 'mysql',
    //logging: false
});

export default database;