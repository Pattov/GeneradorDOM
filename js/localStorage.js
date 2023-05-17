const LOCALSTORAGE=window.localStorage;
let language;

/**
 * Funcion que sirve para Guardar el LocalStorage
 *
 * @param {*} key string como se guarda la variable 
 * @return {*} el LocalStorage
 */
function cargarLocalStorage (key) {
    return LOCALSTORAGE.getItem(key);
}
/**
 * Funcion que sirve para Guardar el LocalStorage
 * @param {*} key string como se guarda la variable 
 * @param {*} valor valor de la variable
 */
function guardarLocalStorage (key, valor) {
    LOCALSTORAGE.setItem(key, valor);
}  

 /**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    //Borrar LocalStorage
    LOCALSTORAGE.removeItem('language');
}

