
const KEY = `476dab1d501621899284a1a134c160d7`;
const movie_id = 705861;
let posterUrl = ``;
const refs = {
    btnOpen: document.querySelector('[data-open]'),
    btnClose: document.querySelector('[data-button_close]'),
    backdrop: document.querySelector('.backdrop'),
    modal: document.querySelector('.modal'), 
    cardEl: document.querySelector('.card'),
    watchedBtn: document.querySelector('[data-watched]'),
    queueBtn: document.querySelector('[data-queue]'),    
}

function fetchApi(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`)
    .then (response => {
        if (!response.ok) {
            throw new Error(response.status);
          }
         
        return response.json()})
}

refs.btnOpen.addEventListener('click', onModalOpen);


function onModalOpen (event) {
    console.log(event.target); 
    refs.backdrop.classList.remove("is-hidden");
    fetchRenderCard(movie_id);
    refs.btnClose.addEventListener('click', onModalClose);

    document.addEventListener('keydown', function (e) {
        if(e.keyCode === 27) {
            refs.backdrop.classList.add("is-hidden");
        };
      }); 
};

async function fetchRenderCard(movie_id) {
   try {
    const fetcData = await fetchApi(movie_id);
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

    const card = `
      
    <img src="${posterUrl}" alt="descr">
    <h1>${title}</h1>
    <ul>
        <li>Vote/Votes<span>${vote_average}/${vote_count} </span></li>
        <li>Popularity<span>${popularity} </span></li>
        <li>Original title<span>${title} </span></li>
        <li>Genre<span>${genres.map((genre)=> {return genre.name}).join(', ')}</span></li>    
    </ul>
    <h2>ABOUT</h2>
    <P>${overview}</P>`;
        // ДОбавить проверку на колличество жанров
    refs.cardEl.insertAdjacentHTML("beforeend", card);
};

function onModalClose() {
    refs.backdrop.classList.toggle("is-hidden");    
}

// refs.watchedBtn.addEventListener('click', addToWatched);
// refs.queueBtn.addEventListener('click', addToQueue);

