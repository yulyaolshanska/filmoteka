
const KEY = `476dab1d501621899284a1a134c160d7`;
export let fetcData = {};
let posterUrl = ``;
const refs = {
   btnClose: document.querySelector('[data-button_close]'),
    backdrop: document.querySelector('.backdrop'),
    modal: document.querySelector('.modal'), 
    cardEl: document.querySelector('.card'),
    watchedBtn: document.querySelector('[data-watched]'),
    queueBtn: document.querySelector('[data-queue]'),  
    ulEl: document.querySelector('.films-collection'),
}

// let obj = {};
function fetchApi(movieId) {
    return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`)
    .then (response => {
        if (!response.ok) {
            throw new Error(response.status);
          }
         
        return response.json()})
}

refs.ulEl.addEventListener('click', onModalOpen);


function onModalOpen (event) {
    let movieId = null;
    let link = event.target.closest('.film-link');
    if (!link){
        return;
    }
    movieId = link.getAttribute('id');
   
    refs.backdrop.classList.remove("is-hidden");
    fetchRenderCard(movieId);
    refs.btnClose.addEventListener('click', onModalClose);

    document.addEventListener('keydown', function (e) {
        if(e.keyCode === 27) {
            onModalClose();
        };
      }); 

    refs.backdrop.addEventListener('click', (e) => 
     {if (!e.target.closest('.modal')) {
        onModalClose();
     }})
    
};

async function fetchRenderCard(movieId) {
   try {
       fetcData = await fetchApi(movieId);
    renderCard(fetcData)
   }

   catch (error) {console.log(error.message)}
}
function getPosterUrl(poster_path) {
    if (poster_path){
        posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
    } else {
        posterUrl = './images/no-image-icon-23485.png';
    }

    return posterUrl;
}

function renderCard({popularity, genres, poster_path, vote_average, vote_count, title, overview}) {
    getPosterUrl(poster_path);
    // obj.title = title;
    const card = `
      
    <img src="${posterUrl}" alt="descr">
    <div class="Thumb"
    <h1>${title}</h1>
    <ul>
        <li>Vote/Votes<span>${vote_average}/${vote_count} </span></li>
        <li>Popularity<span>${popularity} </span></li>
        <li>Original title<span>${title} </span></li>
        <li>Genre<span>${genres.map((genre)=> {return genre.name}).join(', ')}</span></li>    
    </ul>
    <h2>ABOUT</h2>
    <P>${overview}</P>
    </div>`;
    
        // ДОбавить проверку на колличество жанров
    refs.cardEl.insertAdjacentHTML("beforeend", card);
    // console.log(obj)
};

function onModalClose() {
    refs.backdrop.classList.add("is-hidden");   
    refs.cardEl.innerHTML ='';
};



// refs.watchedBtn.addEventListener('click', addToWatched);
// refs.queueBtn.addEventListener('click', addToQueue);

