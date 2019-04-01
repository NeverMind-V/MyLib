//
// global libs

function getRequest(url) {
    fetch(url)
    .then((res) => {
        if(res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            res.status);
            return;
        }
        return res.json().then(function(data) {
            showAll(data);
            showCategory(data);
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}

function showAll(data) {
    let storage = document.querySelector('.js-storage');
    if(!storage) return;
    let nameSort = (a,b) => {
        if(a.name > b.name) {
            return 1;
        }
        if(a.name < b.name) {
            return -1;
        }
        return 0;
    };
    let sameArray = [];
    let fullArray = [];
    
    let dataStorage = [...data];

    dataStorage.sort(nameSort).forEach((item,i) => {        
        if(i == 0 || item.name[0] == dataStorage[i - 1].name[0]) {
            sameArray.push(item);            
        } else {
            fullArray.push(sameArray);
            sameArray = [];
            sameArray.push(item);
            if( i == dataStorage.length - 1) {
                fullArray.push(sameArray);
            }
        }
        if( i == dataStorage.length - 1) {
            fullArray.push(sameArray);
        }  
    });

    fullArray.map((item) => {
        let block = document.createElement('div');
        block.className = 'main__letter';
        block.id = `${item.id}`;  
        let header = document.createElement('h3');        
        header.className = 'main__header--underlined';
        header.innerHTML = item[0].name[0];
        let linkBlock = document.createElement('div');
        linkBlock.className = 'main__letter-inner';
        block.appendChild(header);
        block.appendChild(linkBlock);
        item.forEach(value => {
            let link = document.createElement('a');
            link.className = 'main__link';
            link.href = '#';
            link.innerHTML = `<i class="fas fa-${value.type} icon"></i>${value.name}`;
            linkBlock.append(link);
        });
        return block;
    }).forEach((item) => storage.appendChild(item));
    
}

function showCategory(data) {    
    let category = document.querySelector('.js-category');
    if(!category) return;
    data.forEach((item) => {
        let block = document.createElement('a');
        block.href = '#';  
        block.className = 'category__item js-category-item';  
        block.id = `${item.id}`;        
        let image = document.createElement('img');
        image.src = `${item.thumbnail == 0 ? `../img/${item.type}-thumb.png` : item.thumbnail}`;       
        image.className = 'category__thumb';
        let text = document.createElement('p');
        text.innerHTML = `${item.name}`;
        text.className = 'category__name';
        block.appendChild(image);
        block.appendChild(text);
        category.appendChild(block);
    });
    pagination();    
}

function pagination() {
    let page = 0;
    let blockAmount = 6;
    let items = document.querySelectorAll('.js-category-item');  
    let pagesAmount = Math.round(items.length / 6,0) - 1;
    let clean = () => {
        items.forEach((item) => {
            item.style.display = 'none';
        });
        for(let i = 0; i < blockAmount; i++) {
            if( i + page * blockAmount < items.length) items[i + page * blockAmount].style.display = 'flex';
        }
    }
    let paginationInit = () => {
        let paginationItems = 6;
        let container = document.querySelector('.js-pagination');
        container.innerHTML = '';
        let prev = document.createElement('li');
        prev.className = 'pagination__item js-pagination-prev';
        prev.innerHTML = `<a href="#" class="pagination__link--prev"></a>`;
        let next = document.createElement('li');
        next.innerHTML = `<a href="#" class="pagination__link--next"></a>`;
        next.className = 'pagination__item js-pagination-next';
        container.appendChild(prev);
        for(let i = 0; i <= pagesAmount; i++) {
            if(pagesAmount <= paginationItems) {
                let item = `
                <li class="pagination__item">
                ${ i == page 
                    ? `<span class="pagination__link active">${i + 1}</span>`
                    : `<a href="#" class="pagination__link">${i + 1}</a>`
                }
                </li>`;
                container.insertAdjacentHTML('beforeend',item);
            } else {

                // let item = `
                // <li class="pagination__item">
                // ${ i == page 
                //     ? `<span class="pagination__link active">${i + 1}</span>`
                //     : `<a href="#" class="pagination__link">${i + 1}</a>`
                // }
                // </li>`;
            }
        }
        container.appendChild(next);
        [prev,next].forEach((item) => {
            item.addEventListener('click',function() {
                if(this.classList.contains('js-pagination-prev')) {
                    page = page === 0 ? 0 : page - 1;
                } else {
                    page = page === pagesAmount ? pagesAmount : page + 1;
                }
                clean();
                paginationInit();
            });
        });
    }
    clean();   
    paginationInit(); 
}

function sliderInit() {    
    if(!document.querySelector('.js-slider')) {
        return;
    }
    let items = document.getElementsByClassName('js-item');
    let prev = document.getElementsByClassName('js-prev')[0];
    let next = document.getElementsByClassName('js-next')[0];
    let dots = document.querySelectorAll('.js-dots');  
    let currentSlide = 0;  
    let length = items.length;  
    setInterval(function() {
        showSlides(currentSlide,items,dots);
        currentSlide = currentSlide === length - 1 ? 0 : currentSlide + 1;
    }, 4000); 
    function showSlides(n,items,dots) {
        for(let i = 0; i < items.length; i++) {
            items[i].style.display = 'none';
            dots[i].classList.remove('active');
        }
        items[n].style.display = 'block';
        dots[n].classList.add('active');
    }
    [prev,next].forEach(function(item) {
        item.addEventListener('click',function() {
            let state = this.classList.contains('js-prev') ? (currentSlide === 0 ? length - 1 : currentSlide - 1) : (currentSlide === length - 1 ? 0 : currentSlide + 1);
            currentSlide = state;
            showSlides(currentSlide,items,dots);
        });
    });
    dots.forEach(function(dot) {
        dot.addEventListener('click',function() {
            dots.forEach( _ => _.classList.remove('active'));
            this.classList.add('active');
            showSlides([].indexOf.call(dots,this),items,dots);
        });
    });

    showSlides(currentSlide,items,dots);
}

window.addEventListener('load', function() {
    getRequest('http://5c9915184236560014393204.mockapi.io/mylib/files');
    sliderInit();
});