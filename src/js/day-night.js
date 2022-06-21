document.querySelector('.themetoggle').addEventListener('click', event => {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
});

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('body').classList.add('dark');
      // document.querySelector('main').classList.add('dark');
      document.querySelector('footer').classList.add('dark');
      document.querySelector('.themetoggle span').textContent = 'dark_mode';
    } else {
      document.querySelector('body').classList.remove('dark');
      document.querySelector('.themetoggle span').textContent = 'wb_sunny';
    }
  } catch (err) {}
}

addDarkClassToHTML();
