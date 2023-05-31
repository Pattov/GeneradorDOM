const icono = document.getElementById("icono");
const iconoElemento = icono.querySelector("i");
const panelJavascript = document.getElementById("editor-js");
function Icono() {
  if (iconoElemento.classList.contains("bx-copy")) {
    iconoElemento.classList.remove("bx-copy");
    iconoElemento.classList.add("bx-check");
    
    console.log()
    setTimeout(() => {
      iconoElemento.classList.remove("bx-check");
      iconoElemento.classList.add("bx-copy");
    }, 1500);
  }

  const content = panelJavascript.getElementsByClassName('cm-content')[0].innerText;
  
  // Crear un elemento de entrada de texto oculto
  const textArea = document.createElement('textarea');
  textArea.value = content;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';

  // Agregar el elemento de entrada de texto al DOM
  document.body.appendChild(textArea);

  // Se Selecciona y copia el contenido del elemento de entrada de texto
  textArea.select();
  document.execCommand('copy');

  // Se Elimina el elemento de entrada de texto del DOM
  document.body.removeChild(textArea);
}
