import getRefs from './getRefs';
import getTemplates from './getTemplates';

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
    this.templates = getTemplates();
    // console.log(this.genres);
  }

  async getGenres() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}`
    const data = await axios.get(url);

    this.genres = data.data.genres;

    
    return this.genres;
  }
  
  getRefs() {
    return this.refs;
  }

  getTemplates() {
    return this.templates;
  }
 
  async fetchTrend() {
    const url = `${BASE_URL}/trending/movie/week?api_key=${KEY}&page=${this.page}`

    const data = await axios.get(url);
        
    return data;
  };

    // incrementPage() {
    //     this.page += 1;
    // };
  
   // choosePage() {
    //     this.page += 5;
    // };

  resetPage() {
      this.page = 1;
  }

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

  async fetchGenres() {
        const url = `${BASE_URL}/genre/movie/list?api_key=${KEY}`

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