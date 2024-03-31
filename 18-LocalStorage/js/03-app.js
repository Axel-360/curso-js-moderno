localStorage.removeItem("nombre");

// Actualizar un registro
console.log(localStorage.getItem("meses"));
console.log(typeof localStorage.getItem("meses"));

const mesesArray = getMesesFromLocalStorage();
mesesArray.push("Nuevo Mes");
console.log(mesesArray);
localStorage.setItem("meses", JSON.stringify(mesesArray));

function getMesesFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("meses")) || [];
  } catch {
    return [];
  }
}

localStorage.clear();

