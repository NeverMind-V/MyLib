import addBlock from './addBlock';
import pagination from './pagination';

function authorsPostsInit() {
  if (window.location.href.indexOf('authors.html') === -1) return;
  const url = new URLSearchParams(window.location.search);
  const id = url.get('id');
  const container = document.querySelector('.js-posts-container');
  const author = JSON.parse(localStorage.data).filter(item => item.authorId === id);
  addBlock(author, container);
  const postItemsClass = '.js-category-item';
  pagination(postItemsClass);
}


export default authorsPostsInit;
