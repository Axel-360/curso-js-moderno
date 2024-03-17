// .map para iterar un array, y sus diferencias con forEach
const carrito = [
  { nombre: "Monitor 27 pulgadas", precio: 500 },
  { nombre: "Televisión", precio: 100 },
  { nombre: "Tablet", precio: 200 },
  { nombre: "Auriculares", precio: 300 },
  { nombre: "Teclado", precio: 400 },
  { nombre: "Movil", precio: 700 },
];

const nuevoArray = carrito.map(function (producto) {
  return `${producto.nombre} - Precio: ${producto.precio} €`;
});


const nuevoArray2 = carrito.forEach(function (producto) {
  return `${producto.nombre} - Precio: ${producto.precio} €`;
});

console.log(nuevoArray);
console.log(nuevoArray2);