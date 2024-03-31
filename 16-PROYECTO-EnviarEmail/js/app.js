document.addEventListener("DOMContentLoaded", function () {
  const datos = {
    email: "",
    cc: "",
    asunto: "",
    mensaje: "",
  };

  // Selecionar los elemntos de la interfaz
  const inputEmail = document.querySelector("#email");
  const cc = document.querySelector("#cc");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  // Asignar eventos
  inputEmail.addEventListener("input", validar);
  cc.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  formulario.addEventListener("submit", enviarEmail);

  btnReset.addEventListener("click", function (event) {
    event.preventDefault();
    resetFormulario();
  });

  function enviarEmail(event) {
    event.preventDefault();
    spinner.classList.add("flex");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.classList.remove("flex");
      spinner.classList.add("hidden");

      resetFormulario();

      // Crear una alerta
      const alertaExito = document.createElement("P");
      alertaExito.classList.add(
        "bg-green-500",
        "text-white",
        "p-2",
        "text-center",
        "rounded-lg",
        "mt-10",
        "font-bold",
        "text-sm",
        "uppercase"
      );
      alertaExito.textContent = "Mensaje enviado correctamente";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(event) {
    if (event.target.id !== "cc" && event.target.value.trim() === "") {
      mostrarAlerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
      datos[event.target.name] = "";
      comprobarEmail();
      return;
    }

    if (event.target.id === "cc" && event.target.value.trim() !== "" && !emailEsValido(event.target.value)) {
      mostrarAlerta("El CC no es valido", event.target.parentElement);
      datos[event.target.name] = "";
      comprobarEmail();
      return;
    }

    if (event.target.id === "email" && !emailEsValido(event.target.value)) {
      mostrarAlerta("El email no es válido", event.target.parentElement);
      datos[event.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(event.target.parentElement);

    // Asignar los valores
    datos[event.target.name] = event.target.value.trim().toLowerCase();
    cc[event.target.name] = event.target.value.trim().toLowerCase();

    // comprobar el objeto email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-white", "p-2", "text-center");

    // Inyectar el error al formulario
    referencia.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    // comprueba si ya existe una alerta
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  }

  function emailEsValido(email) {
    const regexEmail =
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)*@(?!-)(?:[a-zA-Z0-9-]{1,63}\.)*[a-zA-Z]{2,63}$/;
    const resultado = regexEmail.test(email);
    return resultado;
  }

  function comprobarEmail() {
    const datosAValidar = [datos.email, datos.asunto, datos.mensaje];
    if (!cc.checkValidity() || datosAValidar.includes("")) {
      btnSubmit.classList.add("opacity-50");
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
  }

  function resetFormulario() {
    // reiniciar el objeto
    datos.email = "";
    datos.cc = "";
    datos.asunto = "";
    datos.mensaje = "";

    formulario.reset();
    comprobarEmail();
  }
});
