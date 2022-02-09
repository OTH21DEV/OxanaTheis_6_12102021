import { photographe } from "../pages/photographe.js";

class Likes {
  constructor() {
    this.photographe = photographe;
    this.createTotalLikesContainer();
    this.addLikesOnClick();
    this.addLikesKeyboard();
    this.likesCounter();
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
  };

  //methode-fonction de la logique qu'on apelle au click ou clavier
  addLikes = (target) => {
    //target en parametre pour recuperer l'element choisi ici - i heart
    let heartId = target.dataset.id;

    //on associe le nb de Likes de media à chaque heart via data-like = "${media.likes}" dans la function createMedia
    //on recupere la valeur
    let addLike = target.dataset.like;

    // on cree une variable et on incremente pour obtenir la nouvelle valeur
    let likes = parseInt(addLike) + 1;

    //sessionStorage.setItem("clickedLikes", likes);

    // document.getElementById(`${heartId}`).setAttribute('data-newlike', likes)

    document.getElementById(`${heartId}`).innerHTML = likes;

    //on reedite l'element de dom avec l'id et la nouvelle valeur puis on apelle cette function dans la function createMedia
    //document.getElementById(`${heartId}`).innerHTML = likes;

    this.likesCounter();
  };
  //methode-fonction rajout de like au click
  addLikesOnClick = () => {
    const hearts = document.querySelectorAll(".heart i");

    hearts.forEach((heart) => {
      heart.addEventListener("click", (e) => {
        this.addLikes(heart);
      });
    });
  };

  //methode-fonction rajout de like au clavier

  addLikesKeyboard = () => {
    /*on cible element a en rajoutant la class au prealable 
 car lors de l'venement clavier le focus se trouve pas 
 sur icone de coeur mais sur le a 
 */
    let parents = document.querySelectorAll(".heart-link");

    parents.forEach((parent) => {
      //on rajoute un evenement au niveau de chaque a
      parent.addEventListener("keydown", (e) => {
        //on cible l'enfant de l'element a - icone coeur
        let children = parent.childNodes[1].childNodes[0];
        //on pass en parametre icone
        if (e.key == "Enter") {
          this.addLikes(children);
        }
      });
    });
  };

  likesCounter = () => {
    //on recupere tous les elements
    let mediaLikes = document.querySelectorAll(".nb-likes");
    let totalLikes = document.querySelector(".total__likes");
    //on met le compteur à 0
    let counter = null;
    mediaLikes.forEach((amount) => {
      //pour chaque element on recupere la valeur via .textContent (+ pour convertir en nombre )
      //amount = Number(amount.textContent);
      amount = +amount.textContent;
      //on incremente
      counter += amount;
      //on reedite l'element de dom avec la nouvelle valeur puis on apelle cette fonction dans le fetch mais aussi dans la function clickLikes()
      totalLikes.innerHTML =
        counter + '<i class="fas fa-heart">' + "</i>" + "</p>";
    });
  };

  //........................................................
}

export { Likes };
