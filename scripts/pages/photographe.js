//Import de Factory pattern Media depuis le fichier Media.js

import { Media } from "../factories/Media.js";
import { createForm } from "../utils/contactForm.js";

import { Lightbox } from "../factories/Lightbox.js";

import { PhotographerProfile } from "../factories/PhotographerProfile.js";
import { Likes } from "../factories/Likes.js";
import { CreateMedia } from "../factories/CreateMedia.js";
import { FilterDropdown } from "../factories/FilterDropdown.js";

//..............................................................................................

// recupere les datas depuis.json
const linkToJson = "./data/FishEyeData.json";
let photographeMedias = [];
let photographe;
let currentMedia;
const hearts = document.querySelectorAll(".heart i");
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
    //new PhotographerProfile_page(photographe, photographeMedias);

    let photographerProfile = new PhotographerProfile();
    photographerProfile.createPhotographer(photographe);
    photographerProfile.filterTagsOnPhotographePage();

    createForm(photographe);

    //on rajoute variable index dans la boucle initiale (media of MediaData) ainsi que.entries pour pouvoir recuperer l'index de media dans l'ouverture de lightbox
    currentMedia = 0;
    //creation de media avec index= currentMedia
    photographeMedias.forEach((media) => {
      /*
      createMedia(media, photographe, currentMedia);

      currentMedia++;
*/

      new CreateMedia(media, photographe, currentMedia);
      //newMedia.display();
      currentMedia++;
    });

    //filterDropdown(photographe, photographeMedias);
    new FilterDropdown(photographe, photographeMedias);
    

    new Likes();
  })

  .catch(function (err) {
    console.log(err);
  });


export { photographeMedias };
export { photographe };
