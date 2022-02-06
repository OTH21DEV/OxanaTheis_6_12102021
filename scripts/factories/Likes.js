//import { likesCounter } from "../pages/photographe.js";

class Likes {
  constructor() {
    this.addLikesOnClick();
    this.addLikesKeyboard();
  }

  //methode-fonction de la logique qu'on apelle au click ou clavier
  addLikes = (e) => {
    //e en parametre pour recuperer l'element choisi ici - i heart
    let heartId = e.dataset.id;
//console.log(e)
    //on associe le nb de Likes de media à chaque heart via data-like = "${media.likes}" dans la function createMedia
    //on recupere la valeur
    let addLike = e.dataset.like;

    // on cree une variable et on incremente pour obtenir la nouvelle valeur
    let likes = parseInt(addLike) + 1;
    //................
    //sessionStorage.setItem("clickedLikes", likes);

    document.getElementById(`${heartId}`).setAttribute('data-newlike', likes)



//.............................................................
//document.getElementById(`${heartId}`).innerHTML = test;
    document.getElementById(`${heartId}`).innerHTML = likes;

    //.................

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
    window.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        this.addLikes(e.target.querySelector("i"));
      }
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
}

export { Likes };
