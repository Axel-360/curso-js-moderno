// Object .keys, .values y .entries
const producto = {
  nombre: "Monitor 20 pulgadas",
  precio: 300,
  disponible: true,
};

console.log(Object.keys(producto)); // ["nombre", "precio", "disponible"]

console.log(Object.values(producto)); // ["Monitor 20 pulgadas", 300, true]

console.log(Object.entries(producto));  // [["nombre", "Monitor 20 pulgadas"], ["precio", 300], ["disponible", true]]
