import getRefs from './getRefs';
const refs = getRefs();

refs.team.addEventListener(`click`, onTeamModalOpen);

function onTeamModalOpen() {
refs.backdropTeam.classList.remove('is-hidden');
refs.btnModalTeamClose.addEventListener('click', onTeamModalClose);

}

function onTeamModalClose() {
    refs.backdropTeam.classList.add('is-hidden');
}

window.addEventListener(`keydown`, onEscClose);
window.addEventListener(`click`, onBackdropClose);

function onEscClose(event) {
    if(event.code === "Escape") {
        onTeamModalClose();
  }
}

function onBackdropClose(event) {
    if (event.target === refs.backdropTeam) {   
      onTeamModalClose();  
  }
}

