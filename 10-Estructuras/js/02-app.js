// Comparador Estricto
const puntos = 1000;
const puntos2 = '1000';

console.log(typeof puntos);
console.log(typeof puntos2);

// != diferente == igual a
// if (puntos != 1000) {
//   console.log("Si! es diferente");
// }

if (puntos !== "1000") {
  console.log("Si es diferente!");
} else {
  console.log("No, no es diferente!");
}

// ==   Operador que no es estricto.
// ===  Operador que si es estricto.
