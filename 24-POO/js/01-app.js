// Definiendo e instanciando una clase

// Forma de instanciar una clase, se suele usar más esta
class Cliente {
  constructor(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
  }

  // Método
  mostrarInformacion() {
    return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo}`;
  }

  // Métodos estaticos en las classes
  static bienvenida() {
    return "Bienvenido al cajero";
  }
}

const david = new Cliente("David", 400);
console.log(david.mostrarInformacion());
console.log(david);
console.log(david.bienvenida());

console.log(Cliente.bienvenida());




// Otra forma de instanciar una clase
const Cliente2 = class {
  constructor(nombre, saldo) {
    this.nombre = nombre;
    this.saldo = saldo;
  }
  mostrarInformacion() {
    return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo}`;
  }
};

const david2 = new Cliente2("David", 400);
console.log(david2.mostrarInformacion());
console.log(david2);
