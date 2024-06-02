function Cliente(nombre, saldo) {
  this.nombre = nombre;
  this.saldo = saldo;
}

const david = new Cliente("David", 500);

function formatearCliente(cliente) {
  const { nombre, saldo } = cliente;
  return `El cliente ${nombre} tiene un saldo de ${saldo} €`;
}
function formatearEmpresa(empresa) {
  const { nombre, saldo, categoria } = empresa;
  return `La empresa ${nombre} tiene un saldo de ${saldo} € y pertenece a la categoría ${categoria}`;
}

console.log(formatearCliente(david));

function Empresa(nombre, saldo, categoria) {
  this.nombre = nombre;
  this.saldo = saldo;
  this.categoria = categoria;
}

const SpaceX = new Empresa("SpaceX", 40000000, "aeroespacial");
console.log(formatearEmpresa(SpaceX));
