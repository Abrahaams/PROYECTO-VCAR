// Selección de elementos
const images = document.querySelectorAll('.carousel img');
const thumbs = document.querySelectorAll('.thumb-item img');
const progressBars = document.querySelectorAll('.thumb-item .progress');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const navLinks = document.getElementById('navLinks');

let index = 0;

// Función para cambiar imagen
function showImage(i) {
    if (i < 0) i = images.length - 1;
    if (i >= images.length) i = 0;

    images.forEach(img => img.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    progressBars.forEach(bar => bar.classList.remove('active'));

    images[i].classList.add('active');
    thumbs[i].classList.add('active');
    progressBars[i].classList.add('active');

    index = i;
}

// Eventos Flechas
nextBtn.addEventListener('click', () => showImage(index + 1));
prevBtn.addEventListener('click', () => showImage(index - 1));

// Eventos Miniaturas
thumbs.forEach((thumb, i) => {
    thumb.addEventListener('click', () => showImage(i));
});

// Función Menú Móvil
function toggleMenu() {
    navLinks.classList.toggle('active');
}

// Iniciar
showImage(0);