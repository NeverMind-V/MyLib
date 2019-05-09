function addFilter(data) {
  const filterData = data;
  const set = new Set();
  const container = document.querySelector('.js-filter-container');
  const arr = [];
  filterData.forEach((item) => {
    set.add(item.type);
  });
  const h3 = document.createElement('h3');
  h3.className = 'category__title';
  h3.innerHTML = 'Тип материала';
  arr.push(h3);
  set.forEach((item) => {
    const block = document.createElement('div');
    block.className = 'category__filter-block';
    const input = document.createElement('input');
    input.className = 'category__filter-input js-filter-input';
    input.type = 'checkbox';
    input.id = `${item}`;
    const label = document.createElement('label');
    label.className = 'category__filter-label';
    label.htmlFor = `${item}`;
    const span = document.createElement('span');
    span.className = 'category__filter-name';
    switch (item) {
      case 'music':
        span.innerHTML = 'Аудио';
        break;
      case 'file-alt':
        span.innerHTML = 'Текст';
        break;
      case 'video':
        span.innerHTML = 'Видео';
        break;
      default:
        span.innerHTML = item;
    }
    block.appendChild(input);
    block.appendChild(label);
    block.appendChild(span);
    arr.push(block);
  });
  arr.forEach((item) => {
    container.appendChild(item);
  });
}

export default addFilter;
