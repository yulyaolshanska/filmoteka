
// import './js/card-modal';
// import './js/card-template';
// import './js/homepage';
// import './js/my-library';
// import './js/poster';
// import './js/loader';
import GoToHome from './js/go-to-home';
import Search from './js/search';
import Start from './js/start';
import Modal from './js/modal';
import Library from './js/library';

const start = async () => {

  const start = new Start();
  const genres = await start.fetchGenres();
  start.addButtonUp()
  start.renderMainCollection(genres);

  new Search(genres);
  // new Modal();
  const library = new Library();
  new GoToHome(genres, library.handleWatched, library.handleQueue);
}

start();


