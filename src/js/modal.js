import NewsApiService from './api-service';
import trendResultList from '../templates/poster.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onModalLoader, offModalLoader } from './loader';

export default class Modal extends NewsApiService {
  constructor() {
    super();
    super
      .getRefs()
      .filmsContainer.addEventListener('click', this.onOpenModal.bind(this));

    this.watchedFilms = JSON.parse(localStorage.getItem('watched-films')) || [];
    this.queue = JSON.parse(localStorage.getItem('queue-films')) || [];
    
    this.status = '';

    this.fetchedData = null;
    this.watched = null;
    this.queueFilm = null;
    this.backdrop = super.getRefs().backdrop;
    this.btnClose = super.getRefs().btnClose;
    this.cardEl = super.getRefs().cardEl;
    this.main = super.getRefs().main;
    this.header = super.getRefs().header;
    this.footer = super.getRefs().footer;
    this.filmsContainer = super.getRefs().filmsContainer;
    
    this.onClickESC = this.onClickESC.bind(this);
    this.onClickBdrop = this.onClickBdrop.bind(this);
    this.addToWatched = this.addToWatched.bind(this);
    this.addToQueue = this.addToQueue.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.renderGenres = this.renderGenres.bind(this);
    this.offButnWatched = this.offButnWatched.bind(this);
    this.offButnQueue = this.offButnQueue.bind(this);
    this.getWatchedFilms = this.getWatchedFilms.bind(this);
    this.getQueue = this.getQueue.bind(this);
    this.filmWatchDel = this.filmWatchDel.bind(this);
    this.filmQueueDel = this.filmQueueDel.bind(this);
  }

  getState() {
    return super.getRefs().sentinel.getAttribute('data-observe');
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }

  getWatchedFilms() {
    return JSON.parse(localStorage.getItem('watched-films')) || [];
  }

  getQueue() {
    return JSON.parse(localStorage.getItem('queue-films')) || [];
  }

  async onOpenModal(event) {
  
    const link = event.target.closest('.film-card');

    if (!link || event.target.classList.contains('film-btn_card_remove')) {
      return;
    }

    const movieId = link.getAttribute('id');
    console.log(movieId);

    await this.fetchRenderCard(movieId);

    document.body.classList.add('fixed');

    this.backdrop.classList.remove('is-hidden');

    this.main.classList.add('blur');
    this.header.classList.add('blur');
    this.footer.classList.add('blur');

    this.btnClose.addEventListener('click', this.onModalClose);

    document.addEventListener('keydown', this.onClickESC);

    this.backdrop.addEventListener('click', this.onClickBdrop);
  }

  async fetchRenderCard(movieId) {
    try {
      onModalLoader();
      const data = await super.fetchMovieById(movieId);
      
      offModalLoader();

      const {
        id,
        popularity,
        genres,
        poster_path,
        vote_average,
        vote_count,
        title,
        overview,
        release_date,
        original_title,
        budget,
      } = data.data;

      this.fetchedData = {
        id,
        popularity,
        genres,
        poster_path,
        vote_average,
        vote_count,
        title,
        overview,
        release_date,
        original_title,
        budget,  
      };

      this.renderCard(this.fetchedData);

      this.offButnWatched();
      this.offButnQueue();

      document
        .querySelector('.watched')
        .addEventListener('click', this.addToWatched);
      document
        .querySelector('.queue')
        .addEventListener('click', this.addToQueue);
    } catch (error) {
      console.log(error.message);
    }
  }

  renderCard({
    popularity,
    genres,
    poster_path,
    vote_average,
    vote_count,
    title,
    overview,
  }) {
    const { w342, w500, w780 } = this.getPosterUrl(poster_path);

    const card = ` <picture >
      <source
        srcset="${w342} 1x,
              ${w500} 2x"
        media="(min-width: 1080px)"
      />
    
      <source
        srcset="${w342} 1x,
              ${w780} 2x"
        media="(min-width: 320px)"
      />
      <img src="${w500}" alt="${title}" class="card_img"/>
    </picture>

    <div class="card-thumb">
      <h2 class="card-title">${title}</h2>
      <ul class="card-list">
          <li class="card_item">
              <span class="category">Vote/Votes</span>
              <span class="vote vote_av">${vote_average}</span> / <span class="vote vote_cnt">${vote_count}</span>
          </li>
          <li class="card_item">
              <span class="category">Popularity</span>
              <span class="av">${popularity} </span>           
          </li>
          <li class="card_item">
              <span class="category">Original title</span>
              <span class="av av_title">${title} </span>            
          </li>
          <li class="card_item">
              <span class="category">Genre</span>
              <span class="av">${super.renderGenres(genres)}</span>           
          </li>    
      </ul>
      <h3 class="card_subtitle">About</h3>
      <p class="card_text">${overview}</p>
      <ul class="modal_button_list">
          <li><button type="button" class="button button modal__btn modal__btn--margin modal__btn--active watched" data-watched aria-label="Add to watched">add to Watched</button></li>
          <li> <button type="button" class='button button modal__btn modal__btn--active queue' data-queue aria-label="Add to queue">add to queue</button></li>
      </ul>
      </div>    
      `;

    this.cardEl.innerHTML = card;
  }

  getPosterUrl(poster_path) {
    const posterUrl = {};

    if (poster_path) {
      posterUrl.w342 = `https://image.tmdb.org/t/p/w342${poster_path}`;
      posterUrl.w500 = `https://image.tmdb.org/t/p/w500${poster_path}`;
      posterUrl.w780 = `https://image.tmdb.org/t/p/w780${poster_path}`;
    } else {
      let url = `https://www.freeiconspng.com/uploads/no-image-icon-6.png`;
      posterUrl.w342 = url;
      posterUrl.w500 = url;
      posterUrl.w780 = url;
    }

    return posterUrl;
  }

  onClickESC(e) {
    if (e.keyCode === 27) {
      this.onModalClose();
      }
  }

  onClickBdrop(e) {
    if (!e.target.closest('.modal')) {
      this.onModalClose();
    }
  }

  onModalClose() {
    this.backdrop.classList.add('is-hidden');
    document.body.classList.remove('fixed')
    document.removeEventListener('keydown', this.onClickESC);
    this.btnClose.removeEventListener('click', this.onModalClose);
    this.main.classList.remove('blur');
    this.header.classList.remove('blur');
    this.footer.classList.remove('blur');
    document
      .querySelector('.watched')
      .removeEventListener('click', this.addToWatched);
    document
      .querySelector('.queue')
      .removeEventListener('click', this.addToQueue);
    this.backdrop.removeEventListener('click', this.onClickBdrop);
  }

  offButnWatched() {
        
    if (this.getWatchedFilms().find(films => this.fetchedData.id === films.id)) {
      document.querySelector('.watched').innerHTML = 'Film added to Watched';
      document.querySelector('.watched').classList.add('modal__btn--added-btn');
      document.querySelector('.queue').innerHTML = 'Add to Queue';
      document.querySelector('.queue').classList.remove('modal__btn--added-btn');
      document.querySelector('.watched').classList.remove('modal__btn--active');
      document.querySelector('.queue').classList.add('modal__btn--active');      
      document.querySelector('.watched').disabled = true;
      document.querySelector('.queue').disabled = false;
      
    }
    return;
  }

  offButnQueue() {
        
    if (this.getQueue().find(films => this.fetchedData.id === films.id)) {
      document.querySelector('.queue').innerHTML = 'Film added to Queue';
      document.querySelector('.queue').classList.add('modal__btn--added-btn');
      document.querySelector('.watched').innerHTML = 'Add to Watched';
      document.querySelector('.watched').classList.remove('modal__btn--added-btn');
      document.querySelector('.queue').classList.remove('modal__btn--active');
      document.querySelector('.watched').classList.add('modal__btn--active');
      document.querySelector('.watched').disabled = false;
      document.querySelector('.queue').disabled = true;
    }

    return;
  }

  addToWatched() {
    document.querySelector('.queue').classList.remove('modal__btn--added-btn');
    document.querySelector('.watched').classList.add('modal__btn--added-btn');
    document.querySelector('.watched').classList.remove('modal__btn--active');
    document.querySelector('.queue').classList.add('modal__btn--active');      
    document.querySelector('.watched').disabled = true;
    document.querySelector('.queue').disabled = false;
    
    if ( this.queue.find(films => this.fetchedData.id === films.id) ){
        {
          document.querySelector('.queue').classList.remove('modal__btn--added-btn');
          document.querySelector('.queue').innerHTML = 'Add to Queue';
          this.filmQueueDel();
        }
    }
   
    document.querySelector('.watched').innerHTML = 'Film added to Watched';
    
    if (!this.watchedFilms.find(films => this.fetchedData.id == films.id))
    {
      this.watchedFilms.push(this.fetchedData);}
   
      localStorage.setItem('watched-films', JSON.stringify(this.watchedFilms));
      
    this.reloadLibrary();
    
  }

  addToQueue() {
    document.querySelector('.watched').classList.remove('modal__btn--added-btn');
    document.querySelector('.queue').classList.add('modal__btn--added-btn');
    document.querySelector('.queue').classList.remove('modal__btn--active');
    document.querySelector('.watched').classList.add('modal__btn--active');
    document.querySelector('.watched').disabled = false;
    document.querySelector('.queue').disabled = true;

    if (this.watchedFilms.find(films => this.fetchedData.id === films.id)) {
      {
        document.querySelector('.watched').classList.remove('modal__btn--added-btn');
        document.querySelector('.watched').innerHTML = 'Add to Watched';
        this.filmWatchDel();
      }
    }

      document.querySelector('.queue').innerHTML = 'Film added to Queue';   
      
      if (!this.queue.find(films => this.fetchedData.id === films.id)) {
        this.queue.push(this.fetchedData);}

    localStorage.setItem('queue-films', JSON.stringify(this.queue));
    
    this.reloadLibrary();
      
  }

  // isFilmInStorage() {
  //   this.watchedFilms = JSON.parse(localStorage.getItem('watched-films')) || [];
  //   this.queue = JSON.parse(localStorage.getItem('queue-films')) || [];

  //   if (this.watchedFilms.find(films => this.fetchedData.id === films.id)) {
  //     Notify.warning('You have already added this movie to Watched', {
  //       timeout: 3000,
  //     });
  //     return true;
  //   } else if (this.queue.find(films => this.fetchedData.id === films.id)) {
  //     Notify.warning('You have already added this movie to Queue', {
  //       timeout: 3000,
  //     });
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  
  filmWatchDel() {
        this.watched = this.getWatchedFilms().filter(films => films.id !== this.fetchedData.id)
        localStorage.setItem('watched-films', JSON.stringify(this.watched));
  }

  filmQueueDel() {
   
    this.queueFilm = this.getQueue().filter(films => films.id !== this.fetchedData.id)
    localStorage.setItem('queue-films', JSON.stringify(this.queueFilm));
  }

  renderFilmCard(data) {
    
    const libraryData = super.getLibraryData(data);
    
    const markup = trendResultList(libraryData);
 
    this.filmsContainer.innerHTML = markup;
  }

  reloadLibrary() {
    if (this.getState() === 'watched') {
      if (this.getWatchedFilms().length === 0) {
        this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't add any films in your Watched category yet</li>`;
        if (localStorage.getItem('theme') === 'dark') {
          document
            .querySelector('.nothing')
            .classList.add('nothing--dark');
        }
        return
      }
     
      const firstWatchedPage = this.getWatchedFilms().slice(0, 20);
      this.renderFilmCard(firstWatchedPage);
    }

    if (this.getState() === 'queue') {
      if (this.getQueue().length === 0) {
        this.filmsContainer.innerHTML = `<li class='nothing'>Sorry, but you didn't add any films in your Queue category yet</li>`;
        if (localStorage.getItem('theme') === 'dark') {
          document
            .querySelector('.nothing')
            .classList.add('nothing--dark');
      }
        return;
      }
      
      const firstQueuePage = this.getQueue().slice(0,20);    
      this.renderFilmCard(firstQueuePage);
    }
  }
}
