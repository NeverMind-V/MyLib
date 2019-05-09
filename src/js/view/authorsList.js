import pagination from './pagination';

function authorsListInit() {
  if (window.location.href.indexOf('authors-list.html') === -1) return;
  const authors = JSON.parse(localStorage.authors);
  const container = document.querySelector('.js-authors-list');
  authors.forEach((item) => {
    const a = document.createElement('a');
    a.href = `authors.html?id=${item.id}`;
    a.target = '_blank';
    a.className = 'authors-list__item js-author-list-item';
    const img = document.createElement('img');
    img.src = item.thumbnail;
    img.className = 'authors-list__thumb';
    const p = document.createElement('p');
    p.className = 'authors-list__title';
    p.innerText = item.name;
    a.appendChild(img);
    a.appendChild(p);
    container.appendChild(a);
  });
  const authorsItemsClass = '.js-author-list-item';
  pagination(authorsItemsClass);
}

export default authorsListInit;
