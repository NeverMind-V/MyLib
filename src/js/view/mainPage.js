function sliderInit() {
  if (!document.querySelector('.js-slider')) {
    return;
  }
  const items = document.getElementsByClassName('js-item');
  const prev = document.getElementsByClassName('js-prev')[0];
  const next = document.getElementsByClassName('js-next')[0];
  const dots = document.querySelectorAll('.js-dots');
  let currentSlide = 0;
  const { length } = items;
  function showSlides(n, slideI, slideD) {
    const slideItems = slideI;
    const slideDots = slideD;
    for (let i = 0; i < items.length; i += 1) {
      slideItems[i].style.display = 'none';
      slideDots[i].classList.remove('active');
    }
    slideItems[n].style.display = 'block';
    slideDots[n].classList.add('active');
  }
  setInterval(() => {
    showSlides(currentSlide, items, dots);
    currentSlide = currentSlide === length - 1 ? 0 : currentSlide + 1;
  }, 4000);

  [prev, next].forEach((item) => {
    item.addEventListener('click', function handler() {
      let state = null;
      if (this.classList.contains('js-prev')) {
        state = currentSlide === 0 ? length - 1 : currentSlide - 1;
      } else {
        state = currentSlide === length - 1 ? 0 : currentSlide + 1;
      }
      currentSlide = state;
      showSlides(currentSlide, items, dots);
    });
  });
  dots.forEach((dot) => {
    dot.addEventListener('click', function handler() {
      dots.forEach(_ => _.classList.remove('active'));
      this.classList.add('active');
      showSlides([].indexOf.call(dots, this), items, dots);
    });
  });

  showSlides(currentSlide, items, dots);
}

function menuBtnToggle() {
  const btn = document.querySelector('.js-menu-btn');
  const item = document.querySelectorAll('.js-menu-item');
  const block = document.querySelector('.js-menu-list');
  btn.addEventListener('click', () => {
    block.classList.toggle('active');
    if (!block.classList.contains('active')) {
      item.forEach((_) => {
        _.classList.remove('active');
      });
    }
  });
  item.forEach((_) => {
    _.addEventListener('click', function handler(e) {
      if (this.classList.contains('multi') && e.target.classList.contains('js-menu-item')) this.classList.toggle('active');
    });
  });
}

export { sliderInit, menuBtnToggle };
