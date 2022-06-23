document.querySelector('.themetoggle').addEventListener('click', event => {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
});

export function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('body').classList.add('dark');
      
      document
        .querySelector('.container--bg-color')
        .classList.add('container--bg-color-dark');
        
      let descripFilm = document.querySelectorAll('.film-description');
        descripFilm.forEach((el) => {
          el.classList.add("film-description--dark");
        });
      
      let nameFilm = document.querySelectorAll('.film-name');
        nameFilm.forEach((el) => {
          el.classList.add("film-name--dark");
        });
  
      document
      .querySelector('footer')
      .classList.add('footer--dark');
      
      document
      .querySelector('.footer__text')
      .classList.add('footer__text--dark');
   
      document
        .querySelector('.team-modal')
        .classList.add('team-modal--dark');
    
      document.querySelector('.themetoggle span').textContent = 'dark_mode';
      document
        .querySelector('.nothing')
        .classList.add('nothing--dark');
      
    } 
    else {
      document.querySelector('body').classList.remove('dark');
      
      document
        .querySelector('.container--bg-color')
        .classList.remove('container--bg-color-dark');
        
      let descripFilm = document.querySelectorAll('.film-description');
        descripFilm.forEach((el) => {
          el.classList.remove("film-description--dark");});
          
      let nameFilm = document.querySelectorAll('.film-name');
          nameFilm.forEach((el) => {
            el.classList.remove("film-name--dark");
          });
      
      document
      .querySelector('footer')
      .classList.remove('footer--dark');
      
      document
      .querySelector('.footer__text')
      .classList.remove('footer__text--dark');
           document
        .querySelector('.nothing')
        .classList.remove('nothing--dark');
      document.querySelector('.themetoggle span').textContent = 'wb_sunny';
    }
  } catch (err) {}
}