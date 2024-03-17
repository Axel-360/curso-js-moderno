// El Operador && para revisar que se cumplan 2 o más condiciones
const usuario = false;
const puedePagar = false;

if (usuario && puedePagar) {
  console.log("Si puedes comprar");
} else if (!puedePagar && !usuario) {
  console.log("No, no puedes comprar");
} else if (!usuario) {
  console.log("Inicia sesión o registrate");
} else if (!puedePagar) {
  console.log("Fondos insuficientes");
} 