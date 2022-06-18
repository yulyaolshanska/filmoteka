// import NewsApiService from './api-service';
// import getRefs from './getRefs';
// import { addToQueue } from './my-library';
// import { addToWatched } from './my-library';
// import { onModalLoader, offModalLoader } from './loader';

// export let fetcData = {};

// const newsApiService = new NewsApiService();
// const refs = getRefs();
// const KEY = `476dab1d501621899284a1a134c160d7`;
// let posterUrl = ``;

// refs.ulEl.addEventListener('click', onModalOpen);

// function onModalOpen(event) {
//   let movieId = null;
//   let link = event.target.closest('.film-card');
//   if (!link) {
//     return;
//   }
//   movieId = link.getAttribute('id');
//   document.body.style.overflow = 'hidden';
//   document.querySelector('main').classList.add('blur');
//   document.querySelector('header').classList.add('blur');
//   document.querySelector('footer').classList.add('blur');
//   refs.backdrop.classList.remove('is-hidden');

//   fetchRenderCard(movieId);
//   refs.cardEl.innerHTML = '';
//   refs.btnClose.addEventListener('click', onModalClose);

//   document.addEventListener('keydown', function (e) {
//     if (e.keyCode === 27) {
//       onModalClose();
//     }
//   });

//   refs.backdrop.addEventListener('click', e => {
//     if (!e.target.closest('.modal')) {
//       onModalClose();
//     }
//   });
// }

// async function fetchRenderCard(movieId) {
//   try {
//     onModalLoader();
//     data = await newsApiService.fetchMovieById(movieId);
//     fetcData = data.data;
//     renderCard(fetcData);
//     document.querySelector('.watched').addEventListener('click', addToWatched);
//     document.querySelector('.queue').addEventListener('click', addToQueue);
//   } catch (error) {
//     console.log(error.message);
//   }
//   offModalLoader();
// }

// function getPosterUrl(poster_path) {
//   if (poster_path) {
//     posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
//   } else {
//     posterUrl = './images/no-image-icon-23485.png';
//   }

//   return posterUrl;
// }

// async function renderCard({
//   popularity,
//   genres,
//   poster_path,
//   vote_average,
//   vote_count,
//   title,
//   overview,
// }) {
//   getPosterUrl(poster_path);

//   const card = `
//     <img src="${posterUrl}" alt="descr" class='card_img'>
//     <div class="card-thumb">
//     <h2 class="card-title">${title}</h2>
//     <ul class="card-list">
//         <li class="card_item">
//             <span class="category">Vote/Votes</span>
//             <span class="vote vote_av">${vote_average}</span> / <span class="vote vote_cnt">${vote_count}</span>
//         </li>
//         <li class="card_item">
//             <span class="category">Popularity</span>
//             <span class="av">${popularity} </span>
//         </li>
//         <li class="card_item">
//             <span class="category">Original title</span>
//             <span class="av av_title">${title} </span>
//         </li>
//         <li class="card_item">
//             <span class="category">Genre</span>
//             <span class="av">${genres
//               .map(genre => {
//                 return genre.name;
//               })
//               .join(', ')}</span>
//         </li>
//     </ul>
//     <h3 class="card_subtitle">About</h3>
//     <p class="card_text">${overview}</p>
//     <ul class="modal_button_list">
//         <li><button type="button" class="button button modal__btn modal__btn--margin watched" data-watched>add to Watched</button></li>
//         <li> <button type="button" class='button button modal__btn queue' data-queue>add to queue</button></li>
//     </ul>
//     </div>
//     `;

//   refs.cardEl.innerHTML = card;

//   // console.log(obj)
// }

// function onModalClose() {
//   document.querySelector('.watched').removeEventListener('click', addToWatched);
//   document.querySelector('.queue').removeEventListener('click', addToQueue);
//   document.querySelector('main').classList.remove('blur');
//   document.querySelector('header').classList.remove('blur');
//   document.querySelector('footer').classList.remove('blur');
//   refs.backdrop.classList.add('is-hidden');
//   document.body.style.overflow = '';
// }

import getRefs from './getRefs';
const refs = getRefs();
const KEY = `476dab1d501621899284a1a134c160d7`;
export let fetcData = {};
import { addToQueue } from './my-library';
import { addToWatched } from './my-library';
import { onModalLoader, offModalLoader } from './loader';

let posterUrl = ``;

function fetchApi(movieId) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

refs.ulEl.addEventListener('click', onModalOpen);

function onModalOpen(event) {
  let movieId = null;
  let link = event.target.closest('.film-card');
  if (!link) {
    return;
  }
  movieId = link.getAttribute('id');

  refs.backdrop.classList.remove('is-hidden');

  fetchRenderCard(movieId);

  refs.btnClose.addEventListener('click', onModalClose);

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      onModalClose();
    }
  });

  refs.backdrop.addEventListener('click', e => {
    if (!e.target.closest('.modal')) {
      onModalClose();
    }
  });
}

async function fetchRenderCard(movieId) {
  try {
    onModalLoader();
    fetcData = await fetchApi(movieId);
    renderCard(fetcData);

    document.querySelector('.watched').addEventListener('click', addToWatched);
    document.querySelector('.queue').addEventListener('click', addToQueue);
  } catch (error) {
    console.log(error.message);
  }
  offModalLoader();
}

function getPosterUrl(poster_path) {
  if (poster_path) {
    posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  } else {
    posterUrl = './images/no-image-icon-23485.png';
  }

  return posterUrl;
}

async function renderCard({
  popularity,
  genres,
  poster_path,
  vote_average,
  vote_count,
  title,
  overview,
}) {
  getPosterUrl(poster_path);

  const card = `      
    <img src="${posterUrl}" alt="descr" class='card_img'>
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
  refs.cardEl.innerHTML = card;

  // console.log(obj)
}

function onModalClose() {
  refs.backdrop.classList.add('is-hidden');

  document.querySelector('.watched').removeEventListener('click', addToWatched);
  document.querySelector('.queue').removeEventListener('click', addToQueue);
}
