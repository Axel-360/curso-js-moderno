// Eliminar elementos con Splice
const carrito = [];

// Definir un producto
const producto = {
  nombre: "Monitor 32 Pulgadas",
  precio: 400,
};

const producto2 = {
  nombre: "movil",
  precio: 800,
};

const producto4 = {
  nombre: "movil 2",
  precio: 100,
};

// .push se agrega al final de un array
carrito.push(producto2);
carrito.push(producto);
carrito.push(producto4);

const producto3 = {
  nombre: "Teclado",
  precio: 50,
};

// .unshift se agrega al inicio de un array
carrito.unshift(producto3);
console.table(carrito);

// //Eliminar último elemento de un arreglo...
// carrito.pop();

// console.table(carrito);

// // Eliminar del inicio del arreglo
// carrito.shift();
// console.table(carrito);

carrito.splice(1, 1);
console.table(carrito);
