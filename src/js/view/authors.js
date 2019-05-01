function authorsInit() {
    if(window.location.href.indexOf('authors.html') === -1) return;
    let url = new URLSearchParams(window.location.search);
    let id = url.get('id');    
    let container = document.querySelector('.js-authors-container');
    let author = JSON.parse(localStorage.authors).filter(item => { return item.id == id});
    let block = `
    <div class="authors__thumb-block">
        <img src="${author[0].thumbnail}" alt="" class="authors__thumb">
    </div>                    
    <div class="authors__desc">
        <h1 class="main__header">${author[0].name}</h1>
        <p class="authors__text">Email: ${author[0].email}</p>
        <p class="authors__text">Информация: ${author[0].info}</p>
    </div>`;
    container.insertAdjacentHTML('beforeend',block);
    console.log('as',author,id);

}

export default authorsInit;