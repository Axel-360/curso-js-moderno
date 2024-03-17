// Funciones en Objetos y acceder a sus valores
const producto = {
  nombre: "Monitor 20 pulgadas",
  precio: 300,
  disponible: true,
  mostrarInfo: function () {
    console.log(
      `El Producto: ${this.nombre} tiene un precio de: ${this.precio} €`
    );
  },
};

const producto2 = {
  nombre: "Tablet",
  precio: 3000,
  disponible: true,
  mostrarInfo: function () {
    console.log(
      `El Producto: ${this.nombre} tiene un precio de: ${this.precio} €`
    );
  },
};

producto.mostrarInfo();
producto2.mostrarInfo();
