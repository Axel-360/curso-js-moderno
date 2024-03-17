//Eliminar Espacios en Blanco de un String
const producto = "                  Monitor 20 Pulgadas                 ";

console.log(producto);
console.log(producto.length);

// Eliminar del incicio.
console.log(producto.trimStart());

// Eliminar del final.
console.log(producto.trimEnd());

// Eliminar del incicio y final.
console.log(producto.trimStart().trimEnd());

//Eliminar de ambos lados.
console.log(producto.trim());
