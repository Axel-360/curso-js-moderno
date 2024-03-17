// Parametros por default
function saludar(nombre = "desconocido", apellido = "") {
  const mensaje = `Hola ${nombre} ${apellido}`;
  console.log(mensaje.trim());
}

saludar("David", "Rodriguez");
saludar("David");
saludar();
