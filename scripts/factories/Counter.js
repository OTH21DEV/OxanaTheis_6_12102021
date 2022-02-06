import { photographe } from "../pages/photographe.js";
import{Likes} from "../factories/Likes.js";

class Counter {
  constructor() {
    this.photographe = photographe;
    this.createTotalLikesContainer();
   // this.likesCounter();
  }

  //methode-fonction pour creer l'element conteneur (photographe en parametre )
  createTotalLikesContainer = () => {
    const totalLikesContainer = document.querySelector(".total-wrapper");

    totalLikesContainer.innerHTML +=
      '<div class = "total">' +
      '<p class="total__likes">' +
      '<i class="fas fa-heart">' +
      "</i>" +
      "</p>" +
      '<p class="total__price">' +
      this.photographe.price +
      "€ / jour" +
      "</p>" +
      "</div>" +
      "</div>";
    let test = new Likes();
    test.likesCounter();

    
  };
  

}
export{Counter}