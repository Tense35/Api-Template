/**
* Permite convertir un string en un booleano. Por defecto, retonará true
* @param {string} value    Cadena que se evaluará para retornar un booleano
* @return {boolean}        Valor booleano en el que se convirtió la cadena suministrada
*/
const stringToBoolean = ( value: string ): boolean => {
    switch( value.toLowerCase().trim() ) {
        case "false": 
        case "no": 
        case "0": 
        case "": 
        case null: 
        case undefined: 
        return false; 

        default: return true;
    }
}

export default stringToBoolean;