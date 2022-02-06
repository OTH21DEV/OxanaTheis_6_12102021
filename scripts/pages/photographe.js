//Import de Factory pattern Media depuis le fichier Media.js

import { Media } from "../factories/Media.js";

import { createForm } from "../utils/contactForm.js";

import { Lightbox } from "../factories/Lightbox.js";
import { Photographer } from "../factories/Photographer.js";
import { Likes } from "../factories/Likes.js";
import { Counter } from "../factories/Counter.js";

//..............................................................................................

// recupere les datas depuis.json
const linkToJson = "./data/FishEyeData.json";
let photographeMedias = [];
let photographe;
let currentMedia;
//let photographersData;

fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  .then(function (value) {
    // donnes de chaque photographe
    const photographersData = value.photographers;
    // données de media
    const mediaData = value.media;

    //on recupere le lien
    let queryString = window.location.search;

    //on parce le chemin
    let urlParams = new URLSearchParams(queryString);

    //on recupere ici 'id ' donné à <a> dans le script.js (href="./MimiKeel.html?id=${data.id}") (function createPhotographe) pour chaque photographe
    const idTag = urlParams.get("id");
    //on cree le photographe si son id (de .json) correspond au idTag (id) recuperé dans le lien url

    photographe = photographersData.filter((photographe) => {
      return photographe.id == idTag;
    })[0];

    //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
    photographeMedias = mediaData.filter((media) => {
      return photographe.id == media.photographerId;
    });
    //appel class Photographer
    new Photographer(photographe, photographeMedias);

    createForm(photographe);

    //on rajoute variable index dans la boucle initiale (media of MediaData) ainsi que.entries pour pouvoir recuperer l'index de media dans l'ouverture de lightbox
    currentMedia = 0;
    //creation de media avec index= currentMedia
    photographeMedias.forEach((media) => {
      createMedia(media, photographe, currentMedia);

      currentMedia++;

      //new Likes();
    });

    filterDropdown(photographe, photographeMedias);

    new Counter(photographe);
  
  })

  .catch(function (err) {
    console.log(err);
  });

//.....................................................................
function createMedia(media, photographe, currentMedia) {
  //parametre photographe recupere path (prenom de phtographe depuis .json pour creer le chemin dynamiqument)

  //on cree une variable factoryMedia pour recuperer class Media depuis Media.js
  let factoryMedia = new Media(media, photographe);
  let article = document.createElement("article");

  let mediaTitle = document.createElement("div");
  mediaTitle.classList.add("galery-photo-title");

  let wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");

  document.querySelector(".galery-photo").appendChild(wrapper);
  wrapper.appendChild(article);
  wrapper.appendChild(mediaTitle);

  article.innerHTML = factoryMedia.display();

  mediaTitle.innerHTML =
    `
  <a href="#">
<p> 
 ${media.title} 
  </p>
  </a>
  <div class="galery-photo-like">
  <a href="#">
  <p class = "nb-likes" id = "${media.id}" >
 ${media.likes}
  </p>
  </a>
  <a href="#">
  <p class = "heart">` +
    `<i class="fas fa-heart" data-id = "${media.id}" data-like = "${media.likes}"></i>` +
    "</p>" +
    " </a>" +
    "</div>" +
    "</div>";



  article.addEventListener("click", (e) => {
   new Lightbox(
      media,
      photographe,
      currentMedia,
      photographeMedias
    );
  });
  //apelle de class Likes pour chaque media

  
  
  new Likes();
  let test = document.querySelector('.nb-likes');

 
  // addLikesOnClick();
  //addLikesKeyboard();
}

//Mouse and keyboard events
/*
function addLikes(target) {
  let heartId = target.dataset.id;

  //on associe le nb de Likes de media à chaque heart via data-like = "${media.likes}" dans la function createMedia
  //on recupere la valeur
  let addLike = target.dataset.like;
  // on cree une variable et on incremente pour obtenir la nouvelle valeur
  let likes = parseInt(addLike) + 1;
  //on reedite l'element de dom avec l'id et la nouvelle valeur puis on apelle cette function dans la function createMedia
  document.getElementById(`${heartId}`).innerHTML = likes;

  // addLikesKeyboard()
  likesCounter();
}

function addLikesOnClick() {
  const hearts = document.querySelectorAll(".heart i");

  hearts.forEach((heart) => {
    heart.addEventListener("click", (e) => {
      addLikes(heart);
    });
  });
}

function addLikesKeyboard() {
  window.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      addLikes(e.target.querySelector("i"));
    }
  });
}
*/
//................................................................................

function likesCounter() {
  //on recupere tous les elements
  let mediaLikes = document.querySelectorAll(".nb-likes");
  let totalLikes = document.querySelector(".total__likes");
  //on met le compteur à 0
  let counter = 0;
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
}

function filterDropdown(photographe, photographeMedias) {
  const mediaContainer = document.querySelector(".galery-photo");

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
      photographeMedias.sort(compare);
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
      photographeMedias.sort(compare);
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
      photographeMedias.sort(compare);
    }

    photographeMedias.forEach((media, currentMedia) => {
     createMedia(media, photographe, currentMedia);
      new Likes();
    });
  });
}

export { photographeMedias };
export { photographe };

