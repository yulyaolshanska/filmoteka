import getRefs from './getRefs';
import { onTrend } from './poster';

const refs = getRefs();
const trend = document.querySelector('#sentinel'); //
const search = document.querySelector('#sentinel-search') //
const library = document.querySelector('#sentinel-library') //

refs.homeLink.addEventListener('click', onHome);
refs.logo.addEventListener('click', onHome);

function onHome() {
  refs.homeLink.classList.add('site-nav__link--current');
  refs.myLibraryLink.classList.remove('site-nav__link--current');
  refs.buttonsBlock.classList.add('header__block-btn--is-hidden');
  refs.form.classList.remove('form--is-hidden');
  refs.header.classList.remove('header--library');
  refs.ul.innerHTML = '';
  trend.classList.remove('disable');//
  search.classList.add('disable');//
  library.classList.add('disable');//
  onTrend();
}