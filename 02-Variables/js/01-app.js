// Inicializar una variable con un valor
var producto = "Monitor de 24 Pulgadas";
console.log(producto);

// Las variables se pueden reasignar 
producto = "Monitor de 19 pulgadas";
console.log(producto);

// JavaScript es un lenguaje de tipo dinamico, no se especifica tipo de dato
producto = 20;
console.log(producto);


// Se pueden inicializar sin valor y asignarlo después
var disponible;
disponible = true;

disponible = false;

// Inicializar múltiples variables
var categoria = "Ordenadores",
    marca = "Marca famosa",
    calificacion = 5;

// Las variables no pueden iniciar con números 
var 99dias;
var dias99;

var 01_;
var _01;
var _usuario;
var __usuario;

// Formas de crear variables
var nombreProductoCategoriaPrecio;      // Camel Case
var nombre_producto_categoria_precio;   // Snake case
var NombreProducto;                     // Pascal Case
var nombreproducto;                     // Lower Case