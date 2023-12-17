!function(){function e(e){return e&&e.__esModule?e.default:e}var t=document.querySelector('button[data-action="queue"]');function n(){t.classList.add("filter__button--active"),l.classList.remove("filter__button--active");try{var e=localStorage.getItem("QueueMovies");e&&(m(e=JSON.parse(e)),d.classList.add("is-hidden"))}catch(e){console.log(e)}}window.addEventListener("load",(function(){return n()})),t.addEventListener("click",n);var a={};Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var o={};function r(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}Object.defineProperty(o,"__esModule",{value:!0}),o.default=function(e,t,n){t&&r(e.prototype,t);n&&r(e,n);return e};var c={adult:!1,backdrop_path:"/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg",genre_ids:[28,12,14,878],id:299536,original_language:"en",original_name:"original_name",overview:"overview",poster_path:"/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",release_date:"release_date",title:"title",video:!1,vote_average:5.5,vote_count:2023,popularity:666.999},i={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};function s(e){return e.map((function(e){return i[e]})).join(", ")}var u=function(){"use strict";function t(n){e(a)(this,t),this.refs=this.getRefs(n),this.data=c}return e(o)(t,[{key:"getRefs",value:function(e){var t={};return t.body=document.querySelector("body"),t.modal=document.querySelector(".js-backdrop"),t.modalCloseBtn=document.querySelector(".js-close"),t.posterPath=document.querySelector("#film__poster"),t.title=document.querySelector("#film__title"),t.voteAverage=document.querySelector("#film__vote-average"),t.voteCount=document.querySelector("#film__vote-count"),t.popularity=document.querySelector("#film__popularity"),t.originalTitle=document.querySelector("#film__original-title"),t.genre=document.querySelector("#film__genre"),t.overview=document.querySelector("#film__overview"),t.trailer=document.querySelector("#trailer"),t.filmIinfoWrapper=document.querySelector(".film__info-wrapper"),t}},{key:"open",value:function(){this.refs.modal.classList.remove("is-hidden"),this.refs.body.classList.add("body--modal-open")}},{key:"close",value:function(){this.refs.modal.classList.add("is-hidden"),this.refs.body.classList.remove("body--modal-open")}},{key:"modifyDataFilm",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c;this.data=e;var t=this.data,n=t.poster_path,a=t.name,o=t.vote_average,r=t.vote_count,i=t.popularity,u=t.original_name,l=t.genre_ids,d=t.overview;t.id;this.refs.posterPath.src="https://image.tmdb.org/t/p/w500".concat(n),this.refs.posterPath.alt="".concat(a),this.refs.title.textContent="".concat(a),this.refs.voteAverage.textContent="".concat(o),this.refs.voteCount.textContent="".concat(r),this.refs.popularity.textContent="".concat(i),this.refs.originalTitle.textContent="".concat(u),this.refs.genre.textContent="".concat(s(l)),this.refs.overview.textContent="".concat(d),null===n&&(this.refs.posterPath.src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"),""===d&&(this.refs.overview.textContent="No information")}},{key:"dataFilm",get:function(){return this.data},set:function(e){this.data=e}}]),t}(),l=document.querySelector('button[data-action="watched"]'),d=document.querySelector('[data-action="empty"]'),v=document.querySelector('[data-action="list-library"]');function m(e){var t=e.map((function(e){var t=e.id,n=e.poster_path,a=e.genre_ids,o=e.name,r=e.first_air_date,c=s(a),i=null==r?void 0:r.slice(0,4);c&&i&&(c+=" | "),o||(o="Назва відсутня");var u=n?"https://image.tmdb.org/t/p/w500"+n:NO_IMAGE;return'\n      <li class="film-card">\n         \t<a href="#" class="film-card__link">\n            <img\n              class="film-card__film-img"\n              src="'.concat(u,'"\n              alt="').concat(o,'"\n              id="').concat(t,'"\n            />\n            <h3 class="film-card__film-name">').concat(o,'</h3>\n            <p class="film-card__genre">').concat(c).concat(i,"</p>\n          </a>\n        </li>\n\t\t")})).join("");v.innerHTML=t}l.addEventListener("click",(function(){t.classList.remove("filter__button--active"),l.classList.add("filter__button--active");try{var e=localStorage.getItem("WatchedMovies");e&&(m(e=JSON.parse(e)),d.classList.add("is-hidden"))}catch(e){console.log(e)}return}));var f=[];function h(){var e;try{var t=localStorage.getItem("CurrentFilm");e=JSON.parse(t)}catch(e){}return(f=localStorage.getItem("WatchedMovies"))?(f=JSON.parse(f)).find((function(t){return t.id===e.id}))?void 0:(f.push(e),_(f)):((f=[]).push(e),_(f))}function _(e){localStorage.setItem("WatchedMovies",JSON.stringify(e))}var p=[];function g(){var e;try{var t=localStorage.getItem("CurrentFilm");e=JSON.parse(t)}catch(e){}return(p=localStorage.getItem("QueueMovies"))?(p=JSON.parse(p)).find((function(t){return t.id===e.id}))?void 0:(p.push(e),y(p)):((p=[]).push(e),y(p))}function y(e){localStorage.setItem("QueueMovies",JSON.stringify(e))}var b=function(e){try{var t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}},S={gallery:document.querySelector(".js-film-list"),closeBtn:document.querySelector(".js-close"),btnWatched:document.querySelector(".btn_watched"),btnQueue:document.querySelector(".btn_queue"),activLibraryBtn:document.querySelector(".filter__item>.filter__button--active")},w=new u;function L(){w.close(),S.closeBtn.removeEventListener("click",L),window.removeEventListener("keydown",q),window.location.reload()}function q(e){"Escape"===e.code&&(w.close(),S.closeBtn.removeEventListener("click",L),window.removeEventListener("keydown",q))}S.gallery.addEventListener("click",(function(e){if(e.preventDefault(),"IMG"!==e.target.nodeName)return;var t=(n=e.target.id,b("QueueMovies").concat(b("WatchedMovies")).find((function(e){return e.id===Number(n)})));var n;w.modifyDataFilm(t),w.open(),S.btnWatched.addEventListener("click",(function(){S.btnWatched.classList.contains("watched_send")?(S.btnWatched.textContent="ВИДАЛИТИ З ПЕРЕГЛЯДУ",S.btnWatched.classList.replace("watched_send","watched_remove"),h()):S.btnWatched.classList.contains("watched_remove")&&(S.btnWatched.textContent="ДОДАТИ ДО ПЕРЕГЛЯДУ",S.btnWatched.classList.replace("watched_remove","watched_send"),function(e){try{var t=localStorage.getItem("WatchedMovies"),n=JSON.parse(t),a=n.findIndex((function(t){return t.id===e.id}));n.splice(a,1),localStorage.setItem("WatchedMovies",JSON.stringify(n))}catch(e){}}(t));S.btnWatched.textContent="ДОДАТИ ДО ПЕРЕГЛЯДУ",S.btnWatched.classList.replace("watched_remove","watched_send")})),S.btnQueue.addEventListener("click",(function(){S.btnQueue.classList.contains("queue_send")?(S.btnQueue.textContent="ВИДАЛИТИ З ЧЕРГИ",S.btnQueue.classList.replace("queue_send","queue_remove"),g()):S.btnQueue.classList.contains("queue_remove")&&(S.btnQueue.textContent="ДОДАТИ В ЧЕРГУ",S.btnQueue.classList.replace("queue_remove","queue_send"),function(e){try{var t=localStorage.getItem("QueueMovies"),n=JSON.parse(t),a=n.findIndex((function(t){return t.id===e.id}));n.splice(a,1),localStorage.setItem("QueueMovies",JSON.stringify(n))}catch(e){}}(t));S.btnQueue.textContent="ДОДАТИ В ЧЕРГУ",S.btnQueue.classList.replace("queue_remove","queue_send")})),localStorage.setItem("CurrentFilm",JSON.stringify(t)),function(e){try{var t=localStorage.getItem("WatchedMovies");JSON.parse(t).find((function(t){return t.id===e.id}))?(S.btnWatched.classList.replace("watched_send","watched_remove"),S.btnWatched.textContent="REMOVE FROM WATCHED"):(S.btnWatched.classList.replace("watched_remove","watched_send"),S.btnWatched.textContent="ADD TO WATCHED")}catch(e){S.btnWatched.classList.replace("watched_remove","watched_send")}}(t),S.btnWatched.classList.contains("watched_remove")?S.btnWatched.textContent="ВИДАЛИТИ З ПЕРЕГЛЯДУ":S.btnWatched.classList.contains("watched_send")&&(S.btnWatched.textContent="ДОДАТИ ДО ПЕРЕГЛЯДУ");(function(e){try{var t=localStorage.getItem("QueueMovies");JSON.parse(t).find((function(t){return t.id===e.id}))?(S.btnQueue.classList.replace("queue_send","queue_remove"),S.btnQueue.textContent="REMOVE FROM QUEUE"):(S.btnQueue.classList.replace("queue_remove","queue_send"),S.btnQueue.textContent="ADD TO QUEUE")}catch(e){S.btnQueue.classList.replace("queue_remove","queue_send")}})(t),S.btnQueue.classList.contains("queue_remove")?S.btnQueue.textContent="REMOVE FROM QUEUE":S.btnWatched.classList.contains("queue_send")&&(S.btnQueue.textContent="ДОДАТИ В ЧЕРГУ");S.closeBtn.addEventListener("click",L),window.addEventListener("keydown",q)})),S.closeBtn.addEventListener("click",L),window.addEventListener("keydown",q),document.addEventListener("click",(function(e){!e.target.closest(".modal")&&e.target.closest(".backdrop")&&L()}))}();
//# sourceMappingURL=library.3371c1ef.js.map