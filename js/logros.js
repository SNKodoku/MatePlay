// -----------------------------
// SISTEMA DE LOGROS Y ESTRELLAS
// -----------------------------

// Si no existen, inicializarlas
if (!localStorage.getItem("estrellas")) {
  localStorage.setItem("estrellas", 0);
}

function obtenerEstrellas() {
  return parseInt(localStorage.getItem("estrellas"));
}

function agregarEstrella(cuantas = 1) {
  let actual = obtenerEstrellas();
  localStorage.setItem("estrellas", actual + cuantas);
}

// Mostrar estrellas en logros.html
let total = document.getElementById("totalStars");
if (total) {
  total.textContent = `⭐ ${obtenerEstrellas()}`;
}
