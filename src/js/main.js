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
    let page = 1;
    let blockAmount = 9;
    let items = document.querySelectorAll('.js-category-item');  
    let container = document.querySelector('.js-pagination');
    let pagesAmount = Math.ceil(items.length / blockAmount,0);
    let clean = () => {
        items.forEach((item) => {
            item.style.display = 'none';
        });
        for(let i = 0; i < blockAmount; i++) {
            if( i + (page - 1) * blockAmount < items.length) items[i + (page - 1) * blockAmount].style.display = 'flex';
        }
    }      
    let prev = `
    <li class="pagination__item js-pagination-prev">
        <a href="#" class="pagination__link--prev"></a>
    </li>`;
    let next = `
    <li class="pagination__item js-pagination-next">
        <a href="#" class="pagination__link--next"></a>
    </li>`;
    let paginationInit = (c, m) => {
        let current = c,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l,
            output = [];

        container.innerHTML = '';
        for (let i = 1; i <= last; i++) {
            if (i == 1 || i == last || i >= left && i < right) {
                range.push(i);
            }
        }
    
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }
        
        output = rangeWithDots.map((item) => {
            let unit = `
            <li class="pagination__item js-pagination-item">
            ${ item == c 
                ? `<span class="pagination__link active">${item}</span>`
                : `<a href="#" class="pagination__link">${item}</a>`
            }
            </li>`;
            return unit;
        });
        output.unshift(prev);
        output.push(next);
        output.forEach((item) => {
            container.insertAdjacentHTML('beforeend',item);
        });
    }
    container.addEventListener('click', function(e) {
        console.log(e.target.parentNode);
        if(e.target.parentNode.classList.contains('js-pagination-prev')) {
            page = page === 1 ? 1 : page - 1;
            console.log('sa1',page);
        } else if(e.target.parentNode.classList.contains('js-pagination-next')) {
            page = page === pagesAmount ? pagesAmount : page + 1;
            console.log('sa2',page);
        } else if(e.target.parentNode.classList.contains('js-pagination-item')) {
            page = parseInt(e.target.innerHTML);
            console.log('sa3',page);
        }
        clean();
        paginationInit(page,pagesAmount);
    });

    clean();   
    paginationInit(page, pagesAmount); 
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