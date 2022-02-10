
import { PhotographerProfile } from "../factories/PhotographerProfile.js";
import {filterTags,filterPhotographeTags,filterTagsFromPhotographePage} from "../utils/filterTags.js"

// recupere les datas depuis.json

const linkToJson = "./data/FishEyeData.json";
let photographersData;
let photographe;

fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  .then(function (value) {
    photographersData = value.photographers; // donnes de photographes array et objets
    const mediaData = value.media; // données de media

    for (photographe of photographersData) {
    
      //creation de la gallery de photographe 
     let gallery = new PhotographerProfile();
     gallery.createGallery(photographe);
    }
    filterTags(photographersData);
   
    //On controle les données de sessionStorage pour filtre de Tags (soit depuis la page de photographe soit depuis la page d'accueil)
    let data = sessionStorage.getItem("tag");

    if (data == null) {
      filterPhotographeTags(photographersData);
    } else if (data.length > 0) {
      filterTagsFromPhotographePage(photographersData);
      sessionStorage.clear();
      filterPhotographeTags(photographersData);
    }
  })

  .catch(function (err) {
    console.log(err);
  });



export { photographe };
