
import $ from "jquery";

import { renderFilmCards, getPopulars } from './popular.js';
import { movieApi } from './film-search.js';



window.addEventListener('load',
$(window).on("load", function() {
 $(".loader_inner").fadeOut();
 $(".loader").delay(400).fadeOut("slow");
}));

const pagMainRef = document.querySelector('.js-pagination');

let currentNow = 1;
let currentRef = pagMainRef;
let currentPage = 1;

export const IN_MAIN_POPULAR = 1;
export const IN_MAIN_SEARCH = 2;
export const IN_LIBRARY = 0;

const LEFT_ARROW = '&#8592;';
const RIGHT_ARROW = '&#8594;';

export function renderPagination(page, pages, now) {
  let prevPage = page - 1;
  let twoPrevPage = page - 2;
  let nextPage = page + 1;
  let twoNextPage = page + 2;
  let markup = '';

  currentRef = now ? pagMainRef : pagLibRef;
  currentNow = now;

  if (!page || page > pages) return;

  if (page > 1)
    markup += `<li class="js-pagination__arrow-left">${LEFT_ARROW}</li>`;

  if (page > 1)
    markup += `<li class="js-pagination__button js-pagination__button-end">1</li>`;

  if (page > 4) markup += `<li class="js-pagination__points">...</li>`;

  if (page > 3)
    markup += `<li class="js-pagination__button">${twoPrevPage}</li>`;

  if (page > 2) markup += `<li class="js-pagination__button">${prevPage}</li>`;

  markup += `<li class="js-pagination__button js-pagination__button-current">${page}</li>`;

  if (page + 1 < pages)
    markup += `<li class="js-pagination__button">${nextPage}</li>`;

  if (page + 2 < pages)
    markup += `<li class="js-pagination__button">${twoNextPage}</li>`;

  if (page + 4 < pages) markup += `<li class="js-pagination__points">...</li>`;

  if (page < pages)
    markup += `<li class="js-pagination__button js-pagination__button-end">${pages}</li>`;

  if (page < pages)
    markup += `<li class="js-pagination__arrow-right">${RIGHT_ARROW}</li>`;


  currentRef.innerHTML = markup;
}

currentRef.addEventListener('click', ({ target }) => {
  if (target.textContent === '...') return;

  if (target.classList.contains('js-pagination__arrow-left')) currentPage -= 1;

  if (target.classList.contains('js-pagination__arrow-right')) currentPage += 1;

  if (target.classList.contains('js-pagination__button'))
    currentPage = Number(target.textContent);



  if (!currentNow) {
    
  } else {
    if (currentNow === 1) {$(window).on("load", function() {
      $(".loader_inner").fadeOut();
      $(".loader").delay(400).fadeOut("slow");
    });
      getPopulars(currentPage).then(({ page, results, total_pages: pages }) => {
        renderFilmCards(results);

        renderPagination(page, pages, currentNow);
        spinnerToggle();

      });
    } else {
      movieApi
        .searchMovieFetch(currentPage)
        .then(({ page, results, total_pages: pages }) => {
          renderFilmCards(results);
          renderPagination(page, pages, currentNow);
        });
    }
  }
});
