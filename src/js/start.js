import NewsApiService from './api-service';
import trendResultList from '../templates/poster.hbs';

export default class Start extends NewsApiService {
  constructor() {
    super();
   this.upButton = super.getRefs().upButton;
   this.height = window.innerHeight;   
  }

  async renderMainCollection(genres) {
    const finalData = await this.getData(genres);
   
    super.getRefs().filmsContainer.innerHTML = trendResultList(finalData);
  }

  async getData(genres) {
  
    try {
    
      super.resetPage();
  
      // window.addEventListener('scroll', ()=> {
      //   this.height > scrollY ? this.upButton.className ='up-button--is-hidden': this.upButton.className ='up-button' ; 
      // console.log(this.height) 
      // } );

      // this.upButton.addEventListener('click', ()=>{
      //   window.scrollBy({top: -this.height-scrollY, behavior: "smooth",})
      // });
      const data = await super.fetchTrend();
      
      return super.getFinalData(data, genres);
      
    } catch (error) {
      console.dir(error)
    }
  }

  addButtonUp(){

    window.addEventListener('scroll', ()=> {
      this.height > scrollY ? this.upButton.className ='up-button--is-hidden': this.upButton.className ='up-button' ; 
      } );

      this.upButton.addEventListener('click', ()=>{
        window.scrollBy({top: -this.height-scrollY, behavior: "smooth",})
      });
   

   return 
  }

}
// =================================================
// Please, don't hurt my little button. It can returns us to the up of page
// there are: html in modal-card, styles in button.scss

