/*
    ========================================
    === LE PREGUNTA AL USUARIO SU NOMBRE ===
    ========================================
 */
const nombre = prompt("Cual es tu nombre?");

// Coge el nombre y lo muestra en pantalla
document.querySelector(".contenido").innerHTML = `${nombre} está aprendiendo JavaScript Moderno`;

// Asigna el valor hacia una variable producto
const producto = 'Monitor 24 pulgadas';