import {EditorView, basicSetup} from "codemirror";
import {EditorState} from "@codemirror/state";
import {javascript} from "@codemirror/lang-javascript";
import {htmlLanguage} from '@codemirror/lang-html';
import { xcodeDark } from '@uiw/codemirror-theme-xcode';

const VENTANAMODAL= document.getElementById("ventanaModal");
let select = document.getElementById("ejemplos");
const iconoCopy = document.getElementById("icono");
const iconoBorrar = document.getElementById('iconoBorrar');
let textJs;
let contador = 0, contadorElementosIguales = 1;
let elementos = [];

let editorJs = new EditorView({
  extensions: [basicSetup, javascript(), xcodeDark, EditorView.editable.of(false)],
  parent: document.getElementById("editor-js")
})

let updateListenerExtension = EditorView.updateListener.of((update) => {
  if (update.docChanged) {
    textJs ="";
    //se almacena entrada de datos en String
    let StringHtml = editorHtml.contentDOM.innerText;

    let nodos = convertElementsToObj(SerializeHtml(StringHtml));

    editorJs.contentDOM.innerText = createJS(nodos);
    //se muestra los botones
    if(iconoCopy.style.display != "block"){
      iconoCopy.style.display= "block";
    }
    if(iconoBorrar.style.display !="inline-block"){
      iconoBorrar.style.display= "inline-block";
    }
    //EL array se inicia en 0 elementos y el contador de elementos repetidos se pone a 1;
    contadorElementosIguales = 1;
    elementos.splice(0,elementos.length);
  }
});

let editorHtml = new EditorView({
  extensions: [basicSetup, htmlLanguage, xcodeDark, updateListenerExtension],
  parent: document.getElementById("editor-html"),
  
})


select.addEventListener("change", function() {
  var selectedOption = select.value; // Obtener el valor de la opción seleccionada
  // Actualizar el contenido del editor con el texto correspondiente a la opción seleccionada
  if (selectedOption === "sencillo") {
    editorHtml.contentDOM.innerText = "<p class=\"Holaooooo\">hola</p>\n<p>hola</p>";
  } else if (selectedOption === "select") {
    editorHtml.contentDOM.innerText = "<select class=\"form-select form-select-lg mb-3\" aria-label=\".form-select-lg example\">\n\t<option selected>Open this select menu</option>\n\t<option value=\"1\">One</option>\n\t<option value=\"2\">Two</option>\n\t<option value=\"3\">Three</option>\n</select>";
  } else if (selectedOption === "tabla") {
    editorHtml.contentDOM.innerText = "<table class=\"table\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th scope=\"col\">#</th>\n\t\t\t<th scope=\"col\">First</th>\n\t\t\t<th scope=\"col\">Last</th>\n\t\t\t<th scope=\"col\">Handle</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr>\n\t\t\t<th scope=\"row\">1</th>\n\t\t\t<td>Mark</td>\n\t\t\t<td>Otto</td>\n\t\t\t<td>@mdo</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th scope=\"row\">2</th>\n\t\t\t<td>Jacob</td>\n\t\t\t<td>Thornton</td>\n\t\t\t<td>@fat</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<th scope=\"row\">3</th>\n\t\t\t<td colspan=\"2\">Larry the Bird</td>\n\t\t\t<td>@twitter</td>\n\t\t</tr>\n\t</tbody>\n</table>\n";
  } 
});


function convertElementsToObj(elements) {
  let nuevosElementos = [];

  for (const element of elements.children) {
    let obj = createObj(element);

    if (element.hasChildNodes() && element.childElementCount != 0) {
      obj.children = convertElementsToObj(element);
    }

    nuevosElementos.push(obj);
  }

  return nuevosElementos;
}



// //cada Elemento constara de 
// let elemento = [
//   {
//     "ElementNode": "h1",
//     "TextElement": "hola",
//     "hijos":{
//       "ElementNode": "h2",
//       "TextElement": "hola",
//       "hijos":{
      
//       }
//     }
//   },
//   {
//     "ElementNode": "h3",
//     "TextElement": "hola",
//   }
// ]
function createObj(element) {
  const elementNode = Object.create(null);
  elementNode.nameElement = element.nodeName;
  let nodeText = element.textContent.replace(/[\n\t]+/g, "").trim();
  // let nodeText = element.textContent.trim();
  let hijosText = '';
  //Obtener el String de los hijos
  if (element.childElementCount > 0) {
    for (const child of element.children) {
      hijosText += child.textContent.replace(/[\n\t]+/g, "").trim();
    }
  }
  hijosText = hijosText.replace(/[\n\t]+/g, "").trim();
  if(nodeText === hijosText||nodeText===''){
    elementNode.textElement = '';
  }else{
    elementNode.textElement = nodeText;
  }
  // Obtener atributos
  if (element.attributes.length > 0) {
    elementNode.attributes = {};
    for (const attr of element.attributes) {
      elementNode.attributes[attr.nodeName] = attr.nodeValue;
    }
  }

  // Obtener hijos
  if (element.childElementCount > 0) {
    elementNode.children = [];
    for (const child of element.children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        elementNode.children.push(createObj(child));
      }
    }
  }
  
  return elementNode;
}





function createJS(objectElements) {
  console.log(objectElements)
  objectElements.forEach(objChild => {
    textJs += createElement(objChild);  
  });
  return textJs;
}
/**
 * Esta funcion pasa un String a HTML
 * @param {} text Pasas un String
 * @returns devuelve un HTML FragmentDOM
 */
function SerializeHtml(text) {
  const range = document.createRange();
  const fragment = range.createContextualFragment(text);
  return fragment;
}


function createElement(objeto, padreActual = 'padre') {
  let nombreVariable =  `C${objeto.nameElement}`;
  // Si no es la primera vez del array
  if(elementos.length != 0){
    // Se comprueba que el nombre nuevo no coincida con otro almacenado
    if(elementos.includes(nombreVariable)){
      nombreVariable = `C${objeto.nameElement}${contadorElementosIguales}`;
      contadorElementosIguales++;
    }
  }
  elementos.push(nombreVariable);

  
  // Crear elemento
  textJs =`const ${nombreVariable} = document.createElement('${objeto.nameElement.toLowerCase()}');\n`
  
  // Añadir propiedades
  for (const propiedad in objeto) {
    if(propiedad==="attributes"){
      for (const atributo in objeto[propiedad]) {
        const valorAtributo = objeto[propiedad][atributo];
        if (atributo === "class") {
          textJs += `\t${nombreVariable}.classList.add('${valorAtributo}');\n`;
        } else if (atributo === "visibility") {
          textJs += `\t${nombreVariable}.style.visibility = "visible";\n`;
        } else {
          textJs += `\t${nombreVariable}.setAttribute("${atributo}", "${valorAtributo}");\n`;
        }
      }
    }else if(propiedad==="nameElement"){
      continue;
    }else if(propiedad ==="textElement"){
      if(objeto.textElement!=""){
        textJs += `\t${nombreVariable}.textContent('${objeto.textElement}');\n`;
      }
    }else if(propiedad==="children"){
      if(objeto[propiedad].length > 0){
        objeto[propiedad].forEach(objChild => {
          textJs += createElement(objChild, nombreVariable);
        });
      }
    }
  }
  
  // Crear el árbol
  textJs += `${padreActual}.appendChild(${nombreVariable});\n`
  
  return textJs
}
