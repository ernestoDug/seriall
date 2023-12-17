import axios from 'axios';

import { renderPagination, IN_MAIN_POPULAR } from './pagination.js';

import { KEY, MEDIA_TYPE, API } from './constants';

// імпорт файлу сховища та запис в змінну ключа
import * as storageLocal from './local-storage.js';

const FILM_CURRENT_PAGE = 'film-current-page';

// ПАРАМЕТРИ ШЛЯХУ 

const TIME_WINDOW = 'day';
const TRENDING = 'trending';
const GENRES = 'genre/movie/list';
const IMG_PATH = 'https://image.tmdb.org/t/p/';
const SMALL_SIZE = 'w500';

export const NO_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

export let genresList;
// запит на жанри 
getOriginGenres().then(response => {
  // console.log("жанри", response);
  genresList = Array.from(response.genres);
});

// до списку серіалів
export const galleryRef = document.querySelector('.js-film-list');
// до попередження 
const warning = document.querySelector('.header__warning');
// слухач на завантаження
window.addEventListener('load', () => {
  // очищуємо вміст 
  galleryRef.innerHTML = '';

  getPopulars(1)
    .then(({ page, results, total_pages: pages }) => {
      renderFilmCards(results);
      renderPagination(page, pages, IN_MAIN_POPULAR);
    })
    .catch(() => {
      warning.insertAdjacentHTML(
        'beforeend',
        `<div class="header__warning-message">Сталася помилка спробуйте пізніше.</div>`
      );

      setTimeout(() => {
        warning.innerHTML = '';
      }, 5000);
    });
});

// популярні 
export async function getPopulars(page) {
  try {
    // обєкт параметрів 
    const searchParams = new URLSearchParams({
      api_key: KEY,
      page: page,
      include_adult: false,
    });
"https://api.themoviedb.org/3/trending/tv/day?language=en-US"

    const response = await axios.get(
      `${API}${TRENDING}/${MEDIA_TYPE}/${TIME_WINDOW}?${searchParams}`
    );

    if (response.status !== 200) {
      throw new Error(response.status);
    }
      // console.log(555, response.data.results[0].first_air_date);
    return response.data;
  } catch (error) {
    warning.insertAdjacentHTML(
      // 88888888888888
      'beforeend',
      `<div class="header__warning-message">Сталася помилка спробуйте пізніше.</div>`
    );
  }
}
// рендер картки 
export function renderFilmCards(data) {
  let markup = '';
  data.forEach(({ id, poster_path, genre_ids, name, first_air_date }) => {
    let genresStr = getGenres(genre_ids);
    // відрізаємо дату тільки рік 
    let year = !first_air_date ? '' : first_air_date.slice(0, 4);
    if (genresStr && year) genresStr += ' | ';
    if (!name) name = 'Назва відсутня';
    // ***********************
    // console.log(666, first_air_date.substring(0, 4)); 
  


    

// ****************************************************
    let smallImg = !!poster_path
      ? IMG_PATH + SMALL_SIZE + poster_path
      : NO_IMAGE;

    markup += `
      <li class="film-card">
         	<a href="#" class="film-card__link">
            <img
              class="film-card__film-img"
              src="${smallImg}"
              alt="${name}"
              id="${id}"
            />
            <h3 class="film-card__film-name">${name}</h3>
            <p class="film-card__genre">${genresStr}${year}</p>
          </a>
        </li>
							`;
  });

  galleryRef.innerHTML = markup;

  // запис в локальне сховище
  storageLocal.save(FILM_CURRENT_PAGE, [...data]);
  //
}
// жанри 
async function getOriginGenres() {
  try {
    const searchParams = new URLSearchParams({
      api_key: KEY,
    });

    const response = await axios.get(`${API}${GENRES}?${searchParams}`);

    if (response.status !== 200) {
      throw new Error(response.status);
    }

    return response.data;
  } catch (error) {

    // 88888888888888
  }
}

export function getGenres(genreSet) {
  let genreStr = '';

  if (!genreSet) return '';
  genreSet.forEach(id => {
    for (const genre of genresList) {
      if (genre.id === id) genreStr += genre.name + ', ';
    }
  });

  return !genreStr ? '' : genreStr.slice(0, genreStr.length - 2);
}
