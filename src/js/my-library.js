import {onRenderFilmCard, filmsCollection} from "./card-template"
import getRefs from "./getRefs"
let watchedFilms = [];
let queue = [];
const refs = getRefs()

refs.myLibraryLink.addEventListener("click", onMyLibrary)
refs.watchedBtn.addEventListener("click", handleWatched);
refs.queueBtn.addEventListener("click", handleQueue);

function onMyLibrary() {
    console.log("Клик по кнопке MyLibrary");
    refs.myLibraryLink.classList.add('site-nav__link--current');
    refs.homeLink.classList.remove('site-nav__link--current');
    refs.form.classList.add('form--is-hidden');
    refs.buttonsBlock.classList.remove('header__block-btn--is-hidden');
    refs.header.classList.add("header--library");
    //  onRenderFilmCard(watchedFilms);
}

function handleWatched() {
    getWatched();
    console.log("Клик на кнопку Watched")
    console.log("Фильмы с Local Storage для рендера", watchedFilms);
refs.watchedBtn.classList.remove('header__btn--white')
    refs.queueBtn.classList.add('header__btn--white');
//   onRenderFilmCard(watchedFilms);
      

}

function handleQueue() {
    getQueue();
    console.log("Клик на кнопку Queue")
    console.log("Фильмы с Local Storage для рендера", queue);
    refs.watchedBtn.classList.add('header__btn--white')
    refs.queueBtn.classList.remove('header__btn--white');

//   onRenderFilmCard(queue);
      

}
function addToWatched() {
    const filmToAdd = {name: "Фантастические твари", id: "113",};//заменить на данные с модалки
    watchedFilms.push(filmToAdd);
    localStorage.setItem("watched-films", JSON.stringify(filmToAdd));
    // onRenderFilmCard(watchedFilms);
    console.log("Просмотреные фильмы");
    console.log(watchedFilms);
   
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
    const filmToAdd = {name: "Доктор Стрэндж", id: "112",};//заменить на данные с модалки
    queue.push(filmToAdd);
    localStorage.setItem("queue-films", JSON.stringify(filmToAdd));
    // onRenderFilmCard(queue);
    console.log("Фильмы в очереди")
       console.log(queue);

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

addToWatched();
addToQueue();
// handleWatched();
// handleQueue()
