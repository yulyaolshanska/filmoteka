import NewsApiService from './api-service';
import Modal from './modal';

export default class Library extends Modal {
  constructor() {
    super();
    super.getRefs().myLibraryLink.addEventListener('click', this.onMyLibrary.bind(this));

    this.status = '';
    this.watchedFilms = super.getWatchedFilms();
    this.queue = super.getQueue();

    this.filmsContainer = super.getRefs().filmsContainer;
    this.watchedBtn = super.getRefs().watchedBtn;
    this.queueBtn = super.getRefs().queueBtn;

    this.handleWatched = this.handleWatched.bind(this);
    this.handleQueue = this.handleQueue.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  onMyLibrary() {
    super.getRefs().myLibraryLink.classList.add('site-nav__link--current');
    super.getRefs().homeLink.classList.remove('site-nav__link--current');
    super.getRefs().form.classList.add('form--is-hidden');
    super.getRefs().buttonsBlock.classList.remove('header__block-btn--is-hidden');
    super.getRefs().header.classList.add('header--library');
    super.getRefs().watchedBtn.classList.add('header__btn--active');
    super.getRefs().queueBtn.classList.remove('header__btn--active');

    this.watchedBtn.addEventListener('click', this.handleWatched);
    this.queueBtn.addEventListener('click', this.handleQueue);
    this.filmsContainer.addEventListener('click', this.removeCard);
    this.status = 'watched';
    
    if (this.watchedFilms.length === 0) {
      this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't add any films in your library yet</li>`;
      
      return;
    }

    this.renderFilmCard(this.watchedFilms);
    this.filmsContainer.addEventListener('click', this.removeCard);
  }

  renderFilmCard(films) {
    const markup = films
      .map(
        ({
          poster_path,
          original_title,
          vote_average,
          id,
          genres,
          release_date,
        }) =>
          `
          <li class="film-card" id=${id}>
            <img class="film-img" src="http://image.tmdb.org/t/p/w500/${poster_path}" alt="" id='${id}'/>
            <div class="film-description">
            <p class="film-name">${original_title}</p>
            <span class="film-genre">${super.renderGenres(genres)} |</span>
            <span class="film-year_of_issue">${release_date.slice(0, 4)}</span>
            <span class="film-vote_average">${vote_average}</span>
            </div>
            <button type="button" class="film-btn_card_remove"></button>
          </li>
          `
      )
      .join('');

    this.filmsContainer.innerHTML = markup;
  }

   handleWatched() {
    this.watchedBtn.classList.add('header__btn--active');
    this.queueBtn.classList.remove('header__btn--active');
    this.status = 'watched';
     
    if (this.watchedFilms.length === 0) {
      this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't add any films in your Watched category yet</li>`;

      return
    }
        
    this.renderFilmCard(this.watchedFilms);
  }
  
  handleQueue() {
    this.queueBtn.classList.add('header__btn--active');
    this.watchedBtn.classList.remove('header__btn--active');
    this.status = 'queue';
        
    if (this.queue.length === 0) {
      this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't add any films in your Queue category yet</li>`;

      return;
    }
        
    this.renderFilmCard(this.queue);
  }

  removeCard(e) {

    const element = e.target

    const isElement = element.classList.contains('film-btn_card_remove');

    if (isElement) {
      
      const id = e.target.parentNode.getAttribute('id');
      
      if (this.status === 'watched') {
               
        const modifyWatchedFilms = super.getWatchedFilms().filter((item) => {
          if (item.id != id) {
            return item;
          }
        });

        localStorage.setItem('watched-films', JSON.stringify(modifyWatchedFilms));

        if (modifyWatchedFilms.length === 0) {
          this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't have any films in your Watched category yet</li>`
        }

      } else if (this.status === 'queue') {
        
        const modifyQueue = super.getQueue().filter((item) => {
          if (item.id != id) {
            return item;
          }
        });

        localStorage.setItem('queue-films', JSON.stringify(modifyQueue));
        
        if (modifyQueue.length === 0) {
          this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't have any films in your Queue category yet</li>`
        }

      } else {
        console.log('something wrong');
      }

      element.parentNode.remove();  
    }
  }
}