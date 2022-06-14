// import {onRenderFilmCard, filmsCollection} from "./card-template";
import listOfCards from '../templates/poster.hbs';
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
     console.log(fetcData)
    refs.myLibraryLink.classList.add('site-nav__link--current');
    refs.homeLink.classList.remove('site-nav__link--current');
    refs.form.classList.add('form--is-hidden');
    refs.buttonsBlock.classList.remove('header__block-btn--is-hidden');
    refs.header.classList.add("header--library");

     refs.watchedBtn.addEventListener("click", handleWatched);
refs.queueBtn.addEventListener("click", handleQueue);
    if (watchedFilms) {
        refs.ul.innerHTML = "";
        
  renderFilmCard(watchedFilms);

    }
  

}

function handleWatched() {
    
    console.log("Клик на кнопку Watched")
    console.log("Фильмы с Local Storage для рендера", JSON.parse(localStorage.getItem("watched-films")));
refs.watchedBtn.classList.add('header__btn--active')
    refs.queueBtn.classList.remove('header__btn--active');
    // console.log(watchedFilms);
    // getWatched();
    refs.ul.innerHTML = "";
  renderFilmCard(watchedFilms);
      

}

function handleQueue() {
    getQueue();
    console.log("Клик на кнопку Queue")
    console.log("Фильмы с Local Storage для рендера", queue);
   refs.watchedBtn.classList.remove('header__btn--active')
    refs.queueBtn.classList.add('header__btn--active');
    refs.ul.innerHTML = "";
    console.log("Масив очереди", queue)
    if (queue) {
     renderFilmCard(queue);
}
 
      

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


function renderFilmCard(films) {
     console.log("Масив для рендера",films);  
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
                    // console.log(genres)
                    // console.log(genres.length)

    if (genres.length <= 2) {
                console.log("Жанры")

        const genre = genres.map(genre => genre.name);
        // console.log("Жанры", genre)
        return genre;
    } else {
        const genre = genres.map(genre => genre.name);
        genre.length = 2;
        genre[2] = "Other"
        // console.log(genre)
        return genre;



    }
}