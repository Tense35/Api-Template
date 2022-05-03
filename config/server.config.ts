//#region Importaciones
import config from "./config";
import cors from "cors";
import db from "./database.config";
import express, { Application } from "express";
import Logs from "../utils/helpers/Logs";
import router from "../app/routes";
//#endregion

class Server {
    private app: Application;
    private port: number;
    private logs = new Logs('server.config');

    constructor() {
        this.app = express();
        this.port = config.api.port;
        this.databaseConnection();
        this.middlewares();
        this.routes();
    }

    async databaseConnection(): Promise<void> {
        try {
            await db.authenticate();
            this.logs.Info('Database online', 'databaseConnection');
        } 
        catch (exception: unknown) {
            this.logs.Error(exception, 'Error al conectar la base de datos');
            const error = exception as ErrorEvent;
            throw new Error( error.message );
        }
    }

    middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use(`/${config.api.version}`, router);
    }

    listen(): void {
        this.app.listen( this.port, () => {
            console.clear();
            this.logs.Info(`Servidor corriendo en puerto ${this.port}`, 'listen');
        });
    }
}

export default Server;