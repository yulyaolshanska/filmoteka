import GoToHome from './js/go-to-home';
import Search from './js/search';
import Start from './js/start';
import Library from './js/library';
import './js/day-night.js';
import './js/team-modal';
import Scroll from './js/scroll';


const start = async () => {
  const start = new Start();
  const genres = await start.fetchGenres();

  start.addButtonUp();

  start.renderMainCollection(genres);

  new Search(genres);
  
  const library = new Library();


  new GoToHome(genres, library.handleWatched, library.handleQueue, library.removeCard);

  new Scroll(genres);
};

start();

