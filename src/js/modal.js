import NewsApiService from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onModalLoader, offModalLoader } from './loader';

export default class Modal extends NewsApiService {
  constructor() {
    super();
    super.getRefs().filmsContainer.addEventListener('click', this.onOpenModal.bind(this));

    this.watchedFilms = JSON.parse(localStorage.getItem('watched-films')) || [];
    this.queue = JSON.parse(localStorage.getItem('queue-films')) || [];
    this.fetchedData = null;
    this.backdrop = super.getRefs().backdrop;
  }

  getWatchedFilms() {
    return this.watchedFilms;
  }

  getQueue() {
    return this.queue;
  }

  async onOpenModal(event) {
    // let movieId = null;
    const link = event.target.closest('.film-card');
    if (!link) {
      return;
    }
    const movieId = link.getAttribute('id');
    console.log(movieId);

    await this.fetchRenderCard(movieId);

    super.getRefs().backdrop.classList.remove('is-hidden');

    super.getRefs().btnClose.addEventListener('click', this.onModalClose.bind(this));

    document.addEventListener('keydown', this.onClickESC.bind(this));
  }

  async fetchRenderCard(movieId) {
    try {
      onModalLoader();
      const data = await super.fetchMovieById(movieId);
      offModalLoader();
      console.log(data);

      const { id, popularity, genres, poster_path, vote_average, vote_count, title, overview } = data.data;

      this.fetchedData = {
          'id': id,
          'popularity': popularity,
          'genres': genres,
          'poster_path': poster_path,
          'vote_average': vote_average,
          'vote_count': vote_count,
          'title': title,
          'overview': overview,
      };
      
      this.renderCard(this.fetchedData);

      document.querySelector('.watched').addEventListener('click', this.addToWatched.bind(this));
      document.querySelector('.queue').addEventListener('click', this.addToQueue.bind(this));
    } catch (error) {
      console.log(error.message);
    }
    
  }

  renderCard({popularity, genres, poster_path, vote_average, vote_count, title, overview}) {
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
              <span class="av">${genres
                .map(genre => {
                  return genre.name;
                })
                .join(', ')}</span>           
          </li>    
      </ul>
      <h3 class="card_subtitle">About</h3>
      <p class="card_text">${overview}</p>
      <ul class="modal_button_list">
          <li><button type="button" class="button button modal__btn modal__btn--margin watched" data-watched>add to Watched</button></li>
          <li> <button type="button" class='button button modal__btn queue' data-queue>add to queue</button></li>
      </ul>
      </div>    
      `;

    // ДОбавить проверку на колличество жанров
    super.getRefs().cardEl.innerHTML = card;

    // console.log(obj)
  }

  getPosterUrl(poster_path) {
    const posterUrl = {};

    if (poster_path){
        // posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
        posterUrl.w342 = `https://image.tmdb.org/t/p/w342${poster_path}`;
        posterUrl.w500 = `https://image.tmdb.org/t/p/w500${poster_path}`;
        posterUrl.w780 = `https://image.tmdb.org/t/p/w780${poster_path}`;
      
       
    } else {
        let url = `https://www.freeiconspng.com/uploads/no-image-icon-13.png`;
        posterUrl.w342 = url;
        posterUrl.w500 = url;
        posterUrl.w780 = url;      
    }

  return posterUrl;
}

  onClickESC(e) {
    if (e.keyCode === 27 && !this.backdrop.classList.contains('is-hidden')) {
        this.onModalClose();
      console.log('close');
    }
  }

  onModalClose() {
    super.getRefs().backdrop.classList.add('is-hidden');
    document.removeEventListener('keydown', this.onClickESC.bind(this));
    

    document.querySelector('.watched').removeEventListener('click', this.addToWatched.bind(this));
    document.querySelector('.queue').removeEventListener('click', this.addToQueue.bind(this));

    super.getRefs().cardEl.innerHTML = '';
  }

  addToWatched() {
    document.querySelector('.queue').classList.remove('modal__btn--active');
    document.querySelector('.watched').classList.add('modal__btn--active');

    if (this.isFilmInStorage()) {
      return;
    };

    this.watchedFilms.push(this.fetchedData);
    localStorage.setItem('watched-films', JSON.stringify(this.watchedFilms));
  }

  addToQueue() {
    document.querySelector('.watched').classList.remove('modal__btn--active');
    document.querySelector('.queue').classList.add('modal__btn--active');

    if (this.isFilmInStorage()) {
      return;
    };
    
    this.queue.push(this.fetchedData);
    localStorage.setItem('queue-films', JSON.stringify(this.queue));
  }

  isFilmInStorage() {
    this.watchedFilms = JSON.parse(localStorage.getItem('watched-films')) || [];
    this.queue = JSON.parse(localStorage.getItem('queue-films')) || [];

    if (this.watchedFilms.find(films => this.fetchedData.id === films.id)) {
      Notify.warning('You have already added this movie to Watched', {
        timeout: 3000,
      });
      return true;
    } else if (this.queue.find(films => this.fetchedData.id === films.id)) {
      Notify.warning('You have already added this movie to Queue', {
        timeout: 3000,
      });
      return true;
    } else {
      return false;
    } 
  }
}