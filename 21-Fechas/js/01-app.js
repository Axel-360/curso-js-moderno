const diaHoy = new Date('6-21-1991');

const opciones = {
  weekday: "long",
  month: "long",
  day: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "long",
};
const fechaFormateada = diaHoy.toLocaleString("es-ES", opciones);

console.log(fechaFormateada);
