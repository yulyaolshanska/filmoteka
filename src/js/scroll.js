import poster from '../templates/poster.hbs';
import NewsApiService from './api-service'; //
import getRefs from './getRefs';
import SearchAPI from './search';
import { onTrend } from './poster';

const filmService = new NewsApiService(); //
const searchQuery = new SearchAPI();
const ref = document.querySelector('#sentinel'); //
const refs = getRefs();

const onEntry = entries => { //
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onTrend().then(data => {
        console.log(data)
          if (data.length === 0) {
            observer.unobserve(entry.target);
        }
        filmService.incrementPage();
      })
    }
  })
}

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(ref);