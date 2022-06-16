import NewsApiService from './api-service';
import getRefs from './getRefs';
import listOfCards from '../templates/search.hbs';


export default class SearchAPI extends NewsApiService {
  constructor() {
    super();
    this.filmsContainer = getRefs().ulEl;
    this.form = getRefs().form;
    this.form.addEventListener('submit', this.onSubmit.bind(this));
  }
  
  async onSubmit(e) {
    e.preventDefault();
    
    const { elements: { searchQuery: { value } } } = e.target;
    
    super.resetPage();
    
    const data = await super.fetchSerchQuery(value);
    const { data: { genres } } = await super.fetchGenres();
    
    if (!data.data.results.length) {
      filmsContainer.innerHTML = `<li class='nothing'>Sorry, we find nothing</li>`;
      return;
    }

    const resultData = data.data.results.map(({id, poster_path, original_title, title, genre_ids, release_date, vote_average}) => {

      const genresList= this.parcingGenres(genre_ids, genres);
    
      return {
        'id': id,
        'poster_path': poster_path,
        'original_title': original_title,
        'title': title,
        'genre_ids': genresList ? genresList : false,
        'release_date': release_date ? new Date(release_date).getFullYear() : false,
        'reiting': String(vote_average).padEnd(3,'.0'),
      }
    });
        
    this.filmsContainer.innerHTML = listOfCards(resultData);
    this.form.reset();
  }

  parcingGenres(genre_ids, genres) {
    
    return genre_ids.map((id, i) => {
        
      if (i <= 1) {
        return genres.filter(item => item.id === id)
          .map(item => item.name);
      }

      return 'Others';
                    
    }).slice(0, 3).join(', ');
  }
}

  
// new SearchAPI();

// class Pagination extends SearchAPI {
//   constructor() {
//     super();
//     super.output();
//     super.outputAPI();
//   }
// }

// new Pagination();