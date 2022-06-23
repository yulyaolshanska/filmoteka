import Modal from './modal';
import trendResultList from '../templates/poster.hbs';

export default class Library extends Modal {
  constructor() {
    super();
    super.getRefs().myLibraryLink.addEventListener('click', this.onMyLibrary.bind(this));

    this.status = '';
    this.observerItem = super.getRefs().sentinel;
    this.watchedFilms = super.getWatchedFilms();
    this.queue = super.getQueue();

    this.filmsContainer = super.getRefs().filmsContainer;
    this.watchedBtn = super.getRefs().watchedBtn;
    this.queueBtn = super.getRefs().queueBtn;
    this.observerItem = super.getRefs().sentinel;

    this.handleWatched = this.handleWatched.bind(this);
    this.handleQueue = this.handleQueue.bind(this);

    this.filmArray = [];

    this.removeCard = this.removeCard.bind(this);

  }

  onMyLibrary() {
    this.observerItem.dataset.observe = 'watched';
    
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
    // this.status = 'watched';
    super.setStatus('watched');

    if (super.getWatchedFilms().length === 0) {
      this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't add any films in your library yet</li>`;
      
      return;
    }

    const firstWatchedPage = super.getWatchedFilms().slice(0,20);
    super.renderFilmCard(firstWatchedPage);
    this.filmsContainer.addEventListener('click', this.removeCard);
  }

  // renderFilmCard(data) {
    
  //   const libraryData = super.getLibraryData(data);
    
  //   const markup = trendResultList(libraryData);
 
  //   this.filmsContainer.innerHTML = markup;
  // }

   handleWatched() {
    this.watchedBtn.classList.add('header__btn--active');
    this.queueBtn.classList.remove('header__btn--active');
    // this.status = 'watched';
    super.setStatus('watched'); 
    this.observerItem.dataset.observe = 'watched';
    
    if (super.getWatchedFilms().length === 0) {
      this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't add any films in your Watched category yet</li>`;
      if (localStorage.getItem('theme') === 'dark') {
           document
        .querySelector('.nothing')
        .classList.add('nothing--dark');
     }
      return
    }
     
    const firstWatchedPage = super.getWatchedFilms().slice(0,20);
    super.renderFilmCard(firstWatchedPage);
  }
  
  handleQueue() {
    this.queueBtn.classList.add('header__btn--active');
    this.watchedBtn.classList.remove('header__btn--active');
    // this.status = 'queue';
    super.setStatus('queue');
    this.observerItem.dataset.observe = 'queue';
     
    if (super.getQueue().length === 0) {
      this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't add any films in your Queue category yet</li>`;
      if (localStorage.getItem('theme') === 'dark') {
     document
        .querySelector('.nothing')
        .classList.add('nothing--dark');
     }
      return;
    }
    const firstQueuePage = super.getQueue().slice(0,20);    
    super.renderFilmCard(firstQueuePage);
  }

  removeCard(e) {

    const element = e.target

    const isElement = element.classList.contains('film-btn_card_remove');

    if (isElement) {
      
      const id = e.target.parentNode.getAttribute('id');
      
      if (super.getStatus() === 'watched') {
               
        const modifyWatchedFilms = super.getWatchedFilms().filter((item) => {
          if (item.id != id) {
            return item;
          }
        });

        localStorage.setItem('watched-films', JSON.stringify(modifyWatchedFilms));

        this.watchedFilms = modifyWatchedFilms;

        if (modifyWatchedFilms.length === 0) {
          this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't have any films in your Watched category yet</li>`
        }

      } else if (super.getStatus() === 'queue') {
        
        const modifyQueue = super.getQueue().filter((item) => {
          if (item.id != id) {
            return item;
          }
        });

        localStorage.setItem('queue-films', JSON.stringify(modifyQueue));

        this.queue = modifyQueue;
        
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