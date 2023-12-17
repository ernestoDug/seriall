import * as storageLocal from './local-storage.js';
import ModalFilm from './modal-film.js';

import { sendWatchedToStorage, sendQueueToStorage} from "./local-storage-set.js";
const refs = {
  gallery: document.querySelector('.js-film-list'),
  closeBtn: document.querySelector(".js-close"),
  btnWatched: document.querySelector(".btn_watched"),
  btnQueue: document.querySelector(".btn_queue"),
};

const modalFilm = new ModalFilm();

refs.gallery.addEventListener('click', onOpenModal);
refs.closeBtn.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc);  

function onOverlayClose(event) {
  if (!event.target.closest(".modal") && event.target.closest('.backdrop')) {
      onCloseModal();
  }
}
document.addEventListener("click", onOverlayClose)

function onOpenModal(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') return;

  const dataCurentFilm = getFilmData(e.target.id);

  modalFilm.modifyDataFilm(dataCurentFilm);
  modalFilm.open();

  refs.btnWatched.addEventListener("click", onWatchedBtnClick)
  refs.btnQueue.addEventListener("click", onQueueBtnClick)

  localStorage.setItem("CurrentFilm", JSON.stringify(dataCurentFilm))
  
  checkWatchedStorage(dataCurentFilm)
  if (refs.btnWatched.classList.contains("watched_remove")) {
    refs.btnWatched.textContent = 'ВИДАЛИТИ З ПЕРЕГЛЯДУ'} 
  else if(refs.btnWatched.classList.contains("watched_send")){
    refs.btnWatched.textContent = 'ДОДАТИ ДО ПЕРЕГЛЯДУ'
  }

  checkQueueStorage(dataCurentFilm)
  if (refs.btnQueue.classList.contains("queue_remove")) {
      refs.btnQueue.textContent = 'ВИДАЛИТИ З ЧЕРГИ'}
  else if (refs.btnWatched.classList.contains("queue_send")){
    refs.btnQueue.textContent = 'ДОДАТИ ДО ЧЕРГИ'
  }
    
  function onWatchedBtnClick() {
    if (refs.btnWatched.classList.contains("watched_send")) {
      refs.btnWatched.textContent = 'ВИДАЛИТИ З ПЕРЕГЛЯДУ'
      refs.btnWatched.classList.replace("watched_send", "watched_remove")

      sendWatchedToStorage()

    } else if (refs.btnWatched.classList.contains("watched_remove")) {
      refs.btnWatched.textContent = 'ДОДАТИ ДО ПЕРЕГЛЯДУ'  
      refs.btnWatched.classList.replace("watched_remove", "watched_send")

      removeWatchedFilm(dataCurentFilm)
    }
      
    refs.btnWatched.textContent = 'ДОДАТИ ДО ПЕРЕГЛЯДУ' 
    refs.btnWatched.classList.replace("watched_remove", "watched_send")  
  }
 
  function removeWatchedFilm(currentFilm) {
      try {
        const getWatchedFromStorage = localStorage.getItem("WatchedMovies")
        const getWatchedArray = JSON.parse(getWatchedFromStorage)

        const watchedFilmIndex = getWatchedArray.findIndex(value => value.id === currentFilm.id);
        getWatchedArray.splice(watchedFilmIndex, 1)
        localStorage.setItem("WatchedMovies", JSON.stringify(getWatchedArray))
      } catch (error) {
    }
}
  
  function onQueueBtnClick() {
    if (refs.btnQueue.classList.contains("queue_send")) {
      refs.btnQueue.textContent = 'ВИДАЛИТИ З ЧЕРГИ'
      refs.btnQueue.classList.replace("queue_send", "queue_remove")

      sendQueueToStorage()
    } else if (refs.btnQueue.classList.contains("queue_remove")) {
      refs.btnQueue.textContent = 'ДОДАТИ ДО ЧЕРГИ'  
      refs.btnQueue.classList.replace("queue_remove", "queue_send")

      removeQueueFilm(dataCurentFilm)
    }

    refs.btnQueue.textContent = 'ДОДАТИ ДО ЧЕРГИ'  
    refs.btnQueue.classList.replace("queue_remove", "queue_send")
  }

  function removeQueueFilm(currentFilm) {
      try {
        const getQueueFromStorage = localStorage.getItem("QueueMovies")
        const getQueueArray = JSON.parse(getQueueFromStorage)

        const queueFilmIndex = getQueueArray.findIndex(value => value.id === currentFilm.id);
        getQueueArray.splice(queueFilmIndex, 1)
        localStorage.setItem("QueueMovies", JSON.stringify(getQueueArray))

    } catch (error) {
    }
  }

  refs.closeBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onCloseModalEsc);
}

function onCloseModal() {
 
  modalFilm.close();
  refs.closeBtn.removeEventListener('click', onCloseModal);
  window.removeEventListener('keydown', onCloseModalEsc);
 
}

function onCloseModalEsc(e) {
  if (e.code === 'Escape') {
    modalFilm.close();

    refs.closeBtn.removeEventListener('click', onCloseModal);
    window.removeEventListener('keydown', onCloseModalEsc);
  }
}

function getFilmData(filmId) {
  const filmList = storageLocal.load('film-current-page');
  return filmList.find(film => film.id === Number(filmId));
}


function checkWatchedStorage(currentFilm) {
  try {
    const getWatchedFromStorage = localStorage.getItem("WatchedMovies")
    const getWatchedArray = JSON.parse(getWatchedFromStorage)
    const checkWatchedStorage = getWatchedArray.find(option => option.id === currentFilm.id);
        if (checkWatchedStorage) {
          refs.btnWatched.classList.replace("watched_send", "watched_remove")
          refs.btnWatched.textContent = 'ВИДАЛИТИ З ПЕРЕГЛЯДУ'
        } else {
          refs.btnWatched.classList.replace("watched_remove", "watched_send")
          refs.btnWatched.textContent = 'ДОДАТИ ДО ПЕРЕГЛЯДУ'
        }
    } catch (error) {
      refs.btnWatched.classList.replace("watched_remove", "watched_send")
    }
}

function checkQueueStorage(currentFilm) {
  try {
    const getQueueFromStorage = localStorage.getItem("QueueMovies")
    const getQueueArray = JSON.parse(getQueueFromStorage)
    const checkQueueStorage = getQueueArray.find(option => option.id === currentFilm.id);
        if (checkQueueStorage) {
          refs.btnQueue.classList.replace("queue_send", "queue_remove")
          refs.btnQueue.textContent = 'ВИДАЛИТИ З ЧЕРГИ'
        } else {
          refs.btnQueue.classList.replace("queue_remove", "queue_send")
          refs.btnQueue.textContent = 'ДОДАТИ ДО ЧЕРГИ'
        }
    } catch (error) {
      refs.btnQueue.classList.replace("queue_remove", "queue_send")
    }
}