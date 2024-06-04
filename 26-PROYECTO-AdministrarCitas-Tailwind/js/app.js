// Selectores
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");
const buscarInput = document.querySelector("#buscar");
const ordenarBtn = document.querySelector("#ordenar");
const exportarBtn = document.querySelector("#exportar");
const importarInput = document.querySelector("#importar");
const confirmarImportacionBtn = document.querySelector("#confirmar-importacion");

const formulario = document.querySelector("#formulario-cita");
const formularioInput = document.querySelector('#formulario-cita input[type="submit"]');
const contenedorCitas = document.querySelector("#citas");
const calendarioEl = document.querySelector("#calendar");

// Estado para el orden de las citas
let ordenAscendente = true;
let citasImportadas = [];

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  citas.cargarLocalStorage();
  citas.mostrar();
  inicializarCalendario();
});

pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);
buscarInput.addEventListener("input", buscarCita);
ordenarBtn.addEventListener("click", ordenarCitasPorFecha);
exportarBtn.addEventListener("click", exportarCitas);
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

class Notificacion {
  constructor({ texto, tipo }) {
    this.texto = texto;
    this.tipo = tipo;
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
      "text-sm"
    );

    const alertaPrevia = document.querySelector(".alert");
    alertaPrevia?.remove();

    this.tipo === "error" ? alerta.classList.add("bg-red-500") : alerta.classList.add("bg-green-500");
    alerta.textContent = this.texto;
    formulario.parentElement.insertBefore(alerta, formulario);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

class AdminCitas {
  constructor() {
    this.citas = [];
  }

  agregar(cita) {
    this.citas.push(cita);
    this.guardarLocalStorage();
    this.mostrar();
  }

  editar(citaActualizada) {
    this.citas = this.citas.map((cita) => (cita.id === citaActualizada.id ? citaActualizada : cita));
    this.guardarLocalStorage();
    this.mostrar();
  }

  eliminar(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    this.guardarLocalStorage();
    this.mostrar();
  }

  ordenarPorFecha(ascendente) {
    if (ascendente) {
      this.citas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    } else {
      this.citas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    }
  }

  mostrar(citas = this.citas) {
    // Limpiar el HTML
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }

    // Comprobar si hay citas
    if (citas.length === 0) {
      contenedorCitas.innerHTML = ' <p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>';
      return;
    }

    // Generando las citas
    citas.forEach((cita) => {
      const divCita = document.createElement("div");
      divCita.classList.add("mx-5", "my-10", "bg-white", "shadow-md", "px-5", "py-10", "rounded-xl", "p-3");

      const paciente = document.createElement("p");
      paciente.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

      const propietario = document.createElement("p");
      propietario.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

      const email = document.createElement("p");
      email.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

      const fecha = document.createElement("p");
      fecha.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${formatearFecha(cita.fecha)}`;

      const sintomas = document.createElement("p");
      sintomas.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
      sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

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
      btnEditar.innerHTML =
        'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
      const clone = structuredClone(cita);
      btnEditar.onclick = () => cargarEdicion(clone);

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
      btnEliminar.innerHTML =
        'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path class="rotate-on-hover" d="M21 12a9 9 0 11-18 0 9 9 0118 0z"></path><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0118 0z"></path></svg>';
      btnEliminar.onclick = () => this.eliminar(cita.id);

      const contenedorBotones = document.createElement("DIV");
      contenedorBotones.classList.add("flex", "justify-between", "mt-10");

      contenedorBotones.appendChild(btnEditar);
      contenedorBotones.appendChild(btnEliminar);

      divCita.appendChild(paciente);
      divCita.appendChild(propietario);
      divCita.appendChild(email);
      divCita.appendChild(fecha);
      divCita.appendChild(sintomas);
      divCita.appendChild(contenedorBotones);
      contenedorCitas.appendChild(divCita);
    });

    // Actualizar el calendario
    actualizarCalendario();
  }

  guardarLocalStorage() {
    localStorage.setItem("citas", JSON.stringify(this.citas));
  }

  cargarLocalStorage() {
    this.citas = JSON.parse(localStorage.getItem("citas")) || [];
  }
}

function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

const citas = new AdminCitas();

function submitCita(e) {
  e.preventDefault();

  if (!pacienteInput.value.trim()) {
    new Notificacion({
      texto: "El nombre del paciente es obligatorio",
      tipo: "error",
    });
    return;
  }

  if (!propietarioInput.value.trim()) {
    new Notificacion({
      texto: "El nombre del propietario es obligatorio",
      tipo: "error",
    });
    return;
  }

  if (!validarEmail(emailInput.value)) {
    new Notificacion({
      texto: "El email no es válido",
      tipo: "error",
    });
    return;
  }

  if (!fechaInput.value.trim() || !validarFecha(fechaInput.value)) {
    new Notificacion({
      texto: "La fecha es obligatoria y debe ser una fecha válida",
      tipo: "error",
    });
    return;
  }

  if (!sintomasInput.value.trim()) {
    new Notificacion({
      texto: "Los síntomas son obligatorios",
      tipo: "error",
    });
    return;
  }

  if (editando) {
    citas.editar({ ...citaObj });
    new Notificacion({
      texto: "Guardado correctamente",
      tipo: "success",
    });
  } else {
    citas.agregar({ ...citaObj });
    new Notificacion({
      texto: "Paciente registrado correctamente",
      tipo: "success",
    });
  }

  formulario.reset();
  reiniciarObjetoCita();
  formularioInput.value = "Registrar Paciente";
  editando = false;
}

function reiniciarObjetoCita() {
  Object.assign(citaObj, {
    id: generarId(),
    paciente: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: "",
  });
}

function generarId() {
  return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita) {
  Object.assign(citaObj, cita);

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

function buscarCita(e) {
  const termino = e.target.value.toLowerCase();
  const citasFiltradas = citas.citas.filter(
    (cita) => cita.paciente.toLowerCase().includes(termino) || cita.propietario.toLowerCase().includes(termino)
  );
  citas.mostrar(citasFiltradas);
}

function ordenarCitasPorFecha() {
  citas.ordenarPorFecha(ordenAscendente);
  citas.mostrar();
  ordenAscendente = !ordenAscendente; // Cambiar el orden para la próxima vez
}

// Función para exportar citas a CSV
function exportarCitas() {
  const citas = JSON.parse(localStorage.getItem("citas")) || [];
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Paciente,Propietario,Email,Fecha,Síntomas\n";
  citas.forEach((cita) => {
    const row = `${cita.paciente},${cita.propietario},${cita.email},${cita.fecha},${cita.sintomas}\n`;
    csvContent += row;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "citas.csv");
  document.body.appendChild(link);
  link.click();
}

// Función para importar citas desde CSV
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

// Mostrar vista previa de citas importadas
function mostrarVistaPreviaCitas() {
  // Limpiar el HTML de citas
  while (contenedorCitas.firstChild) {
    contenedorCitas.removeChild(contenedorCitas.firstChild);
  }

  // Mostrar citas importadas
  citasImportadas.forEach((cita) => {
    const divCita = document.createElement("div");
    divCita.classList.add("mx-5", "my-10", "bg-white", "shadow-md", "px-5", "py-10", "rounded-xl", "p-3");

    const paciente = document.createElement("p");
    paciente.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
    paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

    const propietario = document.createElement("p");
    propietario.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
    propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

    const email = document.createElement("p");
    email.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
    email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

    const fecha = document.createElement("p");
    fecha.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
    fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${formatearFecha(cita.fecha)}`;

    const sintomas = document.createElement("p");
    sintomas.classList.add("font-normal", "mb-3", "text-gray-700", "normal-case");
    sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

    divCita.appendChild(paciente);
    divCita.appendChild(propietario);
    divCita.appendChild(email);
    divCita.appendChild(fecha);
    divCita.appendChild(sintomas);
    contenedorCitas.appendChild(divCita);
  });

  // Mostrar botón de confirmación de importación
  confirmarImportacionBtn.classList.remove("hidden");
}

// Confirmar importación de citas
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

// Inicializar el calendario
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

// Actualizar el calendario con las citas actuales
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
