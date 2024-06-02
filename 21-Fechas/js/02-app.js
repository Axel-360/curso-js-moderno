const diaHoy = new Date();


// Se usa la libreria moment que ya esta obsoleta, mejor usar otras librerias
moment.locale("es");

console.log(moment().format('MMMM DD YYYY h:mm:ss a'));
console.log(moment().format('LLLL'));