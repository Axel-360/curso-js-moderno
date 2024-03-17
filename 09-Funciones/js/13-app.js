//Añadir Funciones en un Objeto
const reproductor = {
  cancion: "",
  reproducir: (id) => console.log(`Reproduciendo canción... ${id}`),
  pausar: () => console.log("pausando..."),
  borrar: (id) => console.log(`Borrando cancion... ${id}`),
  addToPlayList: (id) =>
    console.log(`Agregando canción número ${id} a la playlist`),
  reproducirPlayList: (playlist) =>
    console.log(`Reproduciendo la playlist ${playlist}`),

  set nuevaCancion(cancion) {
    this.cancion = cancion;
    console.log(`Añadiendo ${cancion}`);
  },
  get obtenerCancion() {
    console.log(`${this.cancion}`);
  },
};

reproductor.nuevaCancion = "Hung Up";
reproductor.obtenerCancion;

reproductor.reproducir(30);
reproductor.reproducir(20);
reproductor.pausar();
reproductor.borrar(30);
reproductor.addToPlayList(30);
reproductor.reproducirPlayList("Madonna");
