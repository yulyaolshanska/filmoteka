const markup = film.results.map(({backdrop_path, original_title, vote_average, first_air_date}) => {
    `
    <a class="film-link">
    <li class="film-card">
    <img src="${backdrop_path}" alt="" width=200px height=100px />
    <div class="film-description">
    <p class="film-name">${original_title}</p>
    <span class="film-genre">${vote_average}</span>
    <span class="film-year_of_issue">${first_air_date}</span>
    </div>
    </li>
    </a>        
    `
}).join("");