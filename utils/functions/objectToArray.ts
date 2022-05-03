/**
* Convierte un objeto o cadena en un array
* @param {object | object[]} element    Objeto, string o array de objetos que serán convertidos a un array.
* @return {object[]}                    Array de objetos
*/
const objectToArray = <T>( element: object | object[] | string | T[] | T ): typeof element[]  => {
    if ( Array.isArray( element ) ) return element;
    return [element];
}

export default objectToArray;