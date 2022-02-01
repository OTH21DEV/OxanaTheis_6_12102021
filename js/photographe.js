//Import de Factory pattern Media depuis le fichier Media.js

import { Media } from "./Media.js";
import { createForm } from "./modal.js";

import { Lightbox } from "./Lightbox.js";

//..............................................................................................

// recupere les datas depuis.json
const linkToJson = "./FishEyeData.json";
let photographeMedias = [];

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
    let photographe = photographersData.filter((photographe) => {
      return photographe.id == idTag;
    })[0];

    //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
    photographeMedias = mediaData.filter((media) => {
      return photographe.id == media.photographerId;
    });

    createPhtotographer(photographe, photographersData);
    createForm(photographe);
    createTotalLikesContainer(photographe);
    //.................................

    //on rajoute variable index dans la boucle initiale (media of MediaData) ainsi que.entries pour pouvoir recuperer l'index de media dans l'ouverture de lightbox
    let currentMedia = 0;
    for (let media of mediaData) {
      if (media.photographerId == idTag) {
        createMedia(media, photographe, currentMedia);

        currentMedia++;
      }
    }

    likesCounter();

    filterDropdown(photographe, photographeMedias);

    filterTagsOnPhotographePage();
  })

  .catch(function (err) {
    console.log(err);
  });

function createPhtotographer(data) {
  const container = document.querySelector(".test");

  let tagHtml = "";
  for (let tag of data.tags) {
    tagHtml += `  <li><a class = "photographer-profile__li"  >#${tag}</a></li>`;
  }

  container.innerHTML += ` <article id = "tt" class="photographer-profile photographer-profile--page">
    <a href="#">
      <h2
        class="
          photographer-profile__name photographer-profile__name--page
        "
      >
      ${data.name}
      </h2></a
    >
    <a
      class="
        photographer-profile__title photographer-profile__title--page
      "
      href="#"
    >
      <h3>${data.city}, ${data.country}</h3>
      <p>${data.tagline}</p>
    </a>

    <nav class="photographer-profile__nav">
      <ul class="tes">
      ${tagHtml}
      </ul>
    </nav>
  </article>

  <a class="photographer-profile__img" href="/MimiKeel.html">
    <img
      class="
        photographer-profile__photo photographer-profile__photo--small
      "
      src="photo_video/Photographers ID Photos/${data.portrait}"
      alt="photo de  ${data.name}"
    />
  </a>`;
}
//......................................................................
function filterTagsOnPhotographePage(data) {
  let photographeLinks = document.querySelectorAll(".photographer-profile__li");

  photographeLinks.forEach((photographeLink) => {
    photographeLink.addEventListener("click", (e) => {
      let clickedTag = e.target.text.toLowerCase().replace("#", "");
      sessionStorage.setItem("tag", clickedTag);

      photographeLink.href = "index.html";
      // on complete la logique de filtrage par une fonction "filterPhotographeTagsFromPhotographe page" sur script.js
    });
  });
}

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
    let loadedMedia = new Lightbox(media, photographe);
    loadedMedia.loadMedia(media, photographe, currentMedia);
    loadedMedia.next(currentMedia, photographeMedias, photographe);
    loadedMedia.prev(currentMedia, photographeMedias, photographe);
    loadedMedia.close(e);

    loadedMedia.onKeyup(media, photographe, e, currentMedia, photographeMedias);

    console.log(currentMedia);
  });

  addLikesOnClick();
  // addLikesKeyboard()
}

//Mouse and keyboard events

function addLikesOnClick() {
  const hearts = document.querySelectorAll(".heart i");

  hearts.forEach((heart) => {
    heart.addEventListener("click", (e) => {
      //on associe Id de media à chaque heart via data-id = "${media.id}" dans la function createMedia
      //on recupere cet Id

      let heartId = heart.dataset.id;

      //on associe le nb de Likes de media à chaque heart via data-like = "${media.likes}" dans la function createMedia
      //on recupere la valeur
      let addLike = heart.dataset.like;
      // on cree une variable et on incremente pour obtenir la nouvelle valeur
      let likes = parseInt(addLike) + 1;
      //on reedite l'element de dom avec l'id et la nouvelle valeur puis on apelle cette function dans la function createMedia
      document.getElementById(`${heartId}`).innerHTML = likes;

      // addLikesKeyboard()
      likesCounter();
    });
  });
}
//....................................................................................

function addLikesKeyboard() {
  window.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      let heartId = e.target.querySelector("i").dataset.id;
      let addLike = e.target.querySelector("i").dataset.like;
      let likes = parseInt(addLike) + 1;
      document.getElementById(`${heartId}`).innerHTML = likes;

      likesCounter();
    }
  });
}

//................................................................................
function createTotalLikesContainer(data) {
  const totalLikesContainer = document.querySelector(".total-wrapper");

  totalLikesContainer.innerHTML +=
    '<div class = "total">' +
    '<p class="total__likes">' +
    '<i class="fas fa-heart">' +
    "</i>" +
    "</p>" +
    '<p class="total__price">' +
    data.price +
    "€ / jour" +
    "</p>" +
    "</div>" +
    "</div>";
}

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
    });
  });
}

export { photographeMedias };
