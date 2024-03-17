// Sellar un Objeto
"use strict";

const producto = {
  nombre: "Monitor 20 pulgadas",
  precio: 300,
  disponible: true,
};

// El metodo .seal te permite modificar un valor de un objeto existente pero no te deja aregar nuevas vaariables dentro del objeto ni eliminar variables existentes
Object.seal(producto);

producto.disponible = false;
// producto.imagen = "imagen.jpg";
// delete producto.precio;

console.log(producto);

// De esta manera podemos comprobar si el objeto esta sellado
console.log(Object.isSealed(producto));


