const formulario = document.getElementById("formularioEstudioMercado");
const campos = formulario.querySelectorAll("input, textarea");
const botonEnviar = formulario.querySelector(".enviar");
   
//Se comprueba si el Formulario esta enviado comprobando el LocalStorage
if(cargarLocalStorage("formularioEnviado")){
    mensajeAgradecimiento();
} else{
    // Mostrar el formulario y agregar la lógica para enviarlo
    formulario.style.display = "block";
        // Agregar evento de escucha al botón de enviar
        botonEnviar.addEventListener("click", function(event) {
            
            event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            let fechaForm = new Date();
            let situacionActualForm = document.querySelector('input[name="situacionLaboral"]:checked').value;
            let comentariosForm = document.getElementById('textarea').value;
            let usabilidadForm = document.querySelector('input[name="usabilidad"]:checked').value;
                
            // Realizar las acciones necesarias para enviar el formulario (puedes agregar el código para enviar los datos a Firebase aquí)
            // Obtener los valores del formulario
            setDatosFirebase(fechaForm,situacionActualForm,usabilidadForm,comentariosForm)
            // Guardar en localStorage que el formulario ha sido enviado
            guardarLocalStorage("formularioEnviado", true);
            mensajeAgradecimiento();
            
        });

    // Agregar un evento de escucha para los cambios en los campos del formulario
    formulario.addEventListener("input", verificarCampos);
}

function verificarCampos() {
    // Verificar si todos los campos están completos
    const camposCompletos = Array.from(campos).every(campo => campo.value.trim() !== "");

    // Habilitar o deshabilitar el botón de enviar según el estado de los campos
    if (camposCompletos) {
        botonEnviar.classList.remove("disabled");
        return true;
    } else {
        botonEnviar.classList.add("disabled");
        return false;
    }
}

function mensajeAgradecimiento() {
    // Ocultar el formulario y mostrar el mensaje de agradecimiento
    formulario.style.display = "none";
    const mensajeContainer = document.createElement("div");
    mensajeContainer.innerHTML = `
        <h2>Ya hemos recibido tu formulario</h2>
        <p>¡Muchas gracias por darnos tu opinión!</p>
        <a href="#" class="btnModal cerrar btnCerrarModal">Cerrar</a>
    `;
    formulario.parentNode.appendChild(mensajeContainer);
    const btnCerrarModal = document.querySelector(".btnCerrarModal");
    btnCerrarModal.addEventListener('click', (e)=>{
        e.preventDefault();
        modalTest.classList.remove('modal--show');
    });
}

function setDatosFirebase(fecha,situacionActual,usabilidad,comentarios) {
    
    // Configuración de GeneradorDom Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyC0SvehFakjZE0FvwqBejgPuvXHQdU9G4k",
        authDomain: "generadordom-cc9bd.firebaseapp.com",
        projectId: "generadordom-cc9bd",
        storageBucket: "generadordom-cc9bd.appspot.com",
        messagingSenderId: "989754279675",
        appId: "1:989754279675:web:648b80e2b4b0d7aedb125e"
    };

    // Inicializa Firebase
    firebase.initializeApp(firebaseConfig);
    // Obtener referencia a la colección en Firestore
    var db = firebase.firestore();
    var formularioEstudioMercado = db.collection('Users');
    

     // Crear el objeto con los valores
     var datosFormulario = {
        creado: fecha,
        situacionLaboral: situacionActual,
        isUsabilidad: usabilidad,
        Comentario: comentarios
    };

    // Guardar los valores en Firestore
    formularioEstudioMercado.add(datosFormulario)
        .then(function(docRef) {
            console.log('Valores almacenados correctamente:', docRef.id);
            // Aquí puedes realizar cualquier acción adicional que desees después de guardar los datos
        })
        .catch(function(error) {
            console.error('Error al almacenar los valores:', error);
        });

}