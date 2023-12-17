const dataDefault = {
  adult: false,
  backdrop_path: '/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
  genre_ids: [28, 12, 14, 878],
  id: 299536,
  original_language: 'en',
  // original_title: 'original_title',
  original_name: 'original_name',
  overview: "overview",
  poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
  release_date: 'release_date',
  title: 'title',
  // name: 'name',

  video: false,
  vote_average: 5.5,
  vote_count: 2023,
  popularity: 666.999,
};

export const movieGenresIds = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export function getGenre(genre_ids) {
  return genre_ids.map(id => movieGenresIds[id]).join(', ');
}

export default class ModalFilm {
  constructor(selector) {
    this.refs = this.getRefs(selector);
    this.data = dataDefault;
  }

  getRefs(selector) {
    const refs = {};

    refs.body = document.querySelector("body");

    refs.modal = document.querySelector(".js-backdrop");

    refs.modalCloseBtn = document.querySelector(".js-close");

        refs.posterPath = document.querySelector('#film__poster');
    refs.title = document.querySelector('#film__title');
    refs.voteAverage = document.querySelector('#film__vote-average');
    refs.voteCount = document.querySelector('#film__vote-count');
    refs.popularity = document.querySelector('#film__popularity');
    refs.originalTitle = document.querySelector('#film__original-title');
    refs.genre = document.querySelector('#film__genre');
    refs.overview = document.querySelector('#film__overview');
    refs.trailer = document.querySelector('#trailer');
    

    refs.filmIinfoWrapper = document.querySelector('.film__info-wrapper');

    return refs;
  }

  open() {
    this.refs.modal.classList.remove('is-hidden');
    this.refs.body.classList.add('body--modal-open');

  }

  close() {
    this.refs.modal.classList.add('is-hidden');
    this.refs.body.classList.remove('body--modal-open');
  }

  modifyDataFilm(dataImport = dataDefault) {
    this.data = dataImport;

    const {
      poster_path,
      name,
      vote_average,
      vote_count,
      popularity,
      original_name,
      genre_ids,
      overview,
      id,
    } = this.data;

    this.refs.posterPath.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    this.refs.posterPath.alt = `${name}`;
    this.refs.title.textContent = `${name}`;
    this.refs.voteAverage.textContent = `${vote_average}`;
    this.refs.voteCount.textContent = `${vote_count}`;
    this.refs.popularity.textContent = `${popularity}`;
    this.refs.originalTitle.textContent = `${original_name}`;
    this.refs.genre.textContent = `${getGenre(genre_ids)}`;
    this.refs.overview.textContent = `${overview}`;

    if(poster_path===null){ this.refs.posterPath.src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
    if(overview===''){this.refs.overview.textContent='No information'}
  };
    

  get dataFilm() {
    return this.data;
  }

  set dataFilm(newData) {
    this.data = newData;
  }
}
