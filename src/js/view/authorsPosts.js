import addBlock from './addBlock';
import pagination from './pagination';

function authorsPostsInit() {
    if(window.location.href.indexOf('authors.html') === -1) return;
    let url = new URLSearchParams(window.location.search);
    let id = url.get('id');    
    let container = document.querySelector('.js-posts-container');
    let author = JSON.parse(localStorage.data).filter(item => { return item.authorId == id});
    let postItems;
    addBlock(author,container);
    postItems = document.querySelectorAll('.js-category-item');
    pagination(postItems);
    
    console.log('as',author,id);
}



export default authorsPostsInit;