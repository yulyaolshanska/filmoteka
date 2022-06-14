import NewsApiService from './api-service';
import getRefs from './getRefs';

const newsApiService = new NewsApiService();

const refs = {
  form: document.querySelector('.form'),
  formInput: document.querySelector('.form__field'),
  formButton: document.querySelector('.form__btn'),
}

const filmsContainer = getRefs().ulEl;
console.log(filmsContainer);

// console.log(refs.form);
// console.log(refs.formInput);
// console.log(refs.formButton);
refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  // console.log('onsubmit');
  const { elements: { searchQuery: { value } } } = e.target;
  console.log(value);
  newsApiService.resetPage();
  newsApiService.query = value;

  const data = await newsApiService.fetchSerchQuery();
  
  const getData = data.data.results;

  const resultData = getData.map(item => {
    return {
      'id': item.id,
      'poster_path': item.poster_path,
      'original_title': item.original_title,
      'title': item.title,
      'genre_ids': item.genre_ids,
      'release_date': new Date(item.release_date).getFullYear(),
    }
  });

  console.log(getData);
  console.log(resultData);

  return resultData;
}

async function onSerchQuery() {
    
    try {
        // newsApiService.searchQuery = refs.input.value;
      newsApiService.resetPage();
      
      newsApiService.query = 'hustle';

      console.log(newsApiService.query);
   
      const data = await newsApiService.fetchSerchQuery();
      console.dir(data.data.results[0].release_date); 
      const response = data.data.results;
        const releaseYear = new Date(response[0].release_date).getFullYear();
       
        console.dir(releaseYear);
        console.log('Пошук за ключовим словом:', response);
      // getRenderQuery(response,releaseYear); 
   
          
      } catch (error) {
        // onFetchError()  
        console.dir(error)
      }          
}


