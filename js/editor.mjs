import {EditorView, basicSetup} from "codemirror";
import {EditorState} from "@codemirror/state";
import {javascript} from "@codemirror/lang-javascript";
import {htmlLanguage} from '@codemirror/lang-html';

const VENTANAMODAL= document.getElementById("ventanaModal");
let select = document.getElementById("ejemplos");
const iconoCopy = document.getElementById("icono");
let textJs;
let contador = 0, elementoAnterior = "padre";

let editorJs = new EditorView({
  extensions: [basicSetup, javascript(), EditorView.editable.of(false)],
  parent: document.getElementById("editor-js")
})

let updateListenerExtension = EditorView.updateListener.of((update) => {
  if (update.docChanged) {
    textJs ="";
    //se almacena entrada de datos en String
    let StringHtml = editorHtml.contentDOM.innerText;

    let nodos = convertElementsToObj(SerializeHtml(StringHtml));

    editorJs.contentDOM.innerText = createJS(nodos);
    //se muestra el icono de copiar
    iconoCopy.style.display= "block";
  }
});

let editorHtml = new EditorView({
  extensions: [basicSetup, htmlLanguage, updateListenerExtension],
  parent: document.getElementById("editor-html")
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
    textJs += createElement(objChild)
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


function createElement(objeto) {
  //creo elemento
  textJs =`const C${objeto.nameElement} = document.createElement('${objeto.nameElement.toLowerCase()}');\n`
  //añadimos propiedades
  for (const propiedad in objeto) {
    
    if(propiedad ==="class"){
      textJs += `C${objeto.nameElement}.classList.add('${objeto.class}');\n`;
    }else if(propiedad ==="textElement"){
      if(objeto.textElement!=""){
        textJs += `C${objeto.nameElement}.textContent('${objeto.textElement}');\n`;
      }
    }else if(propiedad ==="visibility"){
      textJs += `C${objeto.nameElement}.style.visibility = "visible";\n`;
    }else if(propiedad==="children"){
      if(objeto[propiedad].length > 0){
        objeto[propiedad].forEach(objChild => {
          textJs += createElement(objChild);
        });
      }
    }else if(propiedad==="nameElement"){
      continue;
    }else{
      textJs += `C${objeto.nameElement}.setAttribute (\"${propiedad}\",\"${objeto[propiedad]}\");\n`;
    }
  }
  //creamos el arbol
  textJs += `${elementoAnterior}.appendChild(C${objeto.nameElement})\n`
  return textJs
}