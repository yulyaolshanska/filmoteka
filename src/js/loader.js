import getRefs from './getRefs';
export { onLoader, offLoader };

const refs = getRefs();

const onLoader = () => {
  refs.loader.classList.add('loader-block');
};
const offLoader = () => {
  refs.loader.classList.remove('loader-block');
};
