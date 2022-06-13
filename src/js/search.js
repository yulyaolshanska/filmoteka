import NewsApiService from './api-service';

const newsApiService = new NewsApiService();

const refs = {
  form: document.querySelector('.form'),
  formInput: document.querySelector('.form__field'),
  formButton: document.querySelector('.form__btn'),
}

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
  console.log(data.data.resu);
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


