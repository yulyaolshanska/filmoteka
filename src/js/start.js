import NewsApiService from './api-service';
import listOfCards from '../templates/poster.hbs';

export default class Start extends NewsApiService {
  constructor() {
    super();
    this.renderMainCollection(this.getData.bind(this));
    console.log(super.getRefs());
  }

  renderMainCollection(data) {
    
    super.getRefs().filmsContainer.innerHTML = super.getTemplates().listOfCards(data);
    
  }

  async getData() {
  
    try {

      super.resetPage();
  
      const data = await super.fetchTrend();
      const genres = await super.getGenres();
      console.log(genres);
      
      const resultData = data.data.results.map(({ id, poster_path, original_title, title, genre_ids, release_date, vote_average }) => {

        const genresList = this.parcingGenres(genre_ids, genres);
    
        return {
          'id': id,
          'poster_path': poster_path,
          'original_title': original_title,
          'title': title,
          'genre_ids': genresList ? genresList : false,
          'release_date': release_date ? new Date(release_date).getFullYear() : false,
          'reiting': String(vote_average).padEnd(3, '.0'),
        }
      });

      console.log(resultData);
    
      return resultData;

    } catch (error) {
      console.dir(error)
    }
  }

  async getGenresList() {
    
    try {
      
      const response = await super.fetchGenres();
      const genres = response.data.genres;
      
      return genres;

    } catch (error) {
      console.log(error)
    }
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