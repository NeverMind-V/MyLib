function pagination(className) {
    let page = 1;
    let blockAmount = 6;
    let container = document.querySelector('.js-pagination');
    let items = document.querySelectorAll(className);
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
        <a href="#!" class="pagination__link--prev"></a>
    </li>`;
    let next = `
    <li class="pagination__item js-pagination-next">
        <a href="#!" class="pagination__link--next"></a>
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
                : `<a href="#!" class="pagination__link">${item}</a>`
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
            if(e.target.innerHTML === '...') return;
            page = parseInt(e.target.innerHTML);
        }
        clean();
        paginationInit(page,pagesAmount);
    });

    clean();   
    paginationInit(page, pagesAmount); 
}

export default pagination;