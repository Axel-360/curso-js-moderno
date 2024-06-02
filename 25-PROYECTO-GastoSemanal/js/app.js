// Variables y selectores
const formulario = document.querySelector("#agregar-gasto"); // Selecciona el formulario para agregar gastos
const formularioPresupuesto = document.querySelector("#actualizar-presupuesto"); // Selecciona el formulario para actualizar el presupuesto
const gastoListado = document.querySelector("#gastos ul"); // Selecciona la lista de gastos
const totalElement = document.querySelector("#total"); // Selecciona el elemento que muestra el presupuesto total
const restanteElement = document.querySelector("#restante"); // Selecciona el elemento que muestra el restante del presupuesto
const restanteDiv = document.querySelector(".restante"); // Selecciona el div que contiene el restante del presupuesto
const btnEditarPresupuesto = document.querySelector("#editar-presupuesto"); // Selecciona el botón para editar el presupuesto
const divActualizarPresupuesto = document.querySelector("#form-actualizar-presupuesto"); // Selecciona el formulario para actualizar el presupuesto (oculto por defecto)

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  // Espera a que el contenido de la página esté cargado
  const presupuestoCargado = Presupuesto.cargarDesdeStorage(); // Carga el presupuesto guardado en el almacenamiento local
  if (presupuestoCargado) {
    presupuesto = presupuestoCargado; // Si hay un presupuesto guardado, lo usa
    ui.insertarPresupuesto(presupuesto); // Inserta el presupuesto en la interfaz
    ui.actualizarUI(presupuesto); // Actualiza la interfaz con el presupuesto cargado
  } else {
    preguntarPresupuesto(); // Si no hay presupuesto guardado, pregunta al usuario
  }
});

formulario.addEventListener("submit", agregarGasto); // Escucha el evento de envío del formulario de agregar gastos
formularioPresupuesto.addEventListener("submit", actualizarPresupuesto); // Escucha el evento de envío del formulario de actualizar presupuesto
btnEditarPresupuesto.addEventListener("click", () => {
  divActualizarPresupuesto.style.display = "block"; // Muestra el formulario de actualizar presupuesto al hacer clic en el botón de editar presupuesto
});
gastoListado.addEventListener("click", (event) => {
  eliminarGasto(event); // Escucha el evento de clic para eliminar un gasto
  editarGasto(event); // Escucha el evento de clic para editar un gasto
});

// Clases
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto); // Convierte el presupuesto a número
    this.restante = this.presupuesto; // Inicialmente, el restante es igual al presupuesto
    this.gastos = []; // Inicializa la lista de gastos como vacía
  }

  // Método para agregar un nuevo gasto
  nuevoGasto(gasto) {
    this.gastos.push(gasto); // Añade el nuevo gasto a la lista de gastos
    this.calcularRestante(); // Calcula el restante del presupuesto
    this.sincronizarStorage(); // Guarda el presupuesto actualizado en el almacenamiento local
  }

  // Método para calcular el dinero restante
  calcularRestante() {
    const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0); // Suma todos los gastos
    this.restante = this.presupuesto - gastado; // Calcula el restante del presupuesto
  }

  // Método para eliminar un gasto por su id
  eliminarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id !== id); // Elimina el gasto con el id especificado
    this.calcularRestante(); // Calcula el restante del presupuesto
    this.sincronizarStorage(); // Guarda el presupuesto actualizado en el almacenamiento local
  }

  // Método para guardar el presupuesto en el almacenamiento local
  sincronizarStorage() {
    localStorage.setItem("presupuesto", JSON.stringify(this)); // Convierte el presupuesto a JSON y lo guarda
  }

  // Método estático para cargar el presupuesto desde el almacenamiento local
  static cargarDesdeStorage() {
    const datos = JSON.parse(localStorage.getItem("presupuesto")); // Obtiene y convierte el presupuesto desde JSON
    if (datos) {
      const presupuesto = new Presupuesto(datos.presupuesto); // Crea una nueva instancia de Presupuesto con los datos guardados
      presupuesto.gastos = datos.gastos; // Asigna la lista de gastos
      presupuesto.restante = datos.restante; // Asigna el restante
      return presupuesto; // Devuelve el presupuesto cargado
    }
    return null; // Si no hay datos, devuelve null
  }

  // Método para actualizar el presupuesto
  actualizarPresupuesto(nuevoPresupuesto) {
    const diferencia = Number(nuevoPresupuesto) - this.presupuesto; // Calcula la diferencia con el nuevo presupuesto
    this.presupuesto = Number(nuevoPresupuesto); // Asigna el nuevo presupuesto
    this.restante += diferencia; // Actualiza el restante con la diferencia
    this.sincronizarStorage(); // Guarda el presupuesto actualizado en el almacenamiento local
  }
}

class UI {
  // Método para insertar el presupuesto en la interfaz
  insertarPresupuesto({ presupuesto, restante }) {
    totalElement.textContent = presupuesto; // Muestra el presupuesto total
    restanteElement.textContent = restante; // Muestra el restante del presupuesto
  }

  // Método para mostrar una alerta en la interfaz
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.className = `text-center alert alert-${tipo === "error" ? "danger" : "success"}`; // Asigna clase según el tipo de alerta
    divMensaje.textContent = mensaje; // Asigna el mensaje de la alerta
    divMensaje.setAttribute("role", "alert");

    document.querySelector(".primario").insertBefore(divMensaje, formulario); // Inserta la alerta en la interfaz
    setTimeout(() => divMensaje.remove(), 3000); // Elimina la alerta después de 3 segundos
  }

  // Método para mostrar los gastos en la lista
  mostrarGastos(gastos) {
    gastoListado.innerHTML = gastos
      .map(
        ({ cantidad, nombreGasto, id }) => `
          <li class="list-group-item d-flex justify-content-between align-items-center" data-id="${id}">
            ${nombreGasto} <span class='badge badge-primary badge-pill'>${cantidad} €</span>
            <div>
              <button class="btn btn-info editar-gasto">Editar</button>
              <button class="btn btn-danger borrar-gasto">Borrar &times;</button>
            </div>
          </li>
        `
      )
      .join(""); // Genera el HTML para cada gasto y lo inserta en la lista
  }

  // Método para actualizar el dinero restante en la interfaz
  actualizarRestante(restante) {
    restanteElement.textContent = restante; // Muestra el restante del presupuesto
  }

  // Método para comprobar el estado del presupuesto
  comprobarPresupuesto({ presupuesto, restante }) {
    restanteDiv.className = "restante alert"; // Reinicia las clases del elemento restante

    if (presupuesto / 4 > restante) {
      restanteDiv.classList.add("alert-danger"); // Si el restante es menor al 25% del presupuesto
    } else if (presupuesto / 2 > restante) {
      restanteDiv.classList.add("alert-warning"); // Si el restante es menor al 50% del presupuesto
    } else {
      restanteDiv.classList.add("alert-success"); // Si el restante es mayor al 50% del presupuesto
    }

    this.toggleSubmitButton(restante <= 0); // Deshabilita el botón de submit si el presupuesto se ha agotado
  }

  // Método para habilitar o deshabilitar el botón de submit
  toggleSubmitButton(disabled) {
    formulario.querySelector('button[type="submit"]').disabled = disabled; // Habilita o deshabilita el botón
    if (disabled) {
      this.imprimirAlerta("El presupuesto se ha agotado", "error"); // Muestra una alerta si el presupuesto se ha agotado
    }
  }

  // Método para agrupar los gastos por nombre
  agruparGastos(gastos) {
    const gastosAgrupados = gastos.reduce((acc, gasto) => {
      if (acc[gasto.nombreGasto]) {
        acc[gasto.nombreGasto] += gasto.cantidad; // Suma la cantidad si el gasto ya existe
      } else {
        acc[gasto.nombreGasto] = gasto.cantidad; // Añade el gasto si no existe
      }
      return acc;
    }, {});
    return gastosAgrupados; // Devuelve los gastos agrupados
  }

  // Método para mostrar el gráfico de gastos
  mostrarGraficoGastos(gastos) {
    const ctx = document.getElementById("graficoGastos").getContext("2d");
    const gastosAgrupados = this.agruparGastos(gastos); // Agrupa los gastos
    const nombresGastos = Object.keys(gastosAgrupados); // Obtiene los nombres de los gastos
    const cantidadesGastos = Object.values(gastosAgrupados); // Obtiene las cantidades de los gastos

    if (this.chart) {
      this.chart.destroy(); // Destruye el gráfico anterior si existe
    }

    this.chart = new Chart(ctx, {
      type: "bar", // Tipo de gráfico
      data: {
        labels: nombresGastos, // Nombres de los gastos
        datasets: [
          {
            label: "Gastos", // Etiqueta del gráfico
            data: cantidadesGastos, // Cantidades de los gastos
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Color de fondo
            borderColor: "rgba(75, 192, 192, 1)", // Color del borde
            borderWidth: 1, // Ancho del borde
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Comienza desde cero
          },
        },
      },
    });
  }

  // Método para actualizar la interfaz de usuario
  actualizarUI(presupuesto) {
    this.mostrarGastos(presupuesto.gastos); // Muestra los gastos en la lista
    this.actualizarRestante(presupuesto.restante); // Actualiza el restante del presupuesto
    this.comprobarPresupuesto(presupuesto); // Comprueba el estado del presupuesto
    this.mostrarGraficoGastos(presupuesto.gastos); // Muestra el gráfico de gastos
  }
}

const ui = new UI(); // Crea una instancia de la clase UI
let presupuesto; // Declara la variable presupuesto

// Función para preguntar al usuario su presupuesto
function preguntarPresupuesto() {
  let presupuestoUsuario;
  do {
    presupuestoUsuario = prompt("¿Cuál es tu presupuesto?"); // Pregunta al usuario su presupuesto
  } while (!presupuestoUsuario || isNaN(presupuestoUsuario) || Number(presupuestoUsuario) <= 0); // Valida que sea un número positivo

  presupuesto = new Presupuesto(presupuestoUsuario); // Crea una instancia de Presupuesto con el valor ingresado
  ui.insertarPresupuesto(presupuesto); // Inserta el presupuesto en la interfaz
}

// Función para agregar un nuevo gasto
function agregarGasto(event) {
  event.preventDefault(); // Previene el envío del formulario

  const nombreGasto = document.querySelector("#gasto").value.trim(); // Obtiene el nombre del gasto
  const cantidad = Number(document.querySelector("#cantidad").value); // Obtiene la cantidad del gasto

  if (!nombreGasto || isNaN(cantidad) || cantidad <= 0) {
    ui.imprimirAlerta("Ambos campos son obligatorios y la cantidad debe ser válida", "error"); // Muestra una alerta si hay errores
    return;
  }

  if (cantidad > presupuesto.restante) {
    ui.imprimirAlerta("El gasto excede el presupuesto disponible", "error"); // Muestra una alerta si el gasto excede el presupuesto
    return;
  }

  const gasto = { nombreGasto, cantidad, id: Date.now() }; // Crea un objeto con los datos del gasto
  presupuesto.nuevoGasto(gasto); // Añade el nuevo gasto al presupuesto

  ui.imprimirAlerta("Gasto agregado correctamente", "success"); // Muestra una alerta de éxito
  ui.actualizarUI(presupuesto); // Actualiza la interfaz con el nuevo gasto

  // Limpia los campos del formulario
  formulario.reset();
}

// Función para eliminar un gasto
function eliminarGasto(event) {
  if (event.target.classList.contains("borrar-gasto")) {
    const id = Number(event.target.closest("li").dataset.id); // Obtiene el id del gasto a eliminar
    presupuesto.eliminarGasto(id); // Elimina el gasto del presupuesto
    ui.actualizarUI(presupuesto); // Actualiza la interfaz
  }
}

// Función para editar un gasto
function editarGasto(event) {
  if (event.target.classList.contains("editar-gasto")) {
    const id = Number(event.target.closest("li").dataset.id); // Obtiene el id del gasto a editar
    const gasto = presupuesto.gastos.find((gasto) => gasto.id === id); // Encuentra el gasto en la lista

    document.querySelector("#gasto").value = gasto.nombreGasto; // Rellena el campo de nombre del gasto
    document.querySelector("#cantidad").value = gasto.cantidad; // Rellena el campo de cantidad del gasto

    presupuesto.eliminarGasto(id); // Elimina el gasto original del presupuesto
    ui.actualizarUI(presupuesto); // Actualiza la interfaz
  }
}

// Función para actualizar el presupuesto
function actualizarPresupuesto(event) {
  event.preventDefault(); // Previene el envío del formulario

  const nuevoPresupuesto = document.querySelector("#nuevo-presupuesto").value.trim(); // Obtiene el nuevo presupuesto

  if (!nuevoPresupuesto || isNaN(nuevoPresupuesto) || Number(nuevoPresupuesto) <= 0) {
    ui.imprimirAlerta("La cantidad debe ser válida", "error"); // Muestra una alerta si hay errores
    return;
  }

  presupuesto.actualizarPresupuesto(nuevoPresupuesto); // Actualiza el presupuesto

  ui.imprimirAlerta("Presupuesto actualizado correctamente", "success"); // Muestra una alerta de éxito
  ui.actualizarUI(presupuesto); // Actualiza la interfaz con el nuevo presupuesto

  // Oculta el formulario de actualización y limpia el campo
  divActualizarPresupuesto.style.display = "none";
  formularioPresupuesto.reset();

  // Actualiza los elementos de la interfaz
  ui.insertarPresupuesto(presupuesto);
}
