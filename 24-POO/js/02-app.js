// Método y Métodos estaticos en las classes

class Cliente {
  constructor(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
  }

  mostrarInformacion() {
    return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo}`;
  }

  static bienvenida() {
    return "Bienvenido al cajero";
  }
}

const david = new Cliente("David", 400);
console.log(david.mostrarInformacion());
console.log(david);
console.log(david.bienvenida());

console.log(Cliente.bienvenida());
