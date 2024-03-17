// .forEach y .map

const pendientes = ["Tarea", "Comer", "Proyecto", "Estudiar JavaScript"];

pendientes.forEach((pendiente, indice) => console.log(`${indice} : ${pendiente}`));

const carrito = [
  { nombre: "Monitor 27 pulgadas", precio: 500 },
  { nombre: "Televisión", precio: 100 },
  { nombre: "Tablet", precio: 200 },
  { nombre: "Auriculares", precio: 300 },
  { nombre: "Teclado", precio: 400 },
  { nombre: "Movil", precio: 700 },
];

const nuevoArray = carrito.forEach((producto) => producto.nombre);


const nuevoArray2 = carrito.map((producto) => producto.nombre);

console.log(nuevoArray);
console.log(nuevoArray2);