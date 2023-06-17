# 📜Indice 

* [Estructura](#estructura-del-directorio)
* [General](#general)
* [Fichero a Fichero](#fichero-a-fichero)
  * [boton.js](#botonjs)
  * [editor.mjs](#editormjs)
  * [formulario.js](#formulariojs)
  * [localStorage.js](#localstoragejs)
  * [modal.js](#modaljs)
  * [temas.js](#temasjs)


## 📑Estructura del directorio
```
├── js/
│  ├──boton.js
│  ├──editor.mjs
│  ├──formulario.js
│  ├──localStorage.js
│  ├──modal.js
│  ├──temas.js
```

## 📂General

Casi todos los ficheros siguen la misma estructura
1. Variables
2. Eventos y ejecución de código
3. Funciones


## 📋Fichero a Fichero

### boton.js
Lógica de los botones de acción (Copiar y borrar)


### editor.mjs

Este fichero tiene todo lo relacionado con los editores de código que se implementa con CodeMirror.

Para ejecutar el código y que rollup compile el codigo usar: 
```bash
npm run codeMirror
```
Los archivos importantes para que esto funcione son los ficheros ```package.json``` y ```rollup.config.mjs```


### formulario.js
Fichero generado para trabajar con Base de datos, el fin es almacenar en una base de datos el formulario.


### localStorage.js
Fichero para gestionar el LocalStorage.


### modal.js
Logica de los botones de ventanas modales.


### temas.js
Lógica del icono de los temas Claro/Oscuro 
