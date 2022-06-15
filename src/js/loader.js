import getRefs from './getRefs';

const refs = getRefs();

const onLoader = () => {
  refs.loader.classList.add('loader-block');
};
const offLoader = () => {
  refs.loader.classList.remove('loader-block');
};

export { onLoader, offLoader };
