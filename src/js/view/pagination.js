function pagination(className) {
  let page = 1;
  const blockAmount = 6;
  const container = document.querySelector('.js-pagination');
  const items = document.querySelectorAll(className);
  const pagesAmount = Math.ceil(items.length / blockAmount, 0);
  const clean = () => {
    items.forEach((_) => {
      const item = _;
      item.style.display = 'none';
    });
    for (let i = 0; i < blockAmount; i += 1) {
      if (i + (page - 1) * blockAmount < items.length) items[i + (page - 1) * blockAmount].style.display = 'block';
    }
  };
  const prev = `
    <li class="pagination__item js-pagination-prev">
        <a href="#!" class="pagination__link--prev"></a>
    </li>`;
  const next = `
    <li class="pagination__item js-pagination-next">
        <a href="#!" class="pagination__link--next"></a>
    </li>`;
  const paginationInit = (c, m) => {
    const current = c;
    const last = m;
    const delta = 1;
    const left = current - delta;
    const right = current + delta + 1;
    const range = [];
    const rangeWithDots = [];
    let l;
    let output = [];

    container.innerHTML = '';
    for (let i = 1; i <= last; i += 1) {
      if (i === 1 || i === last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    output = rangeWithDots.map((item) => {
      const unit = `
            <li class="pagination__item js-pagination-item">
            ${item === c
    ? `<span class="pagination__link active">${item}</span>`
    : `<a href="#!" class="pagination__link">${item}</a>`
}
            </li>`;
      return unit;
    });
    output.unshift(prev);
    output.push(next);
    output.forEach((item) => {
      container.insertAdjacentHTML('beforeend', item);
    });
  };
  container.addEventListener('click', (e) => {
    if (e.target.parentNode.classList.contains('js-pagination-prev')) {
      page = page === 1 ? 1 : page - 1;
    } else if (e.target.parentNode.classList.contains('js-pagination-next')) {
      page = page === pagesAmount ? pagesAmount : page + 1;
    } else if (e.target.parentNode.classList.contains('js-pagination-item')) {
      if (e.target.innerHTML === '...') return;
      page = parseInt(e.target.innerHTML, 10);
    }
    clean();
    paginationInit(page, pagesAmount);
  });

  clean();
  paginationInit(page, pagesAmount);
}

export default pagination;
