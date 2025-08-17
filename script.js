const track = document.querySelector('.carousel-track');
const items = Array.from(document.querySelectorAll('.carousel-item'));
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.carousel-dots');

let index = 0;
let autoPlay;

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash) {
    window.scrollTo(0, 0);
    setTimeout(function () {
      const element = document.querySelector(window.location.hash);
      if (element) {
        window.scrollTo(0, element.offsetTop - 100); // ajuste 100 conforme altura do cabeçalho
      }
    }, 0);
  }
});


// Clonar primeiros e últimos itens para efeito infinito
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);
const allItems = document.querySelectorAll('.carousel-item');

// Ajustar posição inicial
track.style.transform = `translateX(-100%)`;
let itemWidth = allItems[0].offsetWidth;

// Criar indicadores
items.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
    resetAutoPlay();
  });
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('button');

function updateCarousel() {
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Loop infinito
track.addEventListener('transitionend', () => {
  if (allItems[index + 1] === firstClone) {
    track.style.transition = 'none';
    index = 0;
    track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;
  }
  if (allItems[index + 1] === lastClone) {
    track.style.transition = 'none';
    index = items.length - 1;
    track.style.transform = `translateX(-${(index + 1) * itemWidth}px)`;
  }
});

// Botões
prevBtn.addEventListener('click', () => {
  index--;
  if (index < 0) index = items.length - 1;
  updateCarousel();
  resetAutoPlay();
});
nextBtn.addEventListener('click', () => {
  index++;
  if (index >= items.length) index = 0;
  updateCarousel();
  resetAutoPlay();
});

// Auto-play
function startAutoPlay() {
  autoPlay = setInterval(() => {
    index++;
    if (index >= items.length) index = 0;
    updateCarousel();
  }, 4000);
}
function resetAutoPlay() {
  clearInterval(autoPlay);
  startAutoPlay();
}
startAutoPlay();

// Swipe mobile
let startX = 0;
track.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
track.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) index++;
  else if (endX - startX > 50) index--;
  if (index < 0) index = items.length - 1;
  if (index >= items.length) index = 0;
  updateCarousel();
  resetAutoPlay();
});

// Recalcular largura ao redimensionar
window.addEventListener('resize', () => {
  itemWidth = allItems[0].offsetWidth;
  updateCarousel();
});
// Inicializar o carrossel 

