import addBlock from './addBlock';
import pagination from './pagination';

function sortData(data, category, categoryItemsClass) {
  let sortDataStorage = null;
  const sortContainer = document.querySelector('.js-sort');
  const filterInput = document.querySelectorAll('.js-filter-input');
  if (!sortContainer) return;
  const nameSortAsc = (a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  };
  const nameSortDesc = (a, b) => {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return 1;
    }
    return 0;
  };
  const nameSortNewFirst = (a, b) => b.id - a.id;
  const nameSortOldFirst = (a, b) => a.id - b.id;
  sortContainer.addEventListener('click', (e) => {
    filterInput.forEach((_) => {
      const item = _;
      item.checked = false;
    });
    if (e.target.classList.contains('js-asc')) {
      sortDataStorage = data.sort(nameSortAsc);
    }
    if (e.target.classList.contains('js-desc')) {
      sortDataStorage = data.sort(nameSortDesc);
    }
    if (e.target.classList.contains('js-new')) {
      sortDataStorage = data.sort(nameSortNewFirst);
    }
    if (e.target.classList.contains('js-old')) {
      sortDataStorage = data.sort(nameSortOldFirst);
    }
    sortDataStorage = sortDataStorage === null ? data : sortDataStorage;
    addBlock(sortDataStorage, category);
    pagination(categoryItemsClass);
  });
}

export default sortData;
