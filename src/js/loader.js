import getRefs from './getRefs';

const refs = getRefs();

export const onLoader = () => {
  refs.loaderBlock.classList.add('loader-block');
};
export const offLoader = () => {
  refs.loaderBlock.classList.remove('loader-block');
};
export const onModalLoader = () => {
  refs.loaderBlock.classList.add('loader-block-modal');
  refs.main.classList.add('blur')
  refs.loader.classList.add('loader-modal')
};
export const offModalLoader = () => {
  refs.loaderBlock.classList.remove('loader-block-modal');
  refs.loader.classList.remove('loader-modal')
  refs.main.classList.remove('blur')
};
