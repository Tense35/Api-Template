/** Clase para la generación de logs. */
class Log {

    private separator: string = '--------------------------------------------------------------------------';
    private component: string = '';

    /**
    * Establece el nombre del componente sobre el cual se está trabajando, a fin de generar logs en caso de errores.
    * @param  {string} component Nombre del componente en el que se está instanciando la clase.
    */
    constructor( component: string ) {
        this.component = component;
    }

    /**
    * Genera un log de información.
    * @param {string} message          Mensaje que se desea imprimir en el log.
    * @param {string} subcomponent     Nombre de la función o área específica desde donde se llama el método.
    */
    public Info( message: string, subcomponent: string ): void {
        console.info(this.separator);
        console.info(`|::| Componente: ${ this.component } ${ subcomponent }`);
        console.info(`|::| Mensaje de info: ${ message }`);
        console.info(`|::| Fecha: ${ new Date() }`);
        console.info(this.separator + '\n');
    }

    /**
    * Genera un log de excepción.
    * @param {string} exception         Mensaje de la excepción generada por el manejador de errores.
    * @param {string} subcomponent      Nombre de la función o área específica desde donde se llama el método.
    * @param {string} errorMessage      Mensaje opcional de error.
    */
    public Error( exception: unknown, subcomponent: string, errorMessage?: string ): void {
        console.error(this.separator);
        console.error(`|::| Componente: ${ this.component } ${ subcomponent }`);
        console.error(`|::| Mensaje de error: ${ exception }`);
        console.error(`|::| Mensaje de Excepción: ${ errorMessage }`);
        console.error(`|::| Fecha: ${ new Date() }`);
        console.error(this.separator + '\n');
    }

    /**
    * Genera un log para debugear.
    * @param {string} message          Mensaje que se desea imprimir en el log.
    * @param {string} subcomponent     Nombre de la función o área específica desde donde se llama el método.
    */
    public Debug( message: string, subcomponent: string ): void {
        console.debug(this.separator);
        console.debug(`|::| Componente: ${ this.component } ${ subcomponent }`);
        console.debug(`|::| Mensaje de debug: ${ message }`);
        console.debug(`|::| Fecha: ${ new Date() }`);
        console.debug(this.separator + '\n');
    }
}

export default Log;