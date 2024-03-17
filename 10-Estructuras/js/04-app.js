// Mayor o Igual y else if

const dinero = 100;
const totaAPagar = 500;
const tarjeta = true;
const cheque = true;

if (dinero >= totaAPagar) {
  console.log("Si podemos pagar");
} else if (cheque) {
 console.log('Si tengo un cheque'); 
}else if (tarjeta) {
  console.log("Si puedo pagar porque tengo la tarjeta");
} else {
  console.log("Fondos insuficientes");
}

