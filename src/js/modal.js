import NewsApiService from './api-service';
import { onModalLoader, offModalLoader } from './loader';

export default class Modal extends NewsApiService {
  constructor() {
    super();
    super.getRefs().filmsContainer.addEventListener('click', this.onOpenModal.bind(this));

    this.backdrop = super.getRefs().backdrop;
  }

  onOpenModal(event) {
    // let movieId = null;
    const link = event.target.closest('.film-card');
    if (!link) {
      return;
    }
    const movieId = link.getAttribute('id');
    console.log(movieId);

    super.getRefs().backdrop.classList.remove('is-hidden');

    // fetchRenderCard(movieId);

    super.getRefs().btnClose.addEventListener('click', this.onModalClose.bind(this));

    document.addEventListener('keydown', this.onClickESC.bind(this));

    // document.addEventListener('keydown', function (e) {
    //   if (e.keyCode === 27 && !this.backdrop.contains('is-hidden')) {
    //     // this.onModalClose.bind(this);
    //     console.log('close');
    //   }
    // });
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
    // document.querySelector('.watched').removeEventListener('click', addToWatched);
    // document.querySelector('.queue').removeEventListener('click', addToQueue);
  }
}