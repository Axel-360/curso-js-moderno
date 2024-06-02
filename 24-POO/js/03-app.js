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

// Herencia
class Empresa extends Cliente {
  constructor(nombre, saldo, telefono, categoria, bienvenida) {
    super(nombre, saldo);
    this.telefono = telefono;
    this.categoria = categoria;
    this.bienvenida = bienvenida;
  }

  static bienvenida() { // Rescribir un método
    return "Bienvenido al cajero de empresas";
  }
}

const david = new Cliente("David", 400);
const empresa = new Empresa(
  "TechCrafters",
  500,
  932384723,
  "Programación",
  "Bienvenido, Todo lo que imagines es posible, no pongas barreras a tu imaginacion."
);
console.log(empresa);
console.log(empresa.mostrarInformacion());


console.log(Cliente.bienvenida());
console.log(Empresa.bienvenida());