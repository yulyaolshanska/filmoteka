// import {onRenderFilmCard, filmsCollection} from "./card-template";
import listOfCards from '../templates/poster.hbs';
import getRefs from "./getRefs"
import { fetcData } from "./card-modal";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let watchedFilms = [];
let queue = [];
let filmToAdd = {}
const refs = getRefs()


refs.myLibraryLink.addEventListener("click", onMyLibrary)

function onMyLibrary() {
    refs.myLibraryLink.classList.add('site-nav__link--current');
    refs.homeLink.classList.remove('site-nav__link--current');
    refs.form.classList.add('form--is-hidden');
    refs.buttonsBlock.classList.remove('header__block-btn--is-hidden');
    refs.header.classList.add("header--library");

     refs.watchedBtn.addEventListener("click", handleWatched);
     refs.queueBtn.addEventListener("click", handleQueue);
    if (watchedFilms) {
        refs.ul.innerHTML = "";
        refs.watchedBtn.classList.add('header__btn--active')
        refs.queueBtn.classList.remove('header__btn--active');
        renderFilmCard(watchedFilms);
    }
}

function handleWatched() {
    refs.watchedBtn.classList.add('header__btn--active')
    refs.queueBtn.classList.remove('header__btn--active');
    refs.ul.innerHTML = "";
    renderFilmCard(watchedFilms);
}

function handleQueue() {
   refs.queueBtn.classList.add('header__btn--active')
    refs.watchedBtn.classList.remove('header__btn--active');
    refs.ul.innerHTML = "";
    if (queue) {
     renderFilmCard(queue);
    }
}

export function addToWatched() {
    filmToAdd = fetcData; 
    if (watchedFilms.find(films => filmToAdd.id === films.id)) {
        Notify.warning('You have already added this movie to Watched',
  {
    timeout: 3000,
  });
        return
    }
    watchedFilms.push(filmToAdd);
    localStorage.setItem("watched-films", JSON.stringify(watchedFilms)); 
    // if (watchedFilms.map(films => filmToAdd.id === films.id)) {
    //      refs.addToWatchedBtn.textContent = "Added to Watched";
    // refs.addToWatchedBtn.classList.add("modal__btn--added-btn")
    // }
   
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

export function addToQueue() {
    filmToAdd = fetcData;
     if (queue.find(films => filmToAdd.id === films.id)) {
        Notify.warning('You have already added this movie to Queue',
  {
    timeout: 3000,
  });
        return
    }
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


function renderFilmCard(films) {
    const markup = films.map(({poster_path, original_title, vote_average, id,genres,release_date}) => 
        `
        <li class="film-card" id=${id}>
        <img class="film-img" src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="" id='${id}'/>
        <div class="film-description">
        <p class="film-name">${original_title}</p>
        <span class="film-genre">${renderGenres(genres)} |</span>
        <span class="film-year_of_issue">${release_date.slice(0,4)}</span>
        <span class="film-vote_average">${vote_average}</span>

        </div>
        </li>
        `
    ).join("");
    
    refs.ul.insertAdjacentHTML("afterbegin", markup);
}

function renderGenres(genres) {
    if (genres.length <= 2) {
        const genre = genres.map(genre => genre.name);
        return genre;
    } else {
        const genre = genres.map(genre => genre.name);
        genre.length = 2;
        genre[2] = "Other"
        return genre;
    }
}