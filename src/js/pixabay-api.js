import axios from 'axios';


axios.defaults.baseURL = 'https://pixabay.com/api/';
const myApiKey = '49272526-e1b2de60044cea6af49c76424';

export const fetchImages = (query, page = 1) => {
  return axios
    .get('', {
      params: {
        key: myApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 21,
        page: page,
      },
    })
    .then(response => {
      return response.data;
    })

    .catch(error => {
      console.error('Error fetchImages:', error);
      throw error;
    });
};