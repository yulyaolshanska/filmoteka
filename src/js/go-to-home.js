import Start from './start';

export default class GoToHome extends Start {
  constructor(genres, handleWatched, handleQueue) {
    super();
    super.getRefs().homeLink.addEventListener('click', this.onHome.bind(this));
    super.getRefs().logo.addEventListener('click', this.onHome.bind(this));

    this.genres = genres;
    this.handleWatched = handleWatched;
    this.handleQueue = handleQueue;
  }

  onHome() {
    super.getRefs().homeLink.classList.add('site-nav__link--current');
    super.getRefs().myLibraryLink.classList.remove('site-nav__link--current');
    super.getRefs().buttonsBlock.classList.add('header__block-btn--is-hidden');
    super.getRefs().form.classList.remove('form--is-hidden');
    super.getRefs().header.classList.remove('header--library');

    super.renderMainCollection(this.genres);

    super.getRefs().watchedBtn.removeEventListener('click', this.handleWatched);
    super.getRefs().queueBtn.removeEventListener('click', this.handleQueue);
  }
}
