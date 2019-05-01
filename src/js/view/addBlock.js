function addBlock(data,container) {
    container.innerHTML = '';
    data.forEach((item) => {
        let block = document.createElement('a');
        block.href = `material-item.html?id=${item.id}`; 
        block.target = '_blank'; 
        block.className = 'category__item js-category-item';  
        block.id = `${item.id}`;        
        let image = document.createElement('img');
        image.src = `${item.thumbnail == 0 ? `../img/${item.type}-thumb.png` : item.thumbnail}`;       
        image.className = 'category__thumb';
        // let a = document.createElement('a');
        // a.innerHTML = `${item.author}`;
        // a.className = 'category__author';
        let text = document.createElement('p');
        text.innerHTML = `${item.name}`;
        text.className = 'category__name';
        block.appendChild(image);
        // block.appendChild(a);
        block.appendChild(text);
        container.appendChild(block);
    });
};

export default addBlock;