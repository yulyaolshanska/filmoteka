import getRefs from './getRefs';
import { onTrend } from './poster';
import { onLoader, offLoader } from './loader';

const refs = getRefs();

refs.homeLink.addEventListener('click', onHome);
refs.logo.addEventListener('click', onHome);

function onHome() {
  onLoader();
  refs.homeLink.classList.add('site-nav__link--current');
  refs.myLibraryLink.classList.remove('site-nav__link--current');
  refs.buttonsBlock.classList.add('header__block-btn--is-hidden');
  refs.form.classList.remove('form--is-hidden');
  refs.header.classList.remove('header--library');
  refs.ul.innerHTML = '';
  //   onLoader();
  onTrend();
}
