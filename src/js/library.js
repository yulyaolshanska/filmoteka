import NewsApiService from './api-service';
import Modal from './modal';

export default class Library extends Modal {
  constructor() {
    super();
    super.getRefs().myLibraryLink.addEventListener('click', this.onMyLibrary.bind(this));
  }

  onMyLibrary() {
    super.getRefs().myLibraryLink.classList.add('site-nav__link--current');
    super.getRefs().homeLink.classList.remove('site-nav__link--current');
    super.getRefs().form.classList.add('form--is-hidden');
    super.getRefs().buttonsBlock.classList.remove('header__block-btn--is-hidden');
    super.getRefs().header.classList.add('header--library');
    super.getRefs().watchedBtn.classList.add('header__btn--active');
    super.getRefs().queueBtn.classList.remove('header__btn--active');

    // super.getRefs().watchedBtn.addEventListener('click', handleWatched);
    // super.getRefs().queueBtn.addEventListener('click', handleQueue);
    // if (watchedFilms) {
    //   refs.ul.innerHTML = '';
    //   refs.watchedBtn.classList.add('header__btn--active');
    //   refs.queueBtn.classList.remove('header__btn--active');
    //   renderFilmCard(watchedFilms);
    // }
  }
}