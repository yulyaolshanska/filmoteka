import NewsApiService from './api-service';
import getRefs from './getRefs';

export default class Scroll extends NewsApiService {
    constructor() {
        super();
        this.refs = getRefs();
        this.observer = new IntersectionObserver(entries => {
         entries.forEach(entry => {
         if (entry.isIntersecting) {
          this.loadNextPage();
        }
      })
    }, {rootMargin: '150px',}) // scroll ініціалізація observer
    }

    firstUpdated() {
    if (this.refs.sentinel) this.observer.observe(this.refs.sentinel);
    } //scroll починає слідкувати за змінами

    async loadNextPage() {
        const sentinelElData = document.querySelector('div[data-observe="home"]')
        if (sentinelElData.dataset.observe === "home") {
            super.incrementPage();
            await super.fetchTrend();
        } else if (sentinelElData.dataset.observe === "serch") {
            super.incrementPage();
            await super.fetchSerchQuery();
        } else if (sentinelElData.dataset.observe === "library") {
            // логіка для бібліотеки
        }
    
    }

}


