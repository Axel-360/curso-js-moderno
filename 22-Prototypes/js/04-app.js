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

function persona(nombre, saldo, telefono) {
  Cliente.call(this, nombre, saldo);
  this.telefono = telefono;
}

persona.prototype = Object.create(Cliente.prototype);

persona.prototype.constructor = Cliente;

// Instanciarlo
const david = new persona("David", 5000, 678392733);
console.log(david);
console.log(david.nombreClienteSaldo());

persona.prototype.mostrarTelefono = function () {
  return `El teléfono de esta persona es: ${this.telefono}`;
};
console.log(david.mostrarTelefono());
