import poster from '../templates/poster.hbs';
import NewsApiService from './api-service'; //
import getRefs from './getRefs';
import { getRenderQuery } from './poster';
import SearchAPI from './search';
import { onTrend } from './poster';

const filmService = new NewsApiService(); //
const searchQuery = new SearchAPI();
const trend = document.querySelector('#sentinel'); 
const search = document.querySelector('#sentinel-search');
const library = document.querySelector('#sentinel-library');
const refs = getRefs();

const onEntry = entries => { 
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      filmService.fetchTrend().then(data => {
        // console.log(data)
        getRenderQuery(data.data.results);
        //   if (data.length === 0) {
        //     observer.unobserve(entry.target);
        // }
        filmService.incrementPage();
      })
    }
  })
}

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(trend);

const onEntrySearch = entries => { //
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      filmService.fetchSerchQuery().then(data => {
        console.log(data.data.results)
        getRenderQuery(data.data.results);
        //   if (data.length === 0) {
        //     observer.unobserve(entry.target);
        // }
        filmService.incrementPage();
      })
    }
  })
}

const searchObserver = new IntersectionObserver(onEntrySearch, {
  rootMargin: '150px',
});
searchObserver.observe(search);