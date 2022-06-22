import getRefs from './getRefs';
const refs = getRefs();

refs.team.addEventListener(`click`, onTeamModalOpen);

function onTeamModalOpen() {
refs.backdropTeam.classList.remove('is-hidden');
refs.btnModalTeamClose.addEventListener('click', onTeamModalClose);
document.querySelector('main').classList.add('blur');
document.querySelector('header').classList.add('blur');
document.querySelector('footer').classList.add('blur');
document.querySelector('body').classList.add('fixed');

}

function onTeamModalClose() {
refs.backdropTeam.classList.add('is-hidden');
document.querySelector('main').classList.remove('blur');
document.querySelector('header').classList.remove('blur');
document.querySelector('footer').classList.remove('blur');
document.querySelector('body').classList.remove('fixed');
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

