// Evento Submit a un formulario
const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(event) {
  event.preventDefault();
  console.log("Consultar una api");
  console.log(event.target.action);
}
