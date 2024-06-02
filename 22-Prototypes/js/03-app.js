function Cliente(nombre, saldo) {
  this.nombre = nombre;
  this.saldo = saldo;
}

Cliente.prototype.tipoCliente = function () {
  let tipo;

  if (this.saldo > 10000) {
    tipo = "Gold";
  } else if (this.saldo > 5000) {
    tipo = "Silver";
  } else {
    tipo = "Normal";
  }
  return tipo;
};

Cliente.prototype.nombreClienteSaldo = function () {
  return `Nombre: ${this.nombre}, Saldo: ${this.saldo} €, Tipo Cliente: ${this.tipoCliente()}`;
};

Cliente.prototype.retiraSaldo = function (retiraSaldo) {
  this.saldo -= retiraSaldo;
};

// Instanciarlo
const david = new Cliente("David", 6000);
console.log(david.tipoCliente());
console.log(david.nombreClienteSaldo());
david.retiraSaldo(1000);
console.log(david.nombreClienteSaldo());


console.log(david);
