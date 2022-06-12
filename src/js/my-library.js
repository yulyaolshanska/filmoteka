import {onRenderFilmCard, filmsCollection} from "./card-template"
import getRefs from "./getRefs"
let watchedFilms = [];
let queue = [];
const refs = getRefs()

function handleWatched() {
    getWatched();
    console.log("Клик на кнопку Watched")
    console.log("Фильмы с Local Storage для рендера", watchedFilms)
//   onRenderFilmCard(watchedFilms);
      

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
    const filmToAdd = {name: "Доктор Стрэндж", id: "112",};
    queue.push(filmToAdd);
    localStorage.setItem("queue-films", JSON.stringify(filmToAdd));
    // onRenderFilmCard(queue);
    console.log("Фильмы в очереди")
       console.log(queue);

}

addToWatched();
addToQueue();
handleWatched()
