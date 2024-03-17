//Añadir Funciones en un Objeto
const reproductor = {
  reproducir: function (id) {
    console.log(`Reproduciendo canción... ${id}`);
  },
  pausar: function () {
    console.log("pausando...");
  },
  borrar: function (id) {
    console.log(`Borrando cancion... ${id}`);
  },
  addToPlayList: function (id) {
    console.log(`Agregando canción número ${id} a la playlist`);
  },
  reproducirPlayList: function (playlist) {
    console.log(`Reproduciendo la playlist ${playlist}`);
  },
};

reproductor.reproducir(30);
reproductor.reproducir(20);
reproductor.pausar();
reproductor.borrar(30);
reproductor.addToPlayList(30);
reproductor.reproducirPlayList("Madonna");
