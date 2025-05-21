const cartas = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]; // 10 = J/Q/K, 11 = A
let mazo = [];
let jugador = [];
let dealer = [];
let terminado = false;

function barajar() {
  mazo = [];
  for (let i = 0; i < 4; i++) {
    mazo = mazo.concat(cartas);
  }
  mazo = mazo.sort(() => Math.random() - 0.5);
}

function repartirInicial() {
  jugador = [sacarCarta(), sacarCarta()];
  dealer = [sacarCarta(), sacarCarta()];
  terminado = false;
  actualizarVista();
}

function sacarCarta() {
  return mazo.pop();
}

function calcularPuntos(mano) {
  let total = mano.reduce((a, b) => a + b, 0);
  let ases = mano.filter(c => c === 11).length;
  while (total > 21 && ases > 0) {
    total -= 10;
    ases--;
  }
  return total;
}

function pedirCarta() {
  if (terminado) return;
  jugador.push(sacarCarta());
  actualizarVista();
  const puntos = calcularPuntos(jugador);
  if (puntos > 21) {
    terminado = true;
    mostrarMensaje("¡Te pasaste! Pierdes.");
  }
}

function plantarse() {
  if (terminado) return;
  terminado = true;
  while (calcularPuntos(dealer) < 17) {
    dealer.push(sacarCarta());
  }
  actualizarVista();
  decidirGanador();
}

function decidirGanador() {
  const puntosJugador = calcularPuntos(jugador);
  const puntosDealer = calcularPuntos(dealer);

  if (puntosDealer > 21 || puntosJugador > puntosDealer) {
    mostrarMensaje("¡Ganaste!");
  } else if (puntosJugador === puntosDealer) {
    mostrarMensaje("Empate.");
  } else {
    mostrarMensaje("Pierdes.");
  }
}

function mostrarMensaje(msg) {
  document.getElementById("mensaje").textContent = msg;
}

function actualizarVista() {
  document.getElementById("cartas-jugador").innerHTML = jugador.map(c => `<div class="card">${c}</div>`).join("");
  document.getElementById("cartas-dealer").innerHTML = dealer.map(c => `<div class="card">${c}</div>`).join("");
  document.getElementById("puntos-jugador").textContent = "Puntos: " + calcularPuntos(jugador);
  document.getElementById("puntos-dealer").textContent = "Puntos: " + calcularPuntos(dealer);
}

function reiniciar() {
  barajar();
  repartirInicial();
  mostrarMensaje("");
}

// Inicializar
reiniciar();

// Exponer funciones al objeto window
window.pedirCarta = pedirCarta;
window.plantarse = plantarse;
window.reiniciar = reiniciar;
