import {onRenderFilmCard, filmsCollection} from "./card-template"
import getRefs from "./getRefs"
import {fetcData} from "./card-modal"
let watchedFilms = [];
let queue = [];
let filmToAdd = {}
const refs = getRefs()
// console.log(fetcData)

refs.myLibraryLink.addEventListener("click", onMyLibrary)

refs.addToWatchedBtn.addEventListener("click", addToWatched)
refs.addToQueueBtn.addEventListener("click", addToQueue)



function onMyLibrary() {
    console.log("Клик по кнопке MyLibrary");
   
    refs.myLibraryLink.classList.add('site-nav__link--current');
    refs.homeLink.classList.remove('site-nav__link--current');
    refs.form.classList.add('form--is-hidden');
    refs.buttonsBlock.classList.remove('header__block-btn--is-hidden');
    refs.header.classList.add("header--library");

     refs.watchedBtn.addEventListener("click", handleWatched);
refs.queueBtn.addEventListener("click", handleQueue);
    if (watchedFilms) {
             refs.ul.innerHTML = "";
  onRenderFilmCard(watchedFilms);

    }
    // console.log(fetcData)

}

function handleWatched() {
    
    console.log("Клик на кнопку Watched")
    console.log("Фильмы с Local Storage для рендера", JSON.parse(localStorage.getItem("watched-films")));
refs.watchedBtn.classList.add('header__btn--active')
    refs.queueBtn.classList.remove('header__btn--active');
    // console.log(watchedFilms);
    // getWatched();
    refs.ul.innerHTML = "";
  onRenderFilmCard(watchedFilms);
      

}

function handleQueue() {
    getQueue();
    console.log("Клик на кнопку Queue")
    console.log("Фильмы с Local Storage для рендера", queue);
   refs.watchedBtn.classList.remove('header__btn--active')
    refs.queueBtn.classList.add('header__btn--active');
        refs.ul.innerHTML = "";

  onRenderFilmCard(queue);
      

}
function addToWatched() {
    filmToAdd = fetcData;//заменить на данные с модалки
    //  console.log(filmToAdd);
    console.log(watchedFilms);
    watchedFilms.push(filmToAdd);
    localStorage.setItem("watched-films", JSON.stringify(watchedFilms));
    // onRenderFilmCard(watchedFilms);
    // console.log("Просмотреные фильмы");
    // console.log(watchedFilms);
   
}

function getWatched() {
    try {
         if (localStorage.getItem("watched-films")) {
             watchedFilms = JSON.parse(localStorage.getItem("watched-films"));
    }
    } catch (error) {
        console.log(error);
        watchedFilms = [];
    }
   
}

function addToQueue() {
    filmToAdd = fetcData;
    console.log(queue);
    queue.push(filmToAdd);
    localStorage.setItem("queue-films", JSON.stringify(queue));

}

function getQueue() {
    try {
         if (localStorage.getItem("queue-films")) {
             queue = JSON.parse(localStorage.getItem("queue-films"));
    }
    } catch (error) {
        console.log(error);
        queue = [];
    }
   
}

getWatched()
getQueue()
// addToQueue();
// handleWatched();
// handleQueue()


// function onRenderFilmCard(films) {
//      console.log("Масив для рендера",films);  
//     const markup = films.map(({poster_path, original_title, vote_average, first_air_date, id}) => 
//         `
//         <a class="film-link">
//         <li class="film-card">
//         <img class="film-img" src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="" id='${id}'/>
//         <div class="film-description">
//         <p class="film-name">${original_title}</p>
//         <span class="film-genre">${vote_average} |</span>
//         <span class="film-year_of_issue">${first_air_date}</span>
//         </div>
//         </li>
//         </a>        
//         `
//     ).join("");
    
//     refs.ul.insertAdjacentHTML("beforeend", markup);
// }