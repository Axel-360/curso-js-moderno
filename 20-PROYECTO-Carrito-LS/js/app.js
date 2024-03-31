// Variables
const carrito = document.querySelector("#carrito"); // Selecciona el contenedor del carrito
const contenedorCarrito = document.querySelector("#lista-carrito tbody"); // Selecciona el cuerpo de la tabla del carrito
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito"); // Selecciona el botón para vaciar el carrito
const listaCursos = document.querySelector("#lista-cursos"); // Selecciona la lista de cursos
let articulosCarrito = []; // Arreglo para almacenar los cursos en el carrito

// Event Listeners
cargarEventListeners();

function cargarEventListeners() {
  // Evento para agregar curso al hacer clic en la lista de cursos
  listaCursos.addEventListener("click", agregarCurso);

  // Evento para eliminar curso del carrito al hacer clic en el carrito
  carrito.addEventListener("click", eliminarCurso);

  // Evento al cargar la página para cargar el carrito desde el localStorage
  document.addEventListener("DOMContentLoaded", cargarCarritoDesdeLocalStorage);

  // Evento para vaciar el carrito al hacer clic en el botón "Vaciar Carrito"
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

// Función para agregar un curso al carrito
function agregarCurso(event) {
  event.preventDefault(); // Evita el comportamiento por defecto del formulario
  if (event.target.classList.contains("agregar-carrito")) {
    // Verifica si se hizo clic en el botón "Agregar al Carrito"
    const cursoSeleccionado = event.target.parentElement.parentElement; // Obtiene el curso seleccionado
    leerDatosCurso(cursoSeleccionado); // Lee los datos del curso y los agrega al carrito
  }
}

// Función para eliminar un curso del carrito
function eliminarCurso(event) {
  if (event.target.classList.contains("borrar-curso")) {
    // Verifica si se hizo clic en el botón "Eliminar" del curso en el carrito
    const cursoId = event.target.getAttribute("data-id"); // Obtiene el ID del curso seleccionado
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId); // Filtra los cursos para eliminar el curso seleccionado
    carritoHTML(); // Renderiza nuevamente el carrito de compras en el HTML
  }
}

// Función para leer los datos de un curso y agregarlo al carrito
function leerDatosCurso(curso) {
  const cursoInfo = {
    imagen: curso.querySelector("img").src, // Obtiene la URL de la imagen del curso
    titulo: curso.querySelector("h4").textContent, // Obtiene el título del curso
    precio: curso.querySelector(".precio span").textContent, // Obtiene el precio del curso
    id: curso.querySelector("a").getAttribute("data-id"), // Obtiene el ID del curso
    cantidad: 1, // Establece la cantidad del curso en 1
  };

  const cursoExistente = articulosCarrito.find((curso) => curso.id === cursoInfo.id); // Verifica si el curso ya está en el carrito
  if (cursoExistente) {
    cursoExistente.cantidad++; // Incrementa la cantidad del curso si ya está en el carrito
  } else {
    articulosCarrito.push(cursoInfo); // Agrega el curso al carrito si no está presente
  }

  carritoHTML(); // Renderiza nuevamente el carrito de compras en el HTML
}

// Función para mostrar el carrito de compras en el HTML
function carritoHTML() {
  limpiarCarrito(); // Limpia el contenido actual del carrito en el HTML
  articulosCarrito.forEach(renderizarCurso); // Renderiza cada curso en el carrito
  sincronizarStorage(); // Sincroniza el contenido del carrito con el localStorage
}

// Función para renderizar un curso en el carrito
function renderizarCurso(curso) {
  const { imagen, titulo, precio, cantidad, id } = curso; // Obtiene los datos del curso
  const row = document.createElement("tr"); // Crea una nueva fila para el curso
  row.innerHTML = `
    <td><img src="${imagen}" width="100"></td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${id}">X</a></td>
  `; // Agrega los datos del curso a la fila
  contenedorCarrito.appendChild(row); // Agrega la fila al cuerpo de la tabla del carrito
}

// Función para vaciar el carrito
function vaciarCarrito() {
  articulosCarrito = []; // Vacía el arreglo de cursos en el carrito
  limpiarCarrito(); // Limpia el contenido del carrito en el HTML
}

// Función para cargar los cursos del localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || []; // Obtiene los cursos del localStorage
  carritoHTML(); // Renderiza nuevamente el carrito de compras en el HTML
}

// Función para sincronizar el carrito con el localStorage
function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito)); // Guarda los cursos en el localStorage
}

// Función para limpiar el carrito en el HTML
function limpiarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild); // Elimina todos los elementos hijos del contenedor del carrito
  }
}
