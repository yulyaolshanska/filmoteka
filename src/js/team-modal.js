import getRefs from './getRefs';
const refs = getRefs();

//const refs = {
//    team: document.querySelector(`.team-modal`),
//}

//console.log(refs.team);
//console.log(refs.backdropTeam);


refs.team.addEventListener(`click`, onTeamModalOpen);

function onTeamModalOpen() {
refs.backdropTeam.classList.remove('is-hidden');
refs.btnModalTeamClose.addEventListener('click', onTeamModalClose);

}

function onTeamModalClose() {
    refs.backdropTeam.classList.add('is-hidden');
}