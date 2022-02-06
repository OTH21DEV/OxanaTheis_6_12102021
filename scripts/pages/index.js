import { Photographer_index } from "../factories/Photographer_index.js";

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
      new Photographer_index(photographe);
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

// Filtre de tags depuis la page d'accuel -menu de navigation

function filterTags(data) {
  let navLink = document.querySelectorAll(".category__link");
  //On rajoute eventlistener click pour chaque tag
  navLink.forEach((link) => {
    //console.log(link)
    link.addEventListener("click", (e) => {
      //on cree une variable qui recupere le nom de tag (en la mettant en minuscule et enlevant #)

      let element = e.target.text.toLowerCase().replace("#", "");

      //On cree une condition pour verifier si le tag clické est present parmi les tags de chaque photographe

      checkTag(data, element);
    });
  });
}

/*
  methode pour recherche par tag pour inclure dans filterTags(),  filterPhotographeTags(data)
  On cree une condition pour verifier si le tag clické est present parmi les tags de chaque photographe
*/

function checkTag(data, element) {
  //on applique la methode .filter au parametre data ( photographersData) pour acceder au contenu de chaque photographe -photographeProfile
  data.filter((photographe) => {
    //on recupere element de dom <article> en attribuant nouveau id -photographe.id
    //On pointe l'element de photographe sur le DOM ( en rajoutant au prealable dans la class de cet element un id (chiffre) )
    let profile = document.getElementById("photographer-" + photographe.id);
//on cree une variable qui recupere le nom de tag (en la mettant en minuscule et enlevant #)
 //    element = e.target.text.toLowerCase().replace("#", "");
    //on verifie si les tags de photographe comprennent la valeur de l'element clické
    if (photographe.tags.includes(element)) {
      profile.style.display = "flex";
      document.querySelector("#cont_phtographer").style.justifyContent =
        "center";
    } else {
      profile.style.display = "none";
    }
  });
}

//...................................................................................................

function filterPhotographeTags(data) {
  let photographeLinks = document.querySelectorAll(".photographer-profile__li");

  photographeLinks.forEach((photographeLink) => {
    photographeLink.addEventListener("click", (e) => {
     let element = e.target.text.toLowerCase().replace("#", "");

      checkTag(data, element);
    });
  });
}

function filterTagsFromPhotographePage(data) {
  let element = sessionStorage.tag;

  checkTag(data, element);
}
export { photographe };
