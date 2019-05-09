import pagination from './pagination';
import addBlock from './addBlock';

function filterSearch(filter, data, category, categoryItemsClass) {
  const input = document.querySelector('.js-input');
  const form = document.querySelector('.js-search');
  const filterInput = document.querySelectorAll('.js-filter-input');
  let query;
  let filterData;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    query = input.value;
    input.value = '';
    filterInput.forEach((_) => {
      const item = _;
      item.checked = false;
    });
    filterData = data.filter((item) => {
      if (query === '' || item.name.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    });
    addBlock(filterData, category);
    pagination(categoryItemsClass);
  });
  addBlock(filter, category);
}

export default filterSearch;
