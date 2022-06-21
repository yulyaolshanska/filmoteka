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
      document
        .querySelector('.film-description')
        .classList.add('film-description--dark');
      document.querySelector('.film-name').classList.add('film-name--dark');
      document
      .querySelector('footer')
      .classList.add('footer--dark');
      document
      .querySelector('.footer__text')
      .classList.add('footer__text--dark');
    document.querySelector('.film-name').classList.add('film-name--dark');
    

      // document.querySelector('footer').classList.add('dark');
      document.querySelector('.themetoggle span').textContent = 'dark_mode';
    } else {
      document.querySelector('body').classList.remove('dark');
      document
        .querySelector('.container--bg-color')
        .classList.remove('container--bg-color-dark');
      document
        .querySelector('.film-description')
        .classList.remove('film-description--dark');
      document.querySelector('.film-name').classList.remove('film-name--dark');
      document
      .querySelector('footer')
      .classList.remove('footer--dark');
      document
      .querySelector('.footer__text')
      .classList.remove('footer__text--dark');
      document.querySelector('.themetoggle span').textContent = 'wb_sunny';
    }
  } catch (err) {}
}
