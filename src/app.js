import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";



const barajar = () => {     
  const palos = ['spade', 'club', 'heart', 'diamond']            
  const randomPalo = palos[Math.floor(Math.random() * palos.length)];    
  const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const randomNumber =  valores[Math.floor(Math.random() * valores.length)];
  return {'number': randomNumber, 'style': randomPalo}
}

const specialChars = (opcion) => {  
  const customChars = {
    'spade':'♠' , 
    'club':'♣', 
    'heart':'♥', 
    'diamond':'♦',     
  }
  return customChars[opcion] || opcion;
}
const construirCarta = () => {

  const carta = document.querySelector('.carta')
    carta.classList.add('d-none')

  const reparto = barajar()  

  const iconoSuperior = carta.querySelector('.icono_superior');
  const cartaNumero = carta.querySelector('.carta_numero');
  const iconoInferior = carta.querySelector('.icono_inferior');

  cartaNumero.innerHTML = specialChars(reparto.number)
  iconoSuperior.innerHTML = specialChars(reparto.style)
  iconoInferior.innerHTML = iconoSuperior.innerHTML 
    
  carta.classList.remove('spade', 'club', 'heart', 'diamond');
  carta.classList.add(reparto.style);  
  
  //efectod de flip al mostrar la carta
  carta.style.animation = 'none';
  carta.offsetHeight;  
  carta.style.animation = 'flipIn 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
  carta.classList.remove('d-none');
}

const stopTimer = (estado) => {
  if (estado.timer) {
    clearInterval(estado.timer);
    estado.timer = false;
  }      
  estado.btnStop.classList.add('d-none');
  estado.btnStart.classList.remove('d-none');      
  estado.btnBarajar.classList.remove('d-none');      
};

const startTimer = (estado) => {
  if (estado.timer){
    clearInterval(estado.timer); 
  }
  
  estado.timer = setInterval(construirCarta, 2000); 
  estado.btnStart.classList.add('d-none');
  estado.btnBarajar.classList.add('d-none');
  estado.btnStop.classList.remove('d-none');   
};


const cambiarDimensiones = (estado) => {
  
  const nuevoWidth = prompt("Introduce el ancho de la carta (ej: 300):");
  if (!nuevoWidth || isNaN(nuevoWidth) || nuevoWidth < 200){
    return alert("Introduce un número válido para el ancho, minimo 200");
  } 
  const nuevoHeight = prompt("Introduce el alto de la carta (ej: 450):");
  if (!nuevoHeight || isNaN(nuevoHeight) || nuevoHeight < 200){
     return alert("Introduce un número válido para el alto, minimo 200.");
  }

  estado.carta.style.width = `${nuevoWidth}px`;
  estado.carta.style.height = `${nuevoHeight}px`;
  
  estado.carta.classList.remove('d-none');   

};



window.onload = function() { 
  const estadoApp = {
    timer: false,
    btnBarajar: document.querySelector('#btnBarajar'),
    btnStart: document.querySelector('#btnStartProgramar'),
    btnStop: document.querySelector('#btnStopProgramar'),
    carta: document.querySelector('.carta'),
    btnDimensiones: document.querySelector('#btnDimensiones')
  };

  estadoApp.btnBarajar.addEventListener('click', () => {
    stopTimer(estadoApp);  
    construirCarta();    
  });

  estadoApp.btnStart.addEventListener('click', () => {
    startTimer(estadoApp); 
  });

  estadoApp.btnStop.addEventListener('click', () => {
    stopTimer(estadoApp);
  });

  estadoApp.btnDimensiones.addEventListener('click', () => {
    cambiarDimensiones(estadoApp);
  });
};