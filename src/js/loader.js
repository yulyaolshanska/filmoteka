import getRefs from './getRefs';

const refs = getRefs();

export const onLoader = () => {
  refs.loaderBlock.classList.add('loader-block');
};
export const offLoader = () => {
  refs.loaderBlock.classList.remove('loader-block');
};
export const onModalLoader = () => {
  refs.Modalloader.classList.add('loader-block');
};
export const offModalLoader = () => {
  refs.Modalloader.classList.remove('loader-block');
};
