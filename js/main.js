function toggleMenu() {
  document.querySelector('.sidebar').classList.toggle('active');
}

document.querySelectorAll('.carousel').forEach(carousel => {
  let index = 0;
  const images = carousel.querySelectorAll('img');

  images[index].classList.add('active');

  carousel.querySelector('.next').onclick = () => {
    images[index].classList.remove('active');
    index = (index + 1) % images.length;
    images[index].classList.add('active');
  };

  carousel.querySelector('.prev').onclick = () => {
    images[index].classList.remove('active');
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add('active');
  };
});
