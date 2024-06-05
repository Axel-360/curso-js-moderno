// Clases y Funciones
class Notificacion {
  constructor({ texto, tipo, duracion = 5000 }) {
    this.texto = texto;
    this.tipo = tipo;
    this.duracion = duracion;
    this.mostrar();
  }

  mostrar() {
    const alerta = document.createElement("DIV");
    alerta.classList.add(
      "text-center",
      "w-full",
      "p-3",
      "text-white",
      "my-5",
      "alert",
      "uppercase",
      "font-bold",
      "text-sm",
      "rounded-lg",
      "shadow-md",
      "transition-transform",
      "transform",
      "scale-95"
    );

    const alertaPrevia = document.querySelector(".alert");
    if (alertaPrevia) alertaPrevia.remove();

    this.tipo === "error" ? alerta.classList.add("bg-red-500") : alerta.classList.add("bg-green-500");
    alerta.textContent = this.texto;
    formulario.parentElement.insertBefore(alerta, formulario);

    setTimeout(() => {
      alerta.classList.add("scale-100");
    }, 100);

    setTimeout(() => {
      alerta.remove();
    }, this.duracion);
  }
}

class AdminCitas {
  constructor() {
    this.citas = [];
  }

  async agregar(cita) {
    this.citas.push(cita);
    await this.guardarLocalStorage();
    this.mostrar();
  }

  async editar(citaActualizada) {
    this.citas = this.citas.map((cita) => (cita.id === citaActualizada.id ? citaActualizada : cita));
    await this.guardarLocalStorage();
    this.mostrar();
  }

  async eliminar(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    await this.guardarLocalStorage();
    this.mostrar();
  }

  async ordenarPorFecha(ascendente) {
    this.citas.sort((a, b) =>
      ascendente ? new Date(a.fecha) - new Date(b.fecha) : new Date(b.fecha) - new Date(a.fecha)
    );
    this.mostrar();
  }

  async mostrar(citas = this.citas) {
    // Limpiar el HTML
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }

    // Comprobar si hay citas
    if (citas.length === 0) {
      contenedorCitas.innerHTML = ' <p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>';
      return;
    }

    const fragment = document.createDocumentFragment();

    // Generando las citas
    citas.forEach((cita) => {
      const divCita = document.createElement("div");
      divCita.classList.add("mx-5", "my-10", "bg-white", "shadow-md", "px-5", "py-10", "rounded-xl", "p-3");

      divCita.innerHTML = `
                <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">Paciente: </span>${
                  cita.paciente
                }</p>
                <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">Propietario: </span>${
                  cita.propietario
                }</p>
                <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">E-mail: </span>${
                  cita.email
                }</p>
                <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">Fecha: </span>${formatearFecha(
                  cita.fecha
                )}</p>
                <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">Síntomas: </span>${
                  cita.sintomas
                }</p>
            `;

      const btnEditar = document.createElement("button");
      btnEditar.classList.add(
        "py-2",
        "px-10",
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "flex",
        "items-center",
        "gap-2",
        "btn-editar"
      );
      btnEditar.innerHTML = `Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;
      btnEditar.onclick = () => cargarEdicion(cita);

      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "py-2",
        "px-10",
        "bg-red-600",
        "hover:bg-red-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "flex",
        "items-center",
        "gap-2",
        "eliminar"
      );
      btnEliminar.innerHTML = `Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path class="rotate-on-hover" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path></svg>`;
      btnEliminar.onclick = () => mostrarModalConfirmacion(cita.id);

      const contenedorBotones = document.createElement("DIV");
      contenedorBotones.classList.add("flex", "justify-between", "mt-10");

      contenedorBotones.appendChild(btnEditar);
      contenedorBotones.appendChild(btnEliminar);

      divCita.appendChild(contenedorBotones);
      fragment.appendChild(divCita);
    });

    contenedorCitas.appendChild(fragment);
    // Actualizar el calendario
    await actualizarCalendario();
  }

  async guardarLocalStorage() {
    return new Promise((resolve) => {
      localStorage.setItem("citas", JSON.stringify(this.citas));
      resolve();
    });
  }

  async cargarLocalStorage() {
    return new Promise((resolve) => {
      this.citas = JSON.parse(localStorage.getItem("citas")) || [];
      resolve();
    });
  }
}

// Selectores
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");
const buscarInput = document.querySelector("#buscar");
const filtroPropietarioInput = document.querySelector("#filtro-propietario");
const ordenarBtn = document.querySelector("#ordenar");
const exportarCsvBtn = document.querySelector("#exportar-csv");
const exportarPdfBtn = document.querySelector("#exportar-pdf");
const importarInput = document.querySelector("#importar");
const confirmarImportacionBtn = document.querySelector("#confirmar-importacion");
const formulario = document.querySelector("#formulario-cita");
const formularioInput = document.querySelector('#formulario-cita input[type="submit"]');
const contenedorCitas = document.querySelector("#citas");
const calendarioEl = document.querySelector("#calendar");

// Estado para el orden de las citas
let ordenAscendente = true;
let citasImportadas = [];

// Crear instancia de AdminCitas
const citas = new AdminCitas();

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  citas.cargarLocalStorage();
  citas.mostrar();
  inicializarCalendario();
  // Validaciones en tiempo real
  validarCampoEnTiempoReal(pacienteInput, "El nombre del paciente es obligatorio");
  validarCampoEnTiempoReal(propietarioInput, "El nombre del propietario es obligatorio");
  validarCampoEnTiempoReal(emailInput, "El email no es válido. Por favor, ingresa un email válido");
  validarCampoEnTiempoReal(fechaInput, "La fecha es obligatoria y debe ser una fecha válida en el futuro.");
  validarCampoEnTiempoReal(
    sintomasInput,
    "Los síntomas son obligatorios. Por favor, describe los síntomas del paciente."
  );
});

pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);
buscarInput.addEventListener("input", buscarYFiltrarCita);
filtroPropietarioInput.addEventListener("input", buscarYFiltrarCita);
ordenarBtn.addEventListener("click", ordenarCitasPorFecha);
exportarCsvBtn.addEventListener("click", () => exportarCitas("csv"));
exportarPdfBtn.addEventListener("click", () => exportarCitas("pdf"));
importarInput.addEventListener("change", importarCitas);
confirmarImportacionBtn.addEventListener("click", confirmarImportacion);
formulario.addEventListener("submit", submitCita);

let editando = false;

// Objeto de cita
const citaObj = {
  id: generarId(),
  paciente: "",
  propietario: "",
  email: "",
  fecha: "",
  sintomas: "",
};

// Funciones de validación en tiempo real
function validarCampoEnTiempoReal(input, mensajeError) {
  input.addEventListener("input", () => {
    if (!input.value.trim()) {
      mostrarError(input, mensajeError);
    } else {
      eliminarError(input);
    }
  });
}

function mostrarError(input, mensaje) {
  const error = document.createElement("p");
  error.textContent = mensaje;
  error.classList.add("error", "text-red-500", "mt-2");
  input.parentElement.appendChild(error);
}

function eliminarError(input) {
  const error = input.parentElement.querySelector(".error");
  if (error) {
    error.remove();
  }
}

// Funciones de búsqueda y filtrado
function buscarYFiltrarCita() {
  const terminoPaciente = buscarInput.value.toLowerCase();
  const terminoPropietario = filtroPropietarioInput.value.toLowerCase();
  const citasFiltradas = citas.citas.filter(
    (cita) =>
      cita.paciente.toLowerCase().includes(terminoPaciente) &&
      cita.propietario.toLowerCase().includes(terminoPropietario)
  );
  citas.mostrar(citasFiltradas);
}

// Otras funciones necesarias
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

function submitCita(e) {
  e.preventDefault();
  const { paciente, propietario, email, fecha, sintomas } = citaObj;

  if (!validarCampo(paciente, "El nombre del paciente es obligatorio", pacienteInput)) return;
  if (!validarCampo(propietario, "El nombre del propietario es obligatorio", propietarioInput)) return;
  if (!validarEmail(email)) {
    new Notificacion({ texto: "El email no es válido. Por favor, ingresa un email válido.", tipo: "error" });
    emailInput.focus();
    return;
  }
  if (!validarFechaCampo(fecha, "La fecha es obligatoria y debe ser una fecha válida en el futuro.", fechaInput))
    return;
  if (
    !validarCampo(
      sintomas,
      "Los síntomas son obligatorios. Por favor, describe los síntomas del paciente.",
      sintomasInput
    )
  )
    return;

  if (editando) {
    citas.editar({ ...citaObj });
    new Notificacion({ texto: "Guardado correctamente", tipo: "success" });
  } else {
    citas.agregar({ ...citaObj });
    new Notificacion({ texto: "Paciente registrado correctamente", tipo: "success" });
  }

  formulario.reset();
  reiniciarObjetoCita();
  formularioInput.value = "Registrar Paciente";
  editando = false;
}

function validarCampo(campo, mensaje, input) {
  if (!campo.trim()) {
    new Notificacion({ texto: mensaje, tipo: "error" });
    input.focus();
    return false;
  }
  return true;
}

function validarFechaCampo(fecha, mensaje, input) {
  if (!fecha.trim() || !validarFecha(fecha)) {
    new Notificacion({ texto: mensaje, tipo: "error" });
    input.focus();
    return false;
  }
  return true;
}

function reiniciarObjetoCita() {
  citaObj.id = generarId();
  citaObj.paciente = "";
  citaObj.propietario = "";
  citaObj.email = "";
  citaObj.fecha = "";
  citaObj.sintomas = "";
}

function generarId() {
  return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita) {
  citaObj.id = cita.id;
  citaObj.paciente = cita.paciente;
  citaObj.propietario = cita.propietario;
  citaObj.email = cita.email;
  citaObj.fecha = cita.fecha;
  citaObj.sintomas = cita.sintomas;

  pacienteInput.value = cita.paciente;
  propietarioInput.value = cita.propietario;
  emailInput.value = cita.email;
  fechaInput.value = cita.fecha;
  sintomasInput.value = cita.sintomas;

  editando = true;
  formularioInput.value = "Guardar Cambios";
}

function validarEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.[^<>()\[\]\\.,;:\s@"]+)*|(\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]))$/;
  return re.test(String(email).toLowerCase());
}

function formatearFecha(fecha) {
  const [año, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${año}`;
}

function validarFecha(fecha) {
  const fechaActual = new Date();
  const fechaCita = new Date(fecha);
  return fechaCita >= fechaActual;
}

function ordenarCitasPorFecha() {
  citas.ordenarPorFecha(ordenAscendente);
  citas.mostrar();
  ordenAscendente = !ordenAscendente; // Cambiar el orden para la próxima vez
}

function exportarCitas(formato) {
  const citas = JSON.parse(localStorage.getItem("citas")) || [];
  if (formato === "csv") {
    let csvContent = "data:text/csv;charset=utf-8,Paciente,Propietario,Email,Fecha,Síntomas\n";
    citas.forEach((cita) => {
      const row = `${cita.paciente},${cita.propietario},${cita.email},${formatearFecha(cita.fecha)},${cita.sintomas}\n`;
      csvContent += row;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "citas.csv");
    document.body.appendChild(link);
    link.click();
  } else if (formato === "pdf") {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let yPosition = 10; // Initial y position for the first text
    const lineHeight = 10; // Space between lines

    citas.forEach((cita) => {
      doc.text(`Paciente: ${cita.paciente}`, 10, yPosition);
      yPosition += lineHeight;
      doc.text(`Propietario: ${cita.propietario}`, 10, yPosition);
      yPosition += lineHeight;
      doc.text(`Email: ${cita.email}`, 10, yPosition);
      yPosition += lineHeight;
      doc.text(`Fecha: ${formatearFecha(cita.fecha)}`, 10, yPosition);
      yPosition += lineHeight;
      doc.text(`Síntomas: ${cita.sintomas}`, 10, yPosition);
      yPosition += lineHeight * 2; // Extra space between different citas

      // Check if yPosition exceeds page height, if so, add a new page
      if (yPosition > doc.internal.pageSize.height - lineHeight) {
        doc.addPage();
        yPosition = 10; // Reset y position for new page
      }
    });
    doc.save("citas.pdf");
  }
}

function importarCitas(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const csv = e.target.result;
      citasImportadas = csv
        .split("\n")
        .slice(1)
        .map((line) => {
          const [paciente, propietario, email, fecha, sintomas] = line.split(",");
          return { id: generarId(), paciente, propietario, email, fecha, sintomas };
        })
        .filter((cita) => cita.paciente);
      mostrarVistaPreviaCitas();
    };
    reader.readAsText(file);
  }
}

function mostrarVistaPreviaCitas() {
  // Limpiar el HTML de citas
  while (contenedorCitas.firstChild) {
    contenedorCitas.removeChild(contenedorCitas.firstChild);
  }

  const fragment = document.createDocumentFragment();

  // Mostrar citas importadas
  citasImportadas.forEach((cita) => {
    const divCita = document.createElement("div");
    divCita.classList.add("mx-5", "my-10", "bg-white", "shadow-md", "px-5", "py-10", "rounded-xl", "p-3");

    divCita.innerHTML = `
            <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">Paciente: </span>${
              cita.paciente
            }</p>
            <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">Propietario: </span>${
              cita.propietario
            }</p>
            <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">E-mail: </span>${
              cita.email
            }</p>
            <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">Fecha: </span>${formatearFecha(
              cita.fecha
            )}</p>
            <p class="font-normal mb-3 text-gray-700 normal-case"><span class="font-bold uppercase">Síntomas: </span>${
              cita.sintomas
            }</p>
        `;

    fragment.appendChild(divCita);
  });

  contenedorCitas.appendChild(fragment);

  // Mostrar botón de confirmación de importación
  confirmarImportacionBtn.classList.remove("hidden");
}

function confirmarImportacion() {
  citasImportadas.forEach((cita) => citas.agregar(cita));
  citas.mostrar();
  citasImportadas = [];
  confirmarImportacionBtn.classList.add("hidden");
  new Notificacion({
    texto: "Citas importadas correctamente",
    tipo: "success",
  });
}

function mostrarModalConfirmacion(id) {
  const modal = document.createElement("div");
  modal.classList.add(
    "modal-confirmacion",
    "fixed",
    "inset-0",
    "flex",
    "items-center",
    "justify-center",
    "bg-black",
    "bg-opacity-50"
  );
  modal.innerHTML = `
        <div class="bg-white p-5 rounded-lg shadow-lg text-center">
            <p class="mb-5">¿Estás seguro de que quieres eliminar este paciente?</p>
            <button id="confirmar-eliminar" class="bg-red-600 text-white p-2 rounded-full">Eliminar</button>
            <button id="cancelar-eliminar" class="bg-blue-600 text-white p-2 rounded-full ml-3">Cancelar</button>
        </div>
    `;
  document.body.appendChild(modal);

  document.getElementById("confirmar-eliminar").onclick = () => {
    citas.eliminar(id);
    document.body.removeChild(modal);
    new Notificacion({
      texto: "Paciente eliminado correctamente",
      tipo: "success",
    });
  };

  document.getElementById("cancelar-eliminar").onclick = () => {
    document.body.removeChild(modal);
  };
}

function inicializarCalendario() {
  const calendar = new FullCalendar.Calendar(calendarioEl, {
    initialView: "dayGridMonth",
    locale: "es",
    events: citas.citas.map((cita) => ({
      title: cita.paciente,
      start: cita.fecha,
    })),
  });
  calendar.render();
}

function actualizarCalendario() {
  const calendar = new FullCalendar.Calendar(calendarioEl, {
    initialView: "dayGridMonth",
    locale: "es",
    events: citas.citas.map((cita) => ({
      title: cita.paciente,
      start: cita.fecha,
    })),
  });
  calendar.render();
}

// Funcionalidad para cambiar entre temas claro y oscuro
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  themeToggleBtn.addEventListener("click", toggleTheme);

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
});
