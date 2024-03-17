// Detener la ejecución de un if con una función

const autenticado = true;

if (autenticado) {
  console.log("El usuario esta autenticado");
}

const puntos = 450;

function revisarPuntos(){
  if (puntos > 400) {
    console.log("Excelente!!");
    return;
  }

  if (puntos > 300) {
    console.log("Buen puntuaje... felicidades!");
    return;
  }
}
  revisarPuntos();