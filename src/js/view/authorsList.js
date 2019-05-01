function authorsListInit() {
    if(window.location.href.indexOf('authors-list.html') === -1) return;
    let authors = JSON.parse(localStorage.authors);
    let container = document.querySelector('.js-authors-list');
    authors.forEach(item => {
        console.log(item);
        let a = document.createElement('a');
        a.href = `authors.html?id=${item.id}`;
        a.target = '_blank';
        a.className = 'authors-list__item';
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
}

export default authorsListInit;