// Como se Comunican las funciones

iniciarApp();

function iniciarApp() {
  console.log("Iniciando app...");
  conectarBaseDeDatos();
  conectarMonitores();
  usuarioAutenticado('David');
  console.log("App iniciada");
}

function conectarBaseDeDatos() {
  console.log("Conectando a base de datos...");
}

function conectarMonitores() {
  console.log("Conectando monitores...");
}

function usuarioAutenticado(usuario) {
  console.log('Autenticando usuario... espere...');
  console.log(`Usuario ${usuario} autenticado exitosamente.`);
}
