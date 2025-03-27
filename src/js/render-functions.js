import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';

  const lightbox = new SimpleLightbox('.gallery a', {
    captionData: 'alt',
    captionDelay: 250,
  });

  
export const renderImages = images => {
  const gallery = refs.gallery;
  const galleryItems = images
    .map(
      image =>
        ` <li class="gallery-item">
  <a class="gallery-link" href="${image.largeImageURL}">
    <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    <div class="image-info">
      <p><strong>Likes</strong> ${image.likes}</p>
      <p><strong>Views</strong> ${image.views}</p>
      <p><strong>Comments</strong> ${image.comments}</p>
      <p><strong>Downloads</strong> ${image.downloads}</p>
    </div>
  </a>
</li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryItems);


  lightbox.refresh();
};