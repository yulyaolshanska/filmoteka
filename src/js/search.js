import NewsApiService from './api-service';
import getRefs from './getRefs';
import listOfCards from '../templates/poster.hbs';
import { onLoader, offLoader } from './loader';

export default class SearchAPI extends NewsApiService {
  constructor() {
    super();
    this.form = document.querySelector('.form');
    this.form.addEventListener('submit', this.onSubmit.bind(this));
  }

  async onSubmit(e) {
    e.preventDefault();
    onLoader();

    const {
      elements: {
        searchQuery: { value },
      },
    } = e.target;
    const filmsContainer = getRefs().ulEl;

    super.resetPage();

    const data = await super.fetchSerchQuery(value);
    console.log(data);

    if (!data.data.results.length) {
      filmsContainer.innerHTML = `<li class='nothing'>Sorry, we find nothing</li>`;
      return;
    }

    const resultData = data.data.results.map(item => {
      return {
        id: item.id,
        poster_path: item.poster_path,
        original_title: item.original_title,
        title: item.title,
        genre_ids: item.genre_ids,
        release_date: new Date(item.release_date).getFullYear(),
      };
    });

    filmsContainer.innerHTML = listOfCards(resultData);
    this.form.reset();
    offLoader();
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
