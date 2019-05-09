import addFilter from './addFilter';
import sortData from './sortData';
import pagination from './pagination';
import filterSearch from './filterSearch';
import filterHandler from './filterHandler';


function showCategory(data) {
  const category = document.querySelector('.js-category');
  if (!category) return;
  const categoryItemsClass = '.js-category-item';


  addFilter(data);
  filterSearch(filterHandler(data, category, categoryItemsClass),
    data, category, categoryItemsClass);
  sortData(data, category, categoryItemsClass);
  pagination(categoryItemsClass);
}

export default showCategory;
