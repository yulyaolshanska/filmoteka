refs = {
  ul: document.querySelector('.films-collection'),
};

function filmsCollection() {
  return fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=3c9b3437ebab156a512248e157c99300'
  ).then(response => response.json());
}

function onRenderFilmCard(film) {
  console.dir(film.results); //массив для рендера
  const markup = film.results
    .map(
      ({ poster_path, title, genre_ids, release_date, id }) =>
        `
        <li class="film-card" id=${id}>
        <img class="film-img" src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}"/>
        <div class="film-description">
        <p class="film-name">${title}</p>
        <span class="film-genre">${genre_ids} |</span>
        <span class="film-year_of_issue">${release_date}</span>
        </div>
        </li>
               
        `
    )
    .join('');

  refs.ul.insertAdjacentHTML('beforeend', markup);
}

console.log('новый файл');
filmsCollection()
  .then(onRenderFilmCard)
  .catch(error => console.log(error));

// export { onRenderFilmCard, filmsCollection };
