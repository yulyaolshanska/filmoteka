import NewsApiService from './api-service';
import getRefs from './getRefs';

import listOfCards from '../templates/poster.hbs';
import { onLoader, offLoader } from './loader';

// =========================================================

const newsApiService = new NewsApiService();
const refs = getRefs();

let cardArr = [];
// ===============================================================
export async function onSerchQuery() {
  try {
    newsApiService.resetPage();

    const data = await newsApiService.fetchSerchQuery();

    const response = data.data.results;

    getRenderQuery(response);
  } catch (error) {
    // onFetchError()
    console.dir(error);
  }
}

// використовуємо результати запиту з класу class NewsApiService файлу api-service.js
// передаємо результат запиту далі аргументом у  await getDataCard(movies);
// =============================================
export async function onTrend() {
  try {
    newsApiService.resetPage();
    onLoader();

    const data = await newsApiService.fetchTrend();
    const movies = data.data.results;

    await getDataCard(movies);
    offLoader();
    return movies;
  } catch (error) {
    // onFetchError()
    console.dir(error);
  }
  offLoader();
}

export async function onScroll() {
  try {
   
    // onLoader();

    const data = await newsApiService.fetchTrend();
    const movies = data.data.results;

    await getDataCard(movies);
    // offLoader();
    return  movies;
  } catch (error) {
    // onFetchError()
    console.dir(error);
  }
  // offLoader();
}

export function incrementPage() {
  newsApiService.incrementPage();
}

// onTrend();

// окремо отримуємо запит  масив жанри {name,id}  genres: [{id: 28, name: "Action"}, ...]
export async function getGenresById() {
  try {
    const response = await newsApiService.fetchGenres();
    const genres = response.data.genres;

    return genres;
  } catch (error) {
    // onFetchError()
    console.dir(error);
  }
}

export async function getDataCard(movies) {
  let cardData = {};
  try {
    getGenresById().then(genres => {
      // використовуємо getGenresById().then() у середині якого використовуємо дані з  async function onTrend()
      //  передаємо масив cardArr за допомогою: getRenderQuery(cardArr);
      // ===========================================

      cardData = movies.forEach(
        ({
          id,
          poster_path,
          original_title,
          title,
          genre_ids,
          release_date,
        }) => {
          let gName = [];

          let fullYear = new Date(release_date).getFullYear();

          genres.map(genres => {
            genre_ids.map(itemId => {
              if (itemId === genres.id) {
                gName.push(genres.name);
                if (gName.length > 2) {
                  gName = gName.slice(0, 2);
                  gName[2] = 'Other';
                }
              }
            });
          });

          cardData = {
            id: id,
            poster_path: poster_path,
            original_title: original_title,
            title: title,
            genre_ids: gName.join(', '),
            release_date: fullYear,
          };

          cardArr.push(cardData);
        }
      );

      //  console.log('жанри:', genres);

      getRenderQuery(cardArr);
      return cardArr;
    });
  } catch (error) {
    console.dir(error);
  }
}

// рендеримо з шаблону дані, які отримуємо з getDataCard()
// ======================================
export function getRenderQuery(dataCard) {
  // console.log(dataCard)

  refs.ul.insertAdjacentHTML('beforeend', listOfCards(dataCard));
}
