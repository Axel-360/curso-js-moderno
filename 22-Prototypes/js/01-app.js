const cliente = {
  nombre: "David",
  saldo: 500,
};

console.log(cliente);

function Cliente(nombre, saldo) {
  this.nombre = nombre;
  this.saldo = saldo;
}

const david = new Cliente('David', 500);
console.log(david);