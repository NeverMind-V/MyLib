import addBlock from './addBlock';
import pagination from './pagination';

function authorsPostsInit() {
    if(window.location.href.indexOf('authors.html') === -1) return;
    let url = new URLSearchParams(window.location.search);
    let id = url.get('id');    
    let container = document.querySelector('.js-posts-container');
    let author = JSON.parse(localStorage.data).filter(item => { return item.authorId == id});
    let postItemsClass;
    addBlock(author,container);
    postItemsClass = '.js-category-item';
    pagination(postItemsClass);
}



export default authorsPostsInit;