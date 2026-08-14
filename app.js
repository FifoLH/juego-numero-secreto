let numeroSecreto = 0;
let intentos = 0;
const MAX_INTENTOS = 3;

// Inicializa las variables al cargar o reiniciar
function condicionesIniciales() {
  numeroSecreto = generarNumeroSecreto();
  intentos = 0;
  
  // Resetear textos y estilos de la pantalla
  const mensajeElem = document.getElementById('mensaje');
  mensajeElem.textContent = '';
  mensajeElem.className = 'mensaje';
  
  const tarjeta = document.getElementById('tarjetaJuego');
  tarjeta.className = 'card';

  document.getElementById('contador').textContent = MAX_INTENTOS;
  document.getElementById('valorUsuario').disabled = false;
  document.getElementById('btnReiniciar').setAttribute('disabled', 'true');
  document.getElementById('btnIntentar').removeAttribute('disabled');
  limpiarCaja();
}

// Genera número aleatorio entre 1 y 10
function generarNumeroSecreto() {
  return Math.floor(Math.random() * 10) + 1;
}

// Limpia el input del número
function limpiarCaja() {
  document.querySelector('#valorUsuario').value = '';
}

// Lógica principal al hacer clic en Intentar
function verificarIntento() {
  const inputElem = document.getElementById('valorUsuario');
  const valorInput = inputElem.value;

  // REQUERIMIENTO 1: Validar campos vacíos
  if (valorInput === '') {
    alert('Por favor, ingresa un número antes de intentar.');
    return;
  }

  const numeroDeUsuario = parseInt(valorInput);
  intentos++;
  const intentosRestantes = MAX_INTENTOS - intentos;

  const mensajeElem = document.getElementById('mensaje');
  const tarjetaElem = document.getElementById('tarjetaJuego');

  // REQUERIMIENTO 3 y 8: Si adivina (Ganó) -> Color verde de innovación
  if (numeroDeUsuario === numeroSecreto) {
    mensajeElem.textContent = `¡Felicidades! Adivinaste el número secreto (${numeroSecreto}) en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}.`;
    mensajeElem.className = 'mensaje ganador-texto';
    tarjetaElem.className = 'card ganador';
    
    finalizarJuego();
  } else {
    // REQUERIMIENTO 4 y 5: Limite de 3 intentos / Indicador de derrota
    if (intentos >= MAX_INTENTOS) {
      // REQUERIMIENTO 5 y 8: No adivinó -> Color rojo de innovación
      mensajeElem.textContent = `¡Has perdido! Se agotaron tus 3 intentos. El número secreto era el ${numeroSecreto}.`;
      mensajeElem.className = 'mensaje perdedor-texto';
      tarjetaElem.className = 'card perdedor';
      
      finalizarJuego();
    } else {
      // REQUERIMIENTO 2: Indicar si es mayor o menor
      if (numeroSecreto > numeroDeUsuario) {
        mensajeElem.textContent = 'El número secreto es MAYOR.';
      } else {
        mensajeElem.textContent = 'El número secreto es MENOR.';
      }
      mensajeElem.className = 'mensaje pista-texto';
      
      limpiarCaja(); // REQUERIMIENTO 6: Limpiar campo después de cada intento
    }
  }

  document.getElementById('contador').textContent = Math.max(0, intentosRestantes);
}

// Desactiva la entrada y activa el botón de Nueva Partida
function finalizarJuego() {
  document.getElementById('valorUsuario').disabled = true;
  document.getElementById('btnIntentar').setAttribute('disabled', 'true');
  document.getElementById('btnReiniciar').removeAttribute('disabled'); // REQUERIMIENTO 7: Botón nueva partida
}

// Reinicia la partida
function reiniciarJuego() {
  condicionesIniciales();
}

// Arrancar el juego al cargar
condicionesIniciales();