// Variables
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

// Contenedor para los resultados
const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la búsqueda
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); // muestra los coches al cargar

  // Llena las opciones de años
  llenarSelect();
});

//  Event listener para los select de búsqueda
marca.addEventListener("change", (event) => {
  datosBusqueda.marca = event.target.value;
  filtrarAuto();
});
year.addEventListener("change", (event) => {
  datosBusqueda.year = parseInt(event.target.value);
  filtrarAuto();
});
minimo.addEventListener("change", (event) => {
  datosBusqueda.minimo = event.target.value;
  filtrarAuto();
});
maximo.addEventListener("change", (event) => {
  datosBusqueda.maximo = event.target.value;
  filtrarAuto();
});
puertas.addEventListener("change", (event) => {
  datosBusqueda.puertas = parseInt(event.target.value);
  filtrarAuto();
});
transmision.addEventListener("change", (event) => {
  datosBusqueda.transmision = event.target.value;
  filtrarAuto();
});
color.addEventListener("change", (event) => {
  datosBusqueda.color = event.target.value;
  filtrarAuto();
});

// Funciones
function mostrarAutos(autos) {
  limpiarHTML(); // Elimina el HTML previo
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHTML = document.createElement("p");

    autoHTML.textContent = `
    ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}`;

    // Insertar en el html
    resultado.appendChild(autoHTML);
  });
}

// Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Genera los años del select
function llenarSelect() {
  for (let index = max; index > min; index--) {
    const opcion = document.createElement("option");
    opcion.value = index;
    opcion.textContent = index;
    year.appendChild(opcion); // Agrega las opciones de año al select
  }
}

// Función que filtra en base a la búsqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarcolor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}

function noResultado() {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No hay resultados, intenta con otra búsqueda";
  resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;

  if (year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;

  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;

  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;

  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;

  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarcolor(auto) {
  const { color } = datosBusqueda;

  if (color) {
    return auto.color === color;
  }
  return auto;
}
