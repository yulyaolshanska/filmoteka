const KEY = `476dab1d501621899284a1a134c160d7`;
const movie_id = 598896;
const refs = {
    btnOpen: document.querySelector('[data-open]'),
    backdrop: document.querySelector('.backdrop'),
    modal: document.querySelector('.modal'), 
    watchedBtn: document.querySelector('[data-watched]'),
    queueBtn: document.querySelector('[data-queue]'),
 }

function fetchApi(id) {
    return fetch(`https://api.themoviedb.org/3/movie/598896?api_key=${KEY}`)
    .then (response => {
        if (!response.ok) {
            throw new Error(response.status);
          }
         
        return response.json()})
}

refs.btnOpen.addEventListener('click', onModalOpen);


function onModalOpen (event) {
    console.log(event.target);
    fetchRenderCard();
    // ПАРАМЕТР?

};

async function fetchRenderCard(data) {
   try {
    const fetcData = await fetchApi(data);
    // PARAMS
    renderCard(fetcData)
    // PARAM???
   }

   catch (error) {console.log(error.message)}
}

function renderCard(data) {
    
    const list = data.map(({backdrop_path, genres, poster_path, release_date, vote_average, title}) => {return `<img src=${poster_path} alt="descr">
    <h1>${title}</h1>
    <ul>
        <li>voit 456</li>
        <li>popularity 46</li>
        <li>orig title hjkhj</li>
        <li>genre western</li>
    </ul>
    <h2>ABOUT</h2>
    <P>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat, beatae officia eius ad facere </P>
    
    <button type="button" data-watched>watched</button>
    <button type="button" data-queue>queue</button>`}).join('');
    refs.modal.insertAdjacentHTML("beforeend", list);
};

// refs.watchedBtn.addEventListener('click', onSaveWatchedDataLocal);
// refs.queueBtn.addEventListener('click', onSaveQueueDataLocal);


