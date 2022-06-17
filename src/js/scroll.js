import poster from '../templates/poster.hbs';
import NewsApiService from './api-service'; //
import getRefs from './getRefs';



const filmService = new NewsApiService(); //
const ref = document.querySelector('#sentinel'); //
const refs = getRefs();


const onEntry = entries => { //
  entries.forEach(entry => {
    if (entry.isIntersecting) {
     filmService.fetchTrend().then(data => {
        // if (results.length === 0) {
        //   Notify.info("We're sorry, but you've reached the end of search results.")
        // }
        //  console.log(data.data.results)
       
         refs.ul.insertAdjacentHTML('beforeend', poster(data.data.results));
        //  getDataCard(data.data.results);
         filmService.incrementPage();
     })
    }
  });
};


const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(ref);