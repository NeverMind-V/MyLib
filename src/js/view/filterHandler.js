import pagination from './pagination';
import addBlock from './addBlock';

function filterHandler(data, category, categoryItemsClass) {
  const url = new URLSearchParams(window.location.search);
  const filter = url ? [url.get('filter')] : [];
  let filterData;
  const input = document.querySelectorAll('.js-filter-input');
  input.forEach((_) => {
    const item = _;
    if (item.id === url.get('filter')) {
      item.checked = true;
    }
    item.addEventListener('change', function handler() {
      if (this.checked) {
        filter.push(this.id);
      } else if (filter.indexOf(this.id) !== -1) {
        filter.splice(filter.indexOf(this.id), 1);
      }
      filterData = data.filter((i) => {
        const dataItem = i;
        let state = false;
        filter.forEach((filterItem) => {
          if (filterItem === dataItem.type) {
            state = true;
          }
        });
        return state;
      });
      filterData = filterData.length ? filterData : data;
      addBlock(filterData, category);
      pagination(categoryItemsClass);
    });
  });
  filterData = data.filter((item) => {
    let state = false;
    filter.forEach((filterItem) => {
      if (filterItem === item.type) {
        state = true;
      }
    });
    return state;
  });
  filterData = filterData.length ? filterData : data;
  addBlock(filterData, category);
  pagination(categoryItemsClass);
  return filterData;
}
export default filterHandler;
