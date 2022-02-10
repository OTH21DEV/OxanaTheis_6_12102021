import { CreateMedia } from "../factories/CreateMedia.js";
import { Likes } from "../factories/Likes.js";

class FilterDropdown{
    constructor(photographe, photographeMedias){
        this.photographe = photographe;
        this.photographeMedias = photographeMedias;
        this.display();
    }
  display = () =>{

  
    const mediaContainer = document.querySelector(".galery-photo");
    const totalLikesContainer = document.querySelector(".total-wrapper");
  
    //on defini element select de la form
    const filterSelect = document.querySelector("#listbox");
  
    //on ecoute le changement des options
    filterSelect.addEventListener("change", (e) => {
      //on cree une variable pour recuperer la valeur de l'option choisie
      let choice = filterSelect.value;
  
      //(a-b) > 0 "a" a un indice superieur à b
      //(a-b) < 0 "a" a un indice inferieur à b
      //(a-b) === 0 les positions ne changent pas
  
      if (choice == "popularité") {
        function compare(a, b) {
          if (a.likes > b.likes) return -1;
          if (b.likes > a.likes) return 1;
        }
        //on reinitialise à 0 le contenu de l'element qui contient media
        mediaContainer.innerHTML = "";
  
        //on apelle la fonction compare() sur l'array de media
        this.photographeMedias.sort(compare);
      } else if (choice == "date") {
        function compare(a, b) {
          if (a.date > b.date) {
            return 1;
          }
          if (b.date > a.date) {
            return -1;
          }
        }
        mediaContainer.innerHTML = "";
        this.photographeMedias.sort(compare);
      } else if (choice == "titre") {
        function compare(a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (b.title > a.title) {
            return -1;
          }
        }
        mediaContainer.innerHTML = "";
        this.photographeMedias.sort(compare);
      }
  
      this.photographeMedias.forEach((media, currentMedia) => {
      // createMedia(media, photographe, currentMedia);
      new CreateMedia(media, this.photographe, currentMedia);
     
      });
      //on efface le conteur (etabli avant le filtre)
      totalLikesContainer.innerHTML = "";
      //on apelle la class Likes pour reconstruire des likes y compris nouveau conteur
      new Likes();
    });
  }
}
  export{FilterDropdown}