import data from './data.json';
import authors from './author.json';
import { sliderInit, menuBtnToggle } from './view/mainPage';
import contactMenuHandler from './view/contactsForm';
import authorsListInit from './view/authorsList';
import authorsInit from './view/authors';
import authorsPostsInit from './view/authorsPosts';
import showCategory from './view/showCategory';
import contactsIframeHandler from './view/contactsIframe';
import { addCategoryItem } from './view/addCategoryItem';
import galleryDialogHandler from './view/galleryDialog';
import showAll from './view/showAll';
import showPage from './view/showPage';


function storeData() {
  if (localStorage.getItem('data') === null) {
    localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('authors', JSON.stringify(authors));
    localStorage.setItem('storagePath', '../upload/');
  }
}

window.addEventListener('load', () => {
//   localStorage.clear();
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
