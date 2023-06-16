

# Generador Dom

[Generador de Dom](https://generadordom.netlify.app/) es una Aplicación Web, desarrollada con la finalidad de ser un Proyecto de Fin de Ciclo Superior Desarrollo de Aplicaciones Web en el C.I.P.F. Camino de la Miranda(Palencia) por la Alumna Patricia Tovar Quintano.

El objetivo de la aplicación es que un usuario introduzca código HTML y se mostrará el mismo código en JavaScript.

## 📜Indice

* [Estructura](#estructura)
* [Implementación Local](#implementación-local)
  * [Linux](#linux)
  * [Windows](#windows)
  * [Estructura Dist](#estructura-dist)

## 📂Estructura
```
generadorDom/
├── img/
│  ├──logoVerde.png
├── js/
│  ├──boton.js
│  ├──editor.mjs
│  ├──formulario.js
│  ├──localStorage.js
│  ├──modal.js
│  ├──temas.js
├── otros/
│  ├──Patricia_TovarQuintano_DAW2.pdf
│  ├──viewDatabase.html
├── styles/
│  ├──general.scss
│  ├──temaOscuro.scss
├── .gitignore.swp
├── .README.md
├── .index.html
├── .package.json
├── .rollup.config.mjs
```

## 💾Implementación Local

Clonar el repositorio en Local con un terminal 
```bash 
git clone https://github.com/Pattov/generadorDom.git 
```

### Linux
Ejecutar en terminal
```bash 
npm run publicarLinux
```

### Windows
Ejecutar en terminal
```bash 
npm run publicar
```

### Estructura Dist
Al ejecutar el comando correspondiente al S.O. se creara una carpeta lista para desplegar y que un navegador es capaz de interpretar
```
generadorDom/
├── dist/
│  └── img/
│     ├──logoVerde.png
│  └── js/
│     ├──boton.js
│     ├──editor.bundle.js
│     ├──formulario.js
│     ├──localStorage.js
│     ├──modal.js
│     ├──temas.js
│  └── styles/
│     ├──general.css
│     ├──general.css.map
│     ├──temaOscuro.css
│     ├──temaOscuro.css.map
│  ├── .index.html
```
