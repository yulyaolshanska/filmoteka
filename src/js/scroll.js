import NewsApiService from './api-service';
import trendResultList from '../templates/poster.hbs';

export default class Scroll extends NewsApiService {
  constructor(genres) {
    super();
    this.genres = genres;
    this.finalData = [];
    this.filmsContainer = super.getRefs().filmsContainer;
    this.observerItem = super.getRefs().sentinel;
    this.observeitionIt = 0;

    this.attrChangeListener = new MutationObserver(this.onChange.bind(this));
    this.attrChangeListener.observe(this.observerItem, { attributes: true });
    
    this.observer = new IntersectionObserver(entries => {
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          
          if (this.observeitionIt > 0) {
            
            this.loadNextPage(entry);
          }
          this.observeitionIt += 1;
          
        }
      })
    }, { rootMargin: '150px' });
    this.observer.observe(this.observerItem);
  }

  onChange() {
    
    this.observeitionIt = 1;
    super.resetPage();
  }

  async loadNextPage(entry) {
    
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

    if (this.observerItem.dataset.observe === 'watched') {
      const watchedArr = JSON.parse(localStorage.getItem('watched-films')) || [];

      this.finalData = this.paginateLibrary(watchedArr);
    }

    if (this.observerItem.dataset.observe === 'queue') {
      const queue = JSON.parse(localStorage.getItem('queue-films')) || [];

      this.finalData = this.paginateLibrary(queue);
    }
    
    this.filmsContainer.insertAdjacentHTML('beforeend', trendResultList(this.finalData));
  }

  paginateLibrary(array) {
    const data = [];
      array.forEach((item, i) => {
        if (i >= this.observeitionIt*20 && i <= (this.observeitionIt*20 + 19)) {
          data.push(item);
        }
      })

      if (data.length === 0) {
        return;
      }

    const finalData = super.getLibraryData(data);
    
    return finalData;
  }
}


