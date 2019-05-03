import data from '../js/data.json';
import authors from '../js/author.json';
import {sliderInit, menuBtnToggle} from './view/mainPage';
import contactMenuHandler from './view/contactsForm';
import authorsListInit from './view/authorsList';
import authorsInit from './view/authors';
import authorsPostsInit from './view/authorsPosts';
import addBlock from './view/addBlock';
import contactsIframeHandler from './view/contactsIframe';
import pagination from './view/pagination';
import { addCategoryItem, addMaterial } from './view/addCategoryItem';

function getRequest(url) {
    fetch(url)
    .then((res) => {
        if(res.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
            res.status);
            return;
        }
        return res.json().then(function(data) {
            localStorage.setItem('data',JSON.stringify(data));            
            showAll(JSON.parse(localStorage.data));            
            showCategory(JSON.parse(localStorage.data));
            showPage(JSON.parse(localStorage.data));            
        });
    })
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
function storeData() {
    if(localStorage.getItem('data') === null) {
        localStorage.setItem('data',JSON.stringify(data));
        localStorage.setItem('authors',JSON.stringify(authors));
    }
}

function showAll(data) {
    let storage = document.querySelector('.js-storage');
    if(!storage) return;
    let nameSort = (a,b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        if(a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        return 0;
    };
    let sameArray = [];
    let fullArray = [];
    
    let dataStorage = [...data];

    dataStorage.sort(nameSort).forEach((item,i) => {        
        if(i == 0 || item.name[0].toLowerCase() == dataStorage[i - 1].name[0].toLowerCase()) {
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
            link.href = `material-item.html?id=${value.id}`;
            link.innerHTML = `<i class="fas fa-${value.type} icon"></i>${value.name}`;
            linkBlock.append(link);
        });
        return block;
    }).forEach((item) => storage.appendChild(item));
    
}

function showCategory(data) {
    let category = document.querySelector('.js-category');
    if(!category) return;
    let categoryItemsClass = '.js-category-item';  
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

    let sortData = (data) => { 
        let sortData;   
        let sortContainer = document.querySelector('.js-sort');
        let filterInput = document.querySelectorAll('.js-filter-input');
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
            // categoryItems = document.querySelectorAll('.js-category-item');
            addBlock(sortData,category);
            pagination(categoryItemsClass);
        });        
    }

    let filterHandler = (data) => {
        let url = new URLSearchParams(window.location.search);
        let filter = url ? [url.get('filter')] : [];
        console.log('filter1',filter,url.get('filter'));
        let filterData;
        let input = document.querySelectorAll('.js-filter-input');
        // categoryItems = document.querySelectorAll('.js-category-item');
        input.forEach(item => {
            if(item.id == url.get('filter')) {
                item.checked = true;                  
            }
            item.addEventListener('change', function() {
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
                            state = true;
                        }
                    });
                    return state;
                });
                filterData = filterData.length ? filterData : data;
                // categoryItems = document.querySelectorAll('.js-category-item');
                addBlock(filterData,category);
                pagination(categoryItemsClass);               
            });      
        }); 
        filterData = data.filter(item => {
            let state = false;
            filter.forEach(filterItem => {
                if(filterItem === item.type) {
                    state = true;
                }
            });
            return state;
        });
        console.log('filterdata',filterData);
        filterData = filterData.length ? filterData : data;
        addBlock(filterData,category);
        // categoryItems = document.querySelectorAll('.js-category-item');
        pagination(categoryItemsClass); 
        return filterData; 
    };

    let filterSearch = (filter,data) => {
        let input = document.querySelector('.js-input');
        let form = document.querySelector('.js-search');
        let filterInput = document.querySelectorAll('.js-filter-input');
        let query;
        let filterData;
        // categoryItems = document.querySelectorAll('.js-category-item');
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
            addBlock(filterData,category);
            pagination(categoryItemsClass); 
        });  
        addBlock(filter,category);      
    };     
    addFilter(data);
    filterSearch(filterHandler(data),data);
    sortData(data);
    // categoryItems = document.querySelectorAll('.js-category-item');
    pagination(categoryItemsClass); 
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
                        <p class="material__desription">${currentData.description}</p>
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

function galleryDialogHandler() {
    let url = window.location.href;
    let dialog = document.querySelector('.js-gallery-dialog');
    if(url.indexOf('gallery.html') === -1) return;
    document.addEventListener('click',function(e) {
        if(e.target.classList.contains('js-gallery-img')) {
            let src = e.target.src;
            dialog.querySelector('.gallery__dialog-thumb').src = src;
            dialog.querySelector('.gallery__dialog').classList.add('zoomIn');
            document.querySelector('body').classList.add('modal');
            dialog.classList.add('active');
        } else if(e.target.classList.contains('js-gallery-dialog') || e.target.classList.contains('js-gallery-close')) {
            dialog.querySelector('.gallery__dialog').classList.remove('zoomIn');
            dialog.querySelector('.gallery__dialog').classList.add('zoomOut');
            setTimeout(function() {
                dialog.querySelector('.gallery__dialog').classList.remove('zoomOut');
                dialog.classList.remove('active');
                document.querySelector('body').classList.remove('modal');
            },400);
        }      
    });
}

window.addEventListener('load', function() {
    // getRequest('http://5c9915184236560014393204.mockapi.io/mylib/files');
    // localStorage.clear();
    storeData();
    showAll(JSON.parse(localStorage.data));            
    showCategory(JSON.parse(localStorage.data));
    showPage(JSON.parse(localStorage.data));   
    sliderInit();
    menuBtnToggle();
    addCategoryItem();
    contactMenuHandler();
    galleryDialogHandler();
    authorsListInit();
    authorsInit();
    authorsPostsInit();
    contactsIframeHandler();
});