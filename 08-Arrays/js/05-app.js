// Añadir nuevos elementos al fin o Inicio de un array
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

// .push se agrega al final de un array
carrito.push(producto);
carrito.push(producto2);

const producto3 = {
  nombre: "Teclado",
  precio: 50,
};

// .unshift se agrega al inicio de un array
carrito.unshift(producto3)

console.table(carrito);
