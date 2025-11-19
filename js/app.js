   /* ----------------- SCROLL SUAVE ----------------- */
    function scrollToSection(id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }

    /* ----------------- JUEGO DE SUMAS ----------------- */
    let respuestaCorrecta = null;

    function nuevoEjercicio() {
      // Generamos dos números al azar de 0 a 20 (pueden cambiar rango)
      const a = Math.floor(Math.random() * 11);
      const b = Math.floor(Math.random() * 11);
      respuestaCorrecta = a + b;

      const pregunta = document.getElementById("game-question");
      const opcionesContainer = document.getElementById("game-options");
      const resultado = document.getElementById("game-result");

      pregunta.textContent = `${a} + ${b} = ?`;
      resultado.textContent = "";
      resultado.className = "game-result";

      // Generamos 4 opciones, una correcta y 3 distractores
      const opciones = new Set();
      opciones.add(respuestaCorrecta);
      while (opciones.size < 4) {
        const desvio = Math.floor(Math.random() * 7) - 3; // -3 a +3
        const posible = respuestaCorrecta + desvio;
        if (posible >= 0) opciones.add(posible);
      }

      const opcionesBarajadas = Array.from(opciones).sort(() => Math.random() - 0.5);

      opcionesContainer.innerHTML = "";
      opcionesBarajadas.forEach((opcion) => {
        const btn = document.createElement("button");
        btn.className = "game-option";
        btn.textContent = opcion;
        btn.onclick = () => evaluarRespuesta(opcion);
        opcionesContainer.appendChild(btn);
      });
    }

    function evaluarRespuesta(opcion) {
      const resultado = document.getElementById("game-result");
      if (opcion === respuestaCorrecta) {
        resultado.textContent = "¡Muy bien! ✅";
        resultado.className = "game-result ok";
      } else {
        resultado.textContent = "Casi, inténtalo de nuevo. ❌";
        resultado.className = "game-result bad";
      }
    }

    // ----------------------
// PIZARRÓN VIRTUAL PRO
// ----------------------

const canvas = document.getElementById("pizarron");
const ctx = canvas.getContext("2d");

let dibujando = false;
let modo = "lapiz"; // lapiz | borrador
let grosor = document.getElementById("grosor").value;
let color = document.getElementById("colorPicker").value;

// Fondo cuadriculado
function fondoPizarron() {
    const size = 20;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#ddd";
    for (let i = 0; i < canvas.width; i += size) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += size) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
    }
}
fondoPizarron();

// Eventos mouse
canvas.addEventListener("mousedown", e => {
    dibujando = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener("mouseup", () => dibujando = false);
canvas.addEventListener("mousemove", e => {
    if (!dibujando) return;

    ctx.lineWidth = grosor;

    if (modo === "lapiz") {
        ctx.strokeStyle = color;
    } else if (modo === "borrador") {
        ctx.strokeStyle = "#ffffff";
    }

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

// Eventos táctiles
canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    let touch = e.touches[0];
    let rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
});
canvas.addEventListener("touchmove", e => {
    e.preventDefault();
    let touch = e.touches[0];
    let rect = canvas.getBoundingClientRect();

    ctx.lineWidth = grosor;

    if (modo === "lapiz") ctx.strokeStyle = color;
    else ctx.strokeStyle = "#ffffff";

    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
});

// Funciones botones
function modoDibujo() {
    modo = "lapiz";
}

function modoBorrador() {
    modo = "borrador";
}

function limpiarPizarron() {
    fondoPizarron();
}

function guardarPizarron() {
    const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "pizarron.png";
    link.href = img;
    link.click();
}

// Inputs
document.getElementById("colorPicker").addEventListener("input", e => {
    color = e.target.value;
});
document.getElementById("grosor").addEventListener("input", e => {
    grosor = e.target.value;
});


    // Inicializar la página
    nuevoEjercicio();
