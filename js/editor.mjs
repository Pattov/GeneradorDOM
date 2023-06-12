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
    console.log(element.childElementCount)
    let obj = createObj(element);
    //mirar hijos
    if(element.hasChildNodes() && element.childElementCount!=0){
      obj.children = [];
      const children = element.childNodes;
      console.log(children);
      for (const child of children) {
        if(child.nodeName!=="#text"){
          console.log(child.childElementCount)
          let objChild = createObj(child);
          obj.children.push(objChild);
        }
      }
    }
    nuevosElementos.push(obj)
  }
  return nuevosElementos
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
  console.log(element)
    const elementNode = Object.create(null);
    elementNode.nameElement = element.nodeName;
    elementNode.textElement = element.firstChild.textContent !== null ? element.firstChild.textContent.trim() : " ";
  
    for (const attr of element.attributes) {
      elementNode[attr.nodeName] = attr.nodeValue;
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
    if(propiedad ==="class"){
      textJs += `${nombreVariable}.classList.add('${objeto.class}');\n`;
    }else if(propiedad ==="textElement"){
      if(objeto.textElement!=""){
        textJs += `${nombreVariable}.textContent('${objeto.textElement}');\n`;
      }
    }else if(propiedad ==="visibility"){
      textJs += `${nombreVariable}.style.visibility = "visible";\n`;
    }else if(propiedad==="children"){
      if(objeto[propiedad].length > 0){
        objeto[propiedad].forEach(objChild => {
          textJs += createElement(objChild, nombreVariable);
        });
      }
    }else if(propiedad==="nameElement"){
      continue;
    }else{
      textJs += `${nombreVariable}.setAttribute (\"${propiedad}\",\"${objeto[propiedad]}\");\n`;
    }
  }
  //creamos el arbol
  textJs += `${padreActual}.appendChild(${nombreVariable})\n`
  return textJs
}
