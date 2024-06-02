class Cliente {
  #nombre;

  setNombre(nombre) {
    this.#nombre = nombre;
  }

  getNombre() {
    return this.#nombre;
  }
}

const david = new Cliente();
david.setNombre("David");
console.log(david.getNombre());