// Concatenar un String y Template Strings
const producto = "Monitor 20 Pulgadas";
const precio = "30 € ";

// console.log(producto.concat(precio));
// console.log(producto.concat("En descuento"));

console.log(producto + " con un precio de: " + precio);

console.log("El producto " + producto + " tiene un precio de: " + precio);
console.log("El producto", producto, "tiene un precio de:", precio);


// Para concatenar cadenas es mejor usar esta.
console.log(`El producto ${producto} tiene un precio de: ${precio}`);
