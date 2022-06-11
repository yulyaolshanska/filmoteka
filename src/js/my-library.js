let watchedFilms = [];

function AddToWatched() {
    const filmToAdd = {name: "BBBB", id: "112",};
    watchedFilms.push(filmToAdd);
    localStorage.setItem("watched-films", JSON.stringify(filmToAdd));
    // onRenderFilmCard(watchedFilms);
    console.log("ggggg")
   
}

function getWatched() {
    try {
         if (localStorage.getItem("watched-films")) {
             watchedFilms = JSON.parse(localStorage.getItem("watched-films"));
    }
    } catch (error) {
        console.log(error);
        watchedFilms = [];
    }
   
}

AddToWatched()
