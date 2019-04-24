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
            showPage(data);
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
    let addFilter = (data) => {
        let set = new Set();
        let container = document.querySelector('.js-filter-container');
        let arr = [];
        data.forEach(item => {
            set.add(item.type);
        });
        let h3 = document.createElement('h3');
        h3.className = 'category__title';
        h3.innerHTML = `Тип материала`;
        arr.push(h3);
        set.forEach(item => {
            let block = document.createElement('div');
            block.className = 'category__filter-block';
            let input = document.createElement('input');
            input.className = 'category__filter-input js-filter-input';
            input.type = 'checkbox';
            input.id = `${item}`;
            let label = document.createElement('label');
            label.className = 'category__filter-label';
            label.htmlFor = `${item}`;
            let span = document.createElement('span');
            span.className = 'category__filter-name';
            switch(item) {
                case 'music':
                    span.innerHTML = 'Аудио';
                    break;
                case 'file-alt':
                    span.innerHTML = 'Текст';
                    break;
                case 'video':
                    span.innerHTML = 'Видео';
                    break;
                default:
                    span.innerHTML = item;                    
            }
            block.appendChild(input);
            block.appendChild(label);
            block.appendChild(span);
            arr.push(block);
        });
        arr.forEach(item => {
            container.appendChild(item);
        });
        
    };
    
    let addBlock = (data) => {
        category.innerHTML = '';
        data.forEach((item) => {
            let block = document.createElement('a');
            block.href = `material-item.html?id=${item.id}`; 
            block.target = '_blank'; 
            block.className = 'category__item js-category-item';  
            block.id = `${item.id}`;        
            let image = document.createElement('img');
            image.src = `${item.thumbnail == 0 ? `../img/${item.type}-thumb.png` : item.thumbnail}`;       
            image.className = 'category__thumb';
            let a = document.createElement('a');
            a.innerHTML = `${item.author}`;
            a.className = 'category__author';
            let text = document.createElement('p');
            text.innerHTML = `${item.name}`;
            text.className = 'category__name';
            block.appendChild(image);
            block.appendChild(a);
            block.appendChild(text);
            category.appendChild(block);
        });
    };

    let sortData = (data) => { 
        let sortData;   
        let sortContainer = document.querySelector('.js-sort');
        if(!sortContainer) return;
        let nameSortAsc = (a,b) => {
            if(a.name > b.name) {
                return 1;
            }
            if(a.name < b.name) {
                return -1;
            }
            return 0;
        };
        let nameSortDesc = (a,b) => {
            if(a.name > b.name) {
                return -1;
            }
            if(a.name < b.name) {
                return 1;
            }
            return 0;
        };
        let nameSortNewFirst = (a,b) => {
            return b.id - a.id;
        };
        let nameSortOldFirst = (a,b) => {
            return a.id - b.id;
        };
        sortContainer.addEventListener('click', function(e) {                  
            if(e.target.classList.contains('js-asc')) {
                sortData = data.sort(nameSortAsc);
            }
            if(e.target.classList.contains('js-desc')) {
                sortData = data.sort(nameSortDesc);
            }
            if(e.target.classList.contains('js-new')) {
                sortData = data.sort(nameSortNewFirst);
            }
            if(e.target.classList.contains('js-old')) {                
                sortData = data.sort(nameSortOldFirst);
            }
            sortData = sortData == undefined ? data : sortData;
            addBlock(sortData);
            pagination();
        });        
    }

    let filterHandler = (data) => {
        let url = new URLSearchParams(window.location.search);
        let filter = url ? [url.get('filter')] : [];
        console.log('filter1',filter,url.get('filter'));
        let filterData;
        let input = document.querySelectorAll('.js-filter-input');

        input.forEach(item => {
            if(item.id == url.get('filter')) {
                item.checked = true;                  
            }
            item.addEventListener('change', function() {
                console.log(this.checked,this.id);
                if(this.checked) {
                    filter.push(this.id);
                } else {
                    if(filter.indexOf(this.id) !== -1) {
                        filter.splice(filter.indexOf(this.id),1);
                    }
                }
                console.log(filter);  
                filterData = data.filter(item => {
                    let state = false;
                    filter.forEach(filterItem => {
                        if(filterItem === item.type) {
                            console.log('sad');
                            state = true;
                        }
                    });
                    return state;
                });
                filterData = filterData.length ? filterData : data;
                addBlock(filterData);
                pagination();               
            });      
        }); 
        filterData = data.filter(item => {
            let state = false;
            filter.forEach(filterItem => {
                if(filterItem === item.type) {
                    console.log('sad');
                    state = true;
                }
            });
            return state;
        });
        console.log('filterdata',filterData);
        filterData = filterData.length ? filterData : data;
        addBlock(filterData);
        pagination(); 
        return filterData; 
    };

    let filterSearch = (filter,data) => {
        let input = document.querySelector('.js-input');
        let form = document.querySelector('.js-search');
        let filterInput = document.querySelectorAll('.js-filter-input');
        let query;
        let filterData;
        console.log('filter',filter,data);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            query = input.value;
            input.value = '';
            filterInput.forEach(item => {
                item.checked = false;
            });
            filterData = data.filter(item => {
                if(query === '' || item.name.toLowerCase().includes(query)) {                    
                    return true;
                }
            });
            console.log('filterData44',filterData);
            addBlock(filterData);
            pagination(); 
        });  
        addBlock(filter);      
    };     
    addFilter(data);
    filterSearch(filterHandler(data),data);
    sortData(data);
    pagination(); 
}

function showPage(data) {     
    let container = document.querySelector('.js-material');
    if(container) {
        let params = new URLSearchParams(window.location.search); 
        let currentData = data.filter( item => {
            return item.id === params.get('id');
        });
        currentData = currentData[0];
        console.log(currentData);
        switch (currentData.type) {
            case 'file-alt':
                container.innerHTML = `
                <section class="material">
                    <div class="material__thumb-wrapper">
                        <img src="${currentData.thumbnail}" alt="thumbnail" class="material__thumb-text">
                    </div>
                    <div class="material__block">
                        <h1 class="material__title">${currentData.name}</h1>
                        <p class="material__desription">${currentData.text}</p>
                    </div>
                </section>`;
                break;
            case 'music':
                container.innerHTML = `
                <section class="material">
                    <figure class="material__audio-figure">
                        <div class="material__thumb-wrapper">
                            <img src="${currentData.thumbnail}" alt="thumbnail" class="material__thumb-audio">
                        </div>                        
                        <figcaption>
                            <h1 class="material__title">${currentData.name}</h1>
                        </figcaption>
                        <audio controls class="material__audio">
                            <source src="${currentData.url}" type="audio/mpeg">
                        </audio>
                    </figure>                    
                </section>`;
                break;
            case 'video':
                container.innerHTML = `
                <section class="material">
                    <figure>
                        <video controls class="material__video">
                            <source src="${currentData.url}" type="audio/mp4">
                        </video>
                        <figcaption>
                            <h1 class="material__title">${currentData.name}</h1>
                        </figcaption>
                    </figure>                    
                </section>`;
                break;            
        }
    }
}

function pagination() {
    let page = 1;
    let blockAmount = 6;
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
            delta = 1,
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
        if(e.target.parentNode.classList.contains('js-pagination-prev')) {
            page = page === 1 ? 1 : page - 1;
        } else if(e.target.parentNode.classList.contains('js-pagination-next')) {
            page = page === pagesAmount ? pagesAmount : page + 1;
        } else if(e.target.parentNode.classList.contains('js-pagination-item')) {
            page = parseInt(e.target.innerHTML);
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

function menuBtnToggle() {
    let btn = document.querySelector('.js-menu-btn');
    let item = document.querySelectorAll('.js-menu-item');
    let block = document.querySelector('.js-menu-list');
    btn.addEventListener('click', function() {
        block.classList.toggle('active');
        if(!block.classList.contains('active')) {
            item.forEach(_ => {
                _.classList.remove('active');
            });
        }
    });
    item.forEach(_ => {
        _.addEventListener('click',function(e) {
            if(this.classList.contains('multi') && e.target.classList.contains('js-menu-item')) this.classList.toggle('active');
        });
    });
}

window.addEventListener('load', function() {
    getRequest('http://5c9915184236560014393204.mockapi.io/mylib/files');
    sliderInit();
    menuBtnToggle();
});