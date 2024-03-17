// .some
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

const carrito = [
  { nombre: "Monitor 27 Pulgadas", precio: 500 },
  { nombre: "Televisión", precio: 100 },
  { nombre: "Tablet", precio: 200 },
  { nombre: "Audifonos", precio: 300 },
  { nombre: "Teclado", precio: 400 },
  { nombre: "Celular", precio: 700 },
];

// Comprobar si un valor existe en un array
// meses.forEach((mes) => {
//   if (mes === "Enero") {
//     console.log("Enero sí existe");
//   }
// });

// const resultado = meses.includes("Diciembre");
// console.log(resultado);

const busqueda = "Enero";
// En un array de objetos se utiliza .some
const existe = carrito.some((producto) => producto.nombre === `${busqueda}`);

if (existe === true) {
  console.log(`producto ${busqueda} sí existe`);
} else {
  console.log(`producto ${busqueda} no existe`);
}

const busqueda2 = "Enero";
// En un array tradicional con .some
const existe2 = meses.some((mes) => mes === `${busqueda2}`);

if (existe2 === true) {
  console.log(`${busqueda2} sí existe`);
} else {
  console.log(`${busqueda2} no existe`);
}
