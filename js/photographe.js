//Import de Factory pattern Media depuis le fichier Media.js

import { Media } from "./Media.js";
import { createForm } from "./modal.js";

//sans i dans media

//import{ openLightbox} from "./testLightBox.js"
import { Lightbox } from "./Lightbox.js";
import { navigateKeyboard } from "./testLightBox.js";
import { currentMedia } from "./testLightBox.js";

//..............................................................................................

// recupere les datas depuis.json
const linkToJson = "./FishEyeData.json";

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
    //console.log(queryString );
    //on parce le chemin
    let urlParams = new URLSearchParams(queryString);
    //console.log(urlParams);

    //on recupere ici 'id ' donné à <a> dans le script.js (href="./MimiKeel.html?id=${data.id}") (function createPhotographe) pour chaque photographe
    const idTag = urlParams.get("id");

    let photographe = photographersData.filter((photographe) => {
      return photographe.id == idTag;
    })[0];

    let photographeMedias = [];
    //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
    photographeMedias = mediaData.filter((media) => {
      return photographe.id == media.photographerId;
    });

    // console.log(photographe.id);
    //on cree le photographe si son id (de .json) correspond au idTag (id) recuperé dans le lien url
    // if (photographe.id == idTag) {
    createPhtotographer(photographe, photographersData);
    createForm(photographe);
    createTotalLikesContainer(photographe);
    //.................................

    //on rajoute variable index dans la boucle initiale (media of MediaData) ainsi que.entries pour pouvoir recuperer l'index de media dans l'ouverture de lightbox
    let currentMedia = 0;
    for (let media of mediaData) {
      if (media.photographerId == idTag) {
        //filterPopular(media);

        createMedia(media, photographe, currentMedia);

        currentMedia++;
      }
    }
    //..................................................

    likesCounter();

    filterDropdown(photographe, photographeMedias);

    filterTagsOnPhotographePage();

    // openLightbox(photographe, photographeMedias)
    //  navigateKeyboard(photographe, photographeMedias);
  })

  .catch(function (err) {
    console.log(err);
  });

//..................................

//..................................................................................

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
  const mediaContainer = document.querySelector(".galery-photo");
  //on cree une variable factoryMedia pour recuperer class Media depuis Media.js
  let factoryMedia = new Media(media, photographe);
  let article = document.createElement("article");

  article.innerHTML =
    factoryMedia.display() +
    `<div class="galery-photo-title">
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
    "</div>" +
    "</article> ";
  mediaContainer.appendChild(article);
  //let test = new Lightbox(media, photographe, currentMedia);

  article.addEventListener("click", (e) => {
    let loadedMedia = new Lightbox(media, photographe);
    loadedMedia.loadMedia(media, photographe);
   // loadedMedia.next();

    console.log(currentMedia)
  });
}
/*
  mediaContainer.innerHTML +=
  //`<article data-mediaIndex="${i}">` +
// `<article>` +
    
    
    //choiseMedia(media, photographe)
    // on utilise methode display pour afficher la bonne source si image ou video depuis le constructor
    factoryMedia.display() +
    `<div class="galery-photo-title">
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
    "</div>" +
    "</article> ";

  addLikesOnClick();
*/

//addLikesKeyboard();
//}

//......................................
//TEST

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

      likesCounter();

      // test();
    });
  });
}
//....................................................................................
//

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

//...................................................................................................
/*
function choiseMedia(media, photographe) {
  if (media.image) {
    return `
    <a href="#">
    <p class="galery-photo__img">
      <img src="photo_video/${photographe.path}/${media.image}" />
    </p>
  </a>
    
    `;
  } else if (media.video) {
    return `
    <a href="#">
    <p class="galery-photo__img">
      <video controls src="photo_video/${photographe.path}/${media.video}" />
    </p>
  </a>`;
  }
  
}
*/
//.......................................................................
/*
function createLightbox(photographe, photographeMedias) {
  const modal = document.querySelector(".modal");

  //const pour cibler img et video de photographe
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );

  const next = document.querySelector(".lightbox__next .fa-chevron-right");
  const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
  const close = document.querySelector(".lightbox__close .fa-times");
/*
  
  // let mediaActive;
  let photographeMedias = [];
  //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
  photographeMedias = mediaData.filter((media) => {
    return photographe.id == media.photographerId;
  });*/
/*
  medias.forEach((media, i) => {
    media.addEventListener("click", (e) => {
      openLightbox(photographe, photographeMedias, i);
    });
  });
//............................................................................................................

//.......................................................................................................

  next.addEventListener("click", (e) => {
    //on apelle cette fonction pour executer au click
    showRightInLightbox(photographe, photographeMedias);
  });

  prev.addEventListener("click", (e) => {
    //on apelle cette fonction pour executer au click

    showLeftInLightbox(photographe, photographeMedias);
  });

  close.addEventListener("click", (e) => {
    //on associe à la fonction la fermeture de lightbox pour la recuperer dans la fonction navigateKeyboard()

    cancelInLightBox();
  });
  //...........................................................................................................
}

//..............................................................................


function openLightbox(photographe, photographeMedias, i) {
  const modal = document.querySelector(".modal");
  let lightboxContainer = modal.querySelector(".lightbox__container");
  //sessionStorage.setItem - stock une paire clé/valeur ici "index", i(number)

  sessionStorage.setItem("index", i);

  modal.style.visibility = "visible";

 
  console.log(i)

  let clickedMedia = new Media(photographeMedias[i], photographe);

  lightboxContainer.innerHTML = clickedMedia.displayLightbox();
  //lightboxContainer.innerHTML += `<p>${photographeMedias[i].title}</p>`
}
//..........................................................................
*/

//................................................................ .....................................

/*function cancelInLightBox() {
  const modal = document.querySelector(".modal");
  modal.style.visibility = "hidden";
}*/
//............................................................................

//.......................................................................
/*
function showRightInLightbox(photographe, photographeMedias) {
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );
  const modal = document.querySelector(".modal");
  let lightboxContainer = modal.querySelector(".lightbox__container");
  //on associe la variable showRight à la fonction pour la logique de l'affichage next media afin de la recuperer dans la fonction navigateKeyboard()
let newIndex = parseInt(sessionStorage.getItem("index")) + 1;
  // sessionStorage.getItem - retourne la valeur associée à une clé ici - "index"
  // on parseInt pour convertir une chaine de caractères en nombre entier
  // 

  //console.log(sessionStorage)
  //console.log(sessionStorage.index)
  //currentMedia+=1;
  currentMedia++;
  console.log(currentMedia);
  //console.log(photographeMedias.length)
  //si on essaye afficher le media suivant suite au dernier media , on cree une condition pour afficher le premier media

  // affichageLightbox(tableau_medias[mediaActive]);

  if (currentMedia >= photographeMedias.length - 1) {
    currentMedia = 0;
  }

  //on attribue une nouvelle valeur à la clé "index" , ici  newIndex
  // sessionStorage.setItem("index", newIndex);

  //on cree une variable pour nouvelle Media avec la bonne index recupéree en session storage en parametre
  // let nextMedia = new Media(photographeMedias[newIndex], photographe);
  let nextMedia = new Media(photographeMedias[currentMedia], photographe);
  //console.log(photographeMedias[currentMedia])
  // console.log(photographeMedias[newIndex])
  // on affiche cette nouvelle media
  //  lightboxContainer.innerHTML = nextMedia.displayLightbox();
  lightboxContainer.innerHTML = nextMedia.displayLightbox();
}*/
//.........................................................................................................
/*function showLeftInLightbox(photographe, photographeMedias) {
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );
  const modal = document.querySelector(".modal");
  let lightboxContainer = modal.querySelector(".lightbox__container");
  //on associe la variable showLight à la fonction pour la logique de l'affichage prev media afin de la recuperer dans la fonction navigateKeyboard()
  let newIndex = parseInt(sessionStorage.getItem("index")) - 1;

  //si on n'a pas de media
  if (newIndex < 0) {
    // on recepure la longeur totale de tableau medias donc dernier media du tableau -1
    newIndex = photographeMedias.length - 1;
  }
  //on attribue une nouvelle valeur à la clé "index" , ici  newIndex
  sessionStorage.setItem("index", newIndex);

  //on cree une variable pour nouvelle Media avec la bonne index recupéree en session storage en parametre
  let prevMedia = new Media(photographeMedias[newIndex], photographe);
  // on affiche cette nouvelle media
  lightboxContainer.innerHTML = prevMedia.displayLightbox();
}*/
//...........................................................................................................
/*
function navigateKeyboard(photographe, photographeMedias) {
  //etant donnéé la varibale photographeMedias n'est pas connue, on recree le tableau medias afin de la mettre dans le parametre de la function  showRightInLightbox(photographe, photographeMedias)
  // let photographeMedias = [];

  //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
  /* photographeMedias = mediaData.filter((media) => {
    return photographe.id == media.photographerId;
  });*/
/*
  window.addEventListener("keydown", function (e) {
    //let parent = e.target.parentNode;
    //let i = parent.dataset.mediaindex;
    //openLightbox(photographe, photographeMedias, i)
    if (e.key == "Enter") {
     
  
   
      console.log(photographeMedias[currentMedia]);
      console.log(currentMedia);
   //  openLightbox(photographe, photographeMedias);
    }

    if (e.key == "ArrowRight") {
      showRightInLightbox(photographe, photographeMedias);
    }
    if (e.key == "ArrowLeft") {
      showLeftInLightbox(photographe, photographeMedias);
    }

    if (e.key == "Escape") {
      cancelInLightBox();
      cancelModalKeyboard();
    }
  });
}
*/
//............................................................................

function filterDropdown(photographe, photographeMedias) {
  const mediaContainer = document.querySelector(".galery-photo");

  //on defini element select de la form
  const filterSelect = document.querySelector("#listbox");
  /*
  //on cree un array vide de medias de photographe
  let photographeMedias = [];
  //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
  photographeMedias = mediaData.filter((media) => {
    return photographe.id == media.photographerId;
  });*/
  //on ecoute le changement des options
  filterSelect.addEventListener("change", (e) => {
    //  console.log(photographeMedias);
    //on cree une variable pour recuperer la valeur de l'option choisie
    let choice = filterSelect.value;

    //(a-b) > 0 "a" a un indice superieur à b
    //(a-b) < 0 "a" a un indice inferieur à b
    //(a-b) === 0 les positions ne changent pas

    if (choice == "popularité") {
      function compare(a, b) {
        if (a.likes > b.likes) return -1;
        if (b.likes > a.likes) return 1;

        // return 0;
      }
      //on reinitialise à 0 le contenu de l'element qui contient media
      mediaContainer.innerHTML = "";

      //on apelle la fonction compare() sur l'array de media
      photographeMedias.sort(compare);

      //on recree chaque media du tableau filtré plus haut
      /*
      photographeMedias.forEach((media) => {
        createMedia(media, photographe);
      });
*/
    } else if (choice == "date") {
      function compare(a, b) {
        if (a.date > b.date) {
          return 1;
        }
        if (b.date > a.date) {
          return -1;
        }
        // return 0;
      }
      mediaContainer.innerHTML = "";
      photographeMedias.sort(compare);

      /*
      photographeMedias.forEach((media) => {
        createMedia(media, photographe);
      });*/
    } else if (choice == "titre") {
      function compare(a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (b.title > a.title) {
          return -1;
        }

        // return 0;
      }
      mediaContainer.innerHTML = "";
      photographeMedias.sort(compare);
    }

    photographeMedias.forEach((media, i) => {
      createMedia(media, photographe);

      openLightbox(photographe, photographeMedias);
    });

    // openLightbox(photographe, photographeMedias)

    //on recree lightbox pour l'affichage apres le filtre
    //createLightbox(photographe, photographeMedias);
  });

  //console.log(photographe)
  //console.log(photographeMedias)
}
//....................................

/*
      function compare(a, b) {
        let comparison = 0;
        // (a-b) > 0 "a" a un indice superieur à b
        if (a.likes > b.likes) {
          comparison = 1; // ou juste return 1

          // (a-b) < 0 "a" a un indice inferieur à b
        } else if (a.likes < b.likes) {
          comparison = -1; // ou juste return -1
        }
        // (a-b) === 0 les positions ne changent pas
        return comparison; // ou juste return 0
      }
    } else if (choice == "date") {
      function compare(a, b) {
        let comparison = 0;
        if (a.date > b.date) {
          comparison = 1; // ou juste return 1
        } else if (a.date < b.date) {
          comparison = -1; // ou juste return -1
        }

        return comparison;
      }
    } else if (choice == "titre") {
      function compare(a, b) {
        let comparison = 0;
        if (a.title > b.title) {
          comparison = 1; // ou juste return 1
        } else if (a.title < b.title) {
          comparison = -1; // ou juste return -1
        }

        return comparison;
      }*/

//on reinitialise à 0 le contenu de l'element qui contient media
/*
    mediaContainer.innerHTML = "";

    //on apelle la fonction compare() sur l'array de media
    photographeMedias.sort(compare);

    //on recree chaque media du tableau filtré plus haut
    photographeMedias.forEach((media) => {
      createMedia(media, photographe);
    });
  });*/

//..........................................................................................................
