import NewsApiService from './api-service';
import trendResultList from '../templates/poster.hbs';
import {addDarkClassToHTML} from './day-night'

export default class Scroll extends NewsApiService {
  constructor(genres) {
    super();
    this.genres = genres;
    this.finalData = null;
    this.filmsContainer = super.getRefs().filmsContainer;
    this.observerItem = super.getRefs().sentinel;
    this.observeitionIt = 0;
    
    this.observer = new IntersectionObserver(entries => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (this.observeitionIt > 0) {
            console.log(this.observeitionIt);
          }
          this.observeitionIt +=1
          this.loadNextPage(entry);
        }
      })
    }, { rootMargin: '150px' });
    this.observer.observe(this.observerItem);
  }

  async loadNextPage(entry) {
    console.log(entry.target);
    super.incrementPage();

    if (entry.target.dataset.observe === 'home') {
      
      const data = await super.fetchTrend();

      this.finalData = super.getFinalData(data, this.genres);
    }

    if (entry.target.dataset.observe === 'search') {
      const searchQuery = JSON.parse(localStorage.getItem('searchQuery'));
      
      const data = await super.fetchSerchQuery(searchQuery);

      this.finalData = super.getFinalData(data, this.genres);
    }

    if (entry.target.dataset.observe === 'library') {
      return;
    }

    this.filmsContainer.insertAdjacentHTML('beforeend', trendResultList(this.finalData));
    addDarkClassToHTML()
  }
}

