import getRefs from "./getRefs"
refs = getRefs()



function filmsCollection() {
    return fetch('https://api.themoviedb.org/3/trending/all/day?api_key=3c9b3437ebab156a512248e157c99300')
    .then(response => response.json());
}


function onRenderFilmCard(films) {
     console.log("Масив для рендера",films);  
    const markup = films.map(({poster_path, original_title, vote_average, first_air_date, id}) => 
        `
        <a class="film-link">
        <li class="film-card">
        <img class="film-img" src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="" id='${id}'/>
        <div class="film-description">
        <p class="film-name">${original_title}</p>
        <span class="film-genre">${vote_average} |</span>
        <span class="film-year_of_issue">${first_air_date}</span>
        </div>
        </li>
        </a>        
        `
    ).join("");
    
    refs.ul.insertAdjacentHTML("beforeend", markup);
}


filmsCollection().then(onRenderFilmCard).catch(error => console.log(error));

export { onRenderFilmCard, filmsCollection }

