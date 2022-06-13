const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `476dab1d501621899284a1a134c160d7`;

refs = {
    ul: document.querySelector('.films-collection'),
}
import getRefs from "./getRefs"
refs = getRefs()



function filmsCollection() {
    return fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=3c9b3437ebab156a512248e157c99300')
    .then(response => response.json());
}


function onRenderFilmCard(film) {
    console.dir("Масив для рендера",film);  
    const markup = film.results.map(({poster_path, title, genre_ids, release_date, id}) => 
        `
        <a class="film-link" id=${id}>
        <li class="film-card">
        <img class="film-img" src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="" id='${id}'/>
        <div class="film-description">
        <p class="film-name">${title}</p>
        <span class="film-genre">${genre_ids} |</span>
        <span class="film-year_of_issue">${release_date}</span>
        </div>
        </li>
        </a>        
        `
    ).join("");
    
    refs.ul.insertAdjacentHTML("beforeend", markup);
}


filmsCollection().then(onRenderFilmCard).catch(error => console.log(error));

export { onRenderFilmCard, filmsCollection }

