import listOfCards from '../templates/poster.hbs';
import searchList from '../templates/search.hbs';

export default function getTemplates() {
  return {
    listOfCards(data) {
      listOfCards(data);
    },
    searchList(data) {
      searchList(data);
    },
  }
}