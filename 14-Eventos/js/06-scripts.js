// Qué es el Event Bubbling

const cardDiv = document.querySelector(".card");
const infoDiv = document.querySelector(".info");
const titulo = document.querySelector(".titulo");

cardDiv.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("click en card");
});

infoDiv.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log("click en info");
});

titulo.addEventListener("click", (event) => {
  event.stopPropagation();

  console.log("click en titulo");
});
