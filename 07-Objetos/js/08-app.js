// Congelar un Objeto para no poderlo modificar
"use strict";

const producto = {
  nombre: "Monitor 20 pulgadas",
  precio: 300,
  disponible: true,
};

// El metodo .freeze no te permite cambiar nada.
Object.freeze(producto);

// producto.disponible = false;
// producto.imagen = "imagen.jpg";
// delete producto.precio;

console.log(producto);

// Con esto podemos comprobar si una variable esta congelada
console.log(Object.isFrozen(producto));
