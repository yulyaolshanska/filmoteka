import getRefs from './getRefs';
// import getTemplates from './getTemplates';
// import templates from './getTemplates';
// import listOfCards from '../templates/poster.hbs';

const axios = require('axios');

const BASE_URL = `https://api.themoviedb.org/3`;
const KEY = `476dab1d501621899284a1a134c160d7`;


// https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher
// login: project-group-6, password: project-group-6
// API key:  3c9b3437ebab156a512248e157c99300

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.genres = null;
    this.refs = getRefs();
    // this.templates = templates;
    // this.templates = getTemplates();
    // console.log(this.genres);
  }

  getRefs() {
    return this.refs;
  }

  resetPage() {
    this.page = 1;
  }

  getFinalData(data, genres) {
    const finalData = data.data.results.map(({ id, poster_path, original_title, title, genre_ids, release_date, vote_average }) => {

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

    return finalData;
  }

  getLibraryData(data) {
    const libraryData = data.map(
      ({
        poster_path,
        original_title,
        vote_average,
        id,
        genres,
        release_date,
        title,
        budget,
      }) =>{
  
        let releaseYear = release_date.slice(0, 4);
        let genresRend = this.renderGenres(genres);
        // console.log(films);

        const isButton = true;

        return {
          poster_path,
          original_title,
          vote_average,
          id,
          genres: genresRend,
          release_date: releaseYear,
          title,
          budget,
          isButton,
        }
      });
    
    return libraryData;
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

  renderGenres(genres) {
    if (genres.length <= 2) {
      const genre = genres.map(genre => genre.name);
      return genre.join(', ');
    } else {
      const genre = genres.map(genre => genre.name);
      genre.length = 2;
      genre[2] = 'Other';
      return genre.join(', ');
    }
  }

  async fetchGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}`
    const data = await axios.get(url);

    this.genres = data.data.genres;
    return this.genres;
  }
   
  async fetchTrend() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${KEY}&page=${this.page}`

    const data = await axios.get(url);
        
    return data;
  };

    incrementPage() {
        this.page += 1;
    }; //
  
   // choosePage() {
    //     this.page += 5;
    // };

  

  async fetchSerchQuery(searchQuery) {
        const url = `${BASE_URL}/search/movie?api_key=${KEY}&query=${searchQuery}&page=${this.page}`

        const data = await axios.get(url);
             
        return data;
  };
  
  async fetchMovieById(movieId) {
        const url = `${BASE_URL}/movie/${movieId}?api_key=${KEY}`
       
        const data = await axios.get(url);
             
        return data;
  };

  get query() {
        return this.searchQuery;
    };

  set query(newQuery) {
        this.searchQuery = newQuery;
    }

}