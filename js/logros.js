// ======================================================
// SISTEMA GLOBAL DE LOGROS Y ESTRELLAS
// ======================================================

// Inicializar contador global si no existe
if (!localStorage.getItem("estrellas")) {
  localStorage.setItem("estrellas", 0);
}

// Obtener cantidad global de estrellas
function obtenerEstrellas() {
  return parseInt(localStorage.getItem("estrellas"));
}

// Sumar estrellas globales
function agregarEstrella(cuantas = 1) {
  let actual = obtenerEstrellas();
  localStorage.setItem("estrellas", actual + cuantas);
}

// Mostrar estrellas globales (solo funciona en logros.html)
let total = document.getElementById("totalStars");
if (total) {
  total.textContent = `⭐ ${obtenerEstrellas()}`;
}

// ======================================================
// FUNCIÓN PRINCIPAL — ASIGNAR LOGRO
// ======================================================
//
// sumarEstrella("nombre_del_logro");
//
// → Marca el logro como completado
// → Suma 1 estrella global SOLO si es nuevo
//
function sumarEstrella(nombreLogro) {
  if (!localStorage.getItem(nombreLogro)) {
    // Registrar logro
    localStorage.setItem(nombreLogro, 1);

    // Sumar una estrella global
    agregarEstrella(1);
  }
}

// ======================================================
// LEER SI UN LOGRO YA ESTÁ COMPLETADO
// ======================================================
function leerEstrellas(nombreLogro) {
  return parseInt(localStorage.getItem(nombreLogro)) || 0;
}
