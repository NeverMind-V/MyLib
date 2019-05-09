function showAll(data) {
  const storage = document.querySelector('.js-storage');
  if (!storage) return;
  const nameSort = (a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    return 0;
  };
  let sameArray = [];
  const fullArray = [];

  const dataStorage = [...data];

  dataStorage.sort(nameSort).forEach((item, i) => {
    if (i === 0 || item.name[0].toLowerCase() === dataStorage[i - 1].name[0].toLowerCase()) {
      sameArray.push(item);
    } else {
      fullArray.push(sameArray);
      sameArray = [];
      sameArray.push(item);
    }
    if (i === dataStorage.length - 1) {
      fullArray.push(sameArray);
    }
  });

  fullArray.map((item) => {
    const block = document.createElement('div');
    block.className = 'main__letter';
    block.id = `${item.id}`;
    const header = document.createElement('h3');
    header.className = 'main__header--underlined';
    [header.innerHTML] = item[0].name;
    console.log(header.innerHTML);
    const linkBlock = document.createElement('div');
    linkBlock.className = 'main__letter-inner';
    block.appendChild(header);
    block.appendChild(linkBlock);
    item.forEach((value) => {
      const link = document.createElement('a');
      link.className = 'main__link';
      link.href = '#';
      link.href = `material-item.html?id=${value.id}`;
      link.innerHTML = `<i class="fas fa-${value.type} icon"></i>${value.name}`;
      linkBlock.append(link);
    });
    return block;
  }).forEach(item => storage.appendChild(item));
}

export default showAll;
