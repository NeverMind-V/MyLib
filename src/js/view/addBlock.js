function addBlock(data, cont) {
  const container = cont;
  container.innerHTML = '';
  data.forEach((item) => {
    const block = `
        <a href="material-item.html?id=${item.id}" target="_blank" class="category__item js-category-item">
            <div class="category__thumb-wrapper">
                <img src="${!item.thumbnail ? `../img/${item.type}-thumb.png` : item.thumbnail}" class="category__thumb">
            </div>
            <div class="category__item-block">${item.name}</div>
        </a>`;
    container.insertAdjacentHTML('beforeend', block);
  });
}

export default addBlock;
