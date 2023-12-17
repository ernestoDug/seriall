
const refs = {
  form: document.querySelector(".js-header__search"),

  input: document.querySelector(".js-header__input"), 

  formButton: document.querySelector(".btn"),

  gallery: document.querySelector(".js-film-list"),

  warning: document.querySelector('.header__warning'),
  inputBtnClear: document.querySelector('.btn-cross'),

};

import axios from 'axios';
import {
  renderPagination,
  IN_MAIN_POPULAR,
  IN_MAIN_SEARCH,
} from './pagination.js';
import { getPopulars, renderFilmCards, galleryRef } from './popular.js';
import { KEY } from './constants';

const BASE_URL = 'https://api.themoviedb.org/3';

export class searchMovieApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async searchMovieFetch(page) {
    const searchMovieParams = new URLSearchParams({
      api_key: KEY,
      language: 'en-US',
      query: `${this.searchQuery}`,
      page: page,
      include_adult: false,
    });

    try {
      const response = await axios.get(
        `${BASE_URL}/search/tv?${searchMovieParams}`
      );

      if (response.status !== 200) {
        throw new Error(response.status);
      }

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}

export const movieApi = new searchMovieApi();
if (!refs.inputBtnClear) {
  return;
}
refs.inputBtnClear.style.display = 'none';
function clearSearch() {
  refs.gallery.innerHTML = '';
}
refs.input.addEventListener('input', onInputClear);
function onInputClear(evt) {
  const inputValue = refs.input.value;

  if (inputValue) {
    refs.inputBtnClear.style.display = 'block';

    refs.inputBtnClear.addEventListener('click', () => {
      refs.inputBtnClear.style.display = 'none';
      refs.input.value = '';
      return;
    });
  }
}
function emptyQueryOrNoResults() {
  refs.warning.insertAdjacentHTML(
    'beforeend',
    `<div class="header__warning-message">Введіть верну назву фільму.</div>`
  );

  setTimeout(() => {
    refs.warning.innerHTML = '';
  }, 4000);

  galleryRef.innerHTML = '';

  getPopulars(1).then(({ page, results, total_pages: pages }) => {
    renderFilmCards(results);
    renderPagination(page, pages, IN_MAIN_POPULAR);
  });
}

refs.form.addEventListener('submit', onSearchClick);

function onSearchClick(evt) {
  evt.preventDefault();
  movieApi.query = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();


  // альетрантива 
    if (!movieApi.query) {
    emptyQueryOrNoResults();
    return;
  }

  movieApi.resetPage();

  movieApi.searchMovieFetch(1).then(data => {
    if (!data) return;
    const { page, total_pages, results } = data;

        if (!total_pages) {
         emptyQueryOrNoResults();
      return;
    }

    clearSearch();


    renderFilmCards(results);

    renderPagination(page, total_pages, IN_MAIN_SEARCH);
  });
}
