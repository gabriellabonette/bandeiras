const bandeiras = ['🇧🇷', '🇺🇸', '🇫🇷', '🇯🇵', '🇧🇪', '🇨🇦', '🇦🇺', '🇮🇹', '🇲🇽'];

let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let lockBoard = false;
let paresEncontrados = 0;

const tabuleiro = document.getElementById('tabuleiro');
const resultado = document.getElementById('resultado');
const nomeInput = document.getElementById('nome-input');
const jogadorDiv = document.getElementById('jogador');
const reiniciarBtn = document.getElementById('reiniciar');

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function iniciarJogo() {
  tabuleiro.innerHTML = '';
  resultado.innerHTML = '';
  paresEncontrados = 0;
  primeiraCarta = null;
  segundaCarta = null;
  lockBoard = false;

  cartas = [...bandeiras, ...bandeiras];
  embaralhar(cartas);

  cartas.forEach((emoji, index) => {
    const carta = document.createElement('div');
    carta.className = 'carta';
    carta.dataset.emoji = emoji;
    carta.dataset.index = index;
    carta.innerHTML = '';
    carta.addEventListener('click', virarCarta);
    tabuleiro.appendChild(carta);
  });
}

function virarCarta(e) {
  if (lockBoard) return;

  const carta = e.currentTarget;

  if (carta.innerHTML !== '') return;

  carta.innerHTML = carta.dataset.emoji;

  if (!primeiraCarta) {
    primeiraCarta = carta;
    return;
  }

  segundaCarta = carta;

  if (primeiraCarta.dataset.emoji === segundaCarta.dataset.emoji) {
    paresEncontrados++;
    resultado.innerHTML = `Par encontrado! (${paresEncontrados}/9)`;
    primeiraCarta = null;
    segundaCarta = null;

    if (paresEncontrados === bandeiras.length) {
      resultado.innerHTML = `Parabéns, ${jogadorDiv.innerText}! Você ganhou!`;
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      primeiraCarta.innerHTML = '';
      segundaCarta.innerHTML = '';
      primeiraCarta = null;
      segundaCarta = null;
      lockBoard = false;
    }, 1000);
  }
}

document.getElementById('nome-input').addEventListener('input', () => {
  const nome = document.getElementById('nome-input').value.trim();
  jogadorDiv.innerText = nome ? nome : '';
});

window.onload = () => {
  iniciarJogo();
};

reiniciarBtn.addEventListener('click', () => {
  iniciarJogo();
  const nome = document.getElementById('nome-input').value.trim();
  jogadorDiv.innerText = nome ? nome : '';
});
