let toggle = document.getElementById("theme");
let label = document.getElementById("label");

if(cargarLocalStorage("tema") == "oscuro"){
  document.body.classList.toggle("oscuro");
}

toggle.addEventListener("change", () => {
  let estado = cargarLocalStorage("tema");
  document.body.classList.toggle("oscuro");
  if (estado == "claro" || estado == null) {
    label.innerHTML = "<i class='bx bxs-sun'></i>";
    guardarLocalStorage("tema", "oscuro")
  } else if(estado == "oscuro" ){
    label.innerHTML = "<i class='bx bxs-moon'></i>";
    guardarLocalStorage("tema", "claro")
  }
});
