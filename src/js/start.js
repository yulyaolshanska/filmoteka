import NewsApiService from './api-service';
import trendResultList from '../templates/poster.hbs';

export default class Start extends NewsApiService {
  constructor() {
    super();
  }

  async renderMainCollection(genres) {
    const finalData = await this.getData(genres);
    
    super.getRefs().filmsContainer.innerHTML = trendResultList(finalData);
    super.firstUpdated();
  }

  async getData(genres) {
  
    try {

      super.resetPage();
  
      const data = await super.fetchTrend();
      
      return super.getFinalData(data, genres);
      
    } catch (error) {
      console.dir(error)
    }
  }
}