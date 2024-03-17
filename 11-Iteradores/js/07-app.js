// for ....of
const pendientes = ["Tarea", "Comer", "Proyecto", "Estudiar JavaScript"];

const carrito = [
  { nombre: "Monitor 27 pulgadas", precio: 500 },
  { nombre: "Televisión", precio: 100 },
  { nombre: "Tablet", precio: 200 },
  { nombre: "Auriculares", precio: 300 },
  { nombre: "Teclado", precio: 400 },
  { nombre: "Movil", precio: 700 },
];

for (let pendiente of pendientes) {
  console.log(pendiente);
}

for (let producto of carrito) {
  console.log(producto.nombre);
}
