// Eventos sobre los Inputs
const busqueda = document.querySelector(".busqueda");

busqueda.addEventListener("input", (event) => {
  console.log(event.target.value);
});
