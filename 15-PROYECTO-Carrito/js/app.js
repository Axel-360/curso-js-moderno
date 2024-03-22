// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Reseteamos el array
    limpiartHTML(); // Eliminamos todo el HTML
  });
}

// Funciones
function agregarCurso(event) {
  event.preventDefault();
  if (event.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = event.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(event) {
  console.log(event.target.classList);
  if (event.target.classList.contains("borrar-curso")) {
    const cursoId = event.target.getAttribute("data-id");

    // Eliminar del array de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
  }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCursos(curso) {
  // console.log(curso);

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // si existe actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      } else {
        return curso; // Retorna los objetos que no son los duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // si no existe agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso]; // Agrega elementos al array de carrito
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiartHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td><img src= '${imagen}' width='100'></td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td>
      <a href='#' class='borrar-curso' data-id='${id}'> X </a>
    </td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del tbody
function limpiartHTML() {
  // Forma lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
