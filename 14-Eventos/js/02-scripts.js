// Eventos con el Mouse
const nav = document.querySelector(".navegacion");

// Registrar un evento
nav.addEventListener("mouseenter", () => {
  console.log("Entrando en la navegacion");
  nav.style.backgroundColor = "White";
});
nav.addEventListener("mouseout", () => {
  console.log("Saliendo de la navegacion");
  nav.style.backgroundColor = "transparent";
});

// mousedown - similar al click
// click
// dblclick = doble click
// mouseup - cuando sueltas el mouse
