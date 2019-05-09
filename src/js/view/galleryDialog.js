function galleryDialogHandler() {
  const url = window.location.href;
  const dialog = document.querySelector('.js-gallery-dialog');
  const next = document.querySelector('.js-gallery-next');
  const prev = document.querySelector('.js-gallery-prev');
  const controls = [prev, next];
  let target;
  if (url.indexOf('gallery.html') === -1) return;
  document.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('js-gallery-item')) {
      const { src } = e.target;
      target = e.target.parentElement;
      next.style.display = 'block';
      prev.style.display = 'block';
      if (!target.nextElementSibling) {
        next.style.display = 'none';
      } else if (!target.previousElementSibling) {
        prev.style.display = 'none';
      } else {
        next.style.display = 'block';
        prev.style.display = 'block';
      }
      dialog.querySelector('.gallery__dialog-thumb').src = src;
      dialog.querySelector('.gallery__dialog').classList.add('zoomIn');
      document.querySelector('body').classList.add('modal');
      dialog.classList.add('active');
    } else if (e.target.classList.contains('js-gallery-dialog') || e.target.classList.contains('js-gallery-close')) {
      dialog.querySelector('.gallery__dialog').classList.remove('zoomIn');
      dialog.querySelector('.gallery__dialog').classList.add('zoomOut');
      setTimeout(() => {
        dialog.querySelector('.gallery__dialog').classList.remove('zoomOut');
        dialog.classList.remove('active');
        document.querySelector('body').classList.remove('modal');
      }, 400);
    }
  });
  controls.forEach((item) => {
    item.addEventListener('click', function handler() {
      const direction = this === next ? 'nextElementSibling' : 'previousElementSibling';
      const { src } = target[direction].firstChild;
      dialog.querySelector('.gallery__dialog-thumb').src = src;
      target = target[direction];
      if (!target[direction]) {
        this.style.display = 'none';
        return;
      }
      next.style.display = 'block';
      prev.style.display = 'block';
    });
  });
}

export default galleryDialogHandler;
