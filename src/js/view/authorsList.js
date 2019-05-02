import pagination from "./pagination";

function authorsListInit() {
    if(window.location.href.indexOf('authors-list.html') === -1) return;
    let authors = JSON.parse(localStorage.authors);
    let container = document.querySelector('.js-authors-list');
    let authorsItems;
    authors.forEach(item => {
        console.log(item);
        let a = document.createElement('a');
        a.href = `authors.html?id=${item.id}`;
        a.target = '_blank';
        a.className = 'authors-list__item js-author-list-item';
        let img = document.createElement('img');
        img.src = item.thumbnail;
        img.className = 'authors-list__thumb';
        let p = document.createElement('p');
        p.className = 'authors-list__title';
        p.innerText = item.name;
        a.appendChild(img);
        a.appendChild(p);
        container.appendChild(a);
    });
    authorsItems = document.querySelectorAll('.js-author-list-item');
    pagination(authorsItems);
}

export default authorsListInit;