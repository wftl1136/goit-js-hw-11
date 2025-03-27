import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api';
import { refs } from './js/refs';
import { renderImages } from './js/render-functions';
import iconError from './img/error.svg';
import { showLoader, hideLoader } from './js/loader';
import { scrollShow, scrollToTop } from './js/scroll-to-top';


let page = 1;
let isLoading = false;
let currentQuery = '';
let totalHits = 0;

/*
refs.form.addEventListener('input', () => {
  const queryInput = refs.inputQuery.value.trim();
  if (queryInput === '') {
    refs.btnSearch.setAttribute('disabled', true);
    refs.inputQuery.value = '';
    iziToast.warning({
      title: 'Caution',
      message: 'Sorry, the input cannot be empty or contain only spaces!',
      position: 'bottomLeft',
      maxWidth: 300,
      timeout: 1500,
    });
  } else {
    refs.btnSearch.removeAttribute('disabled');
  }
});
*/


refs.form.addEventListener('submit', event => {
    event.preventDefault();

  const query = refs.inputQuery.value.trim();
  if (!query) {
     iziToast.warning({
      title: 'Caution',
      message: 'The form cannot be empty! Please check and fill it out.',
      position: 'topRight',
      maxWidth: 300,
     });
      refs.inputQuery.value = '';
      return;
    }
    currentQuery = query;
    page = 1;
    refs.gallery.innerHTML = '';
    loadImages();
    refs.inputQuery.value = '';
});

const loadImages = () => {
  if (isLoading) {
    return;
  }
  isLoading = true;
  showLoader();
  fetchImages(currentQuery, page)
    .then(data => {
      const images = data.hits;
      totalHits = data.totalHits;
      if (images.length === 0) {
        iziToast.error({
          message:
            ' Sorry, there are no images matching your search query.Please try again!',
          messageColor: '#FAFAFB',
          position: 'topRight',
          backgroundColor: '#EF4040',
          borderColor: '#FFBEBE',
          maxWidth: 432,
          class: 'custom-toast',
          position: 'topRight',
          theme: 'dark',
          iconUrl: iconError,
        });
        return;
      } else {
        renderImages(images);
        const totalLoadImages = (page - 1) * 21 + images.length;
        if (totalLoadImages >= totalHits) {
          iziToast.info({
            title: 'End of results',
            message: 'You have reached the end of the search results!',
            position: 'bottomRight',
            backgroundColor: '#ff3d00',
            messageColor: '#FAFAFB',
          });
        }
        page += 1;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      iziToast.error({
        title: 'error',
        message: error.message || 'Something went wrong. Please try again.',
        
      });
    })
    .finally(() => {
      isLoading = false;
      hideLoader();
    });
};
const loadScroll = () => {
    if (isLoading) {
        return;
    }
  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;
  if (scrollPosition >= pageHeight - 350 && (page - 1) * 21 < totalHits) {
    loadImages();
  }
};
window.addEventListener('scroll', loadScroll);

window.addEventListener('scroll', scrollShow);
refs.btnScrollUp.addEventListener('click', scrollToTop);