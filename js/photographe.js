//Import de Factory pattern Media depuis le fichier Media.js

import { Media } from "/js/Media.js";



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
    /*
  
    var m = JSON.parse(fs.readFileSync('FishEyeData.json').toString());
    m.forEach(function(p){
      p.alt = 'photo' + p.name;
    
    })
    fs.writeFile('FishEyeData.json', JSON.stringify(m));

*/
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

    //..............................

    for (let photographe of photographersData) {
      // console.log(photographe.id);
      //on cree le photographe si son id (de .json) correspond au idTag (id) recuperé dans le lien url
      if (photographe.id == idTag) {
        createPhtotographer(photographe, photographersData);
        createForm(photographe);
        createTotalLikesContainer(photographe);
        //.................................

        for (let media of mediaData) {
          if (media.photographerId == idTag) {
            //console.log(media)
            //filterPopular(media);

            createMedia(media, photographe);
          }
        }
        //..................................................
        filterDropdown(photographe, mediaData);

        // navigateKeyboard();

        likesCounter();

        createLightbox(photographe, mediaData); // array cible img/video de photographe
      //  navigateKeyboard(photographe, mediaData);
        //openLightboxOnKeyboard() ;
      }
    }
    //  test();
    filterTagsOnPhotographePage();
  })

  .catch(function (err) {
    console.log(err);
  });
//........................................................................;
/*
let obj = {
  table : []
}
obj.table.push({alt : "test" })
var json =JSON.stringify(obj);
var fs = require ('fs');
fs.writeFile("./FishEyeData.json", json, 'utf8', callback);

fs.readFile("./FishEyeData.json", 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
  obj = JSON.parse(data); //now it an object
  obj.table.Push({alt: test}); //add some data
  json = JSON.stringify(obj); //convert it back to json
  fs.writeFile("./FishEyeData.json", json, 'utf8', callback); // write it back 
}});
*/
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
function createMedia(media, photographe) {
  //parametre photographe recupere path (prenom de phtographe depuis .json pour creer le chemin dynamiqument)
  const mediaContainer = document.querySelector(".galery-photo");
  //on cree une variable factoryMedia pour recuperer class Media depuis Media.js
  let factoryMedia = new Media(media, photographe);

  mediaContainer.innerHTML +=
    "<article>" +
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
  //addLikesKeyboard();
}

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

function createLightbox(photographe, mediaData) {
  const modal = document.querySelector(".modal");

  //const pour cibler img et video de photographe
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );

  const next = document.querySelector(".lightbox__next .fa-chevron-right");
  const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
  const close = document.querySelector(".lightbox__close .fa-times");

  let lightboxContainer = modal.querySelector(".lightbox__container");
 // let mediaActive;
  let photographeMedias = [];
  //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
  photographeMedias = mediaData.filter((media) => {
    return photographe.id == media.photographerId;
  });

  console.log(photographe);

  medias.forEach((media, i) => {
   

   window.addEventListener("keydown", function (e) {
    console.log(e.target)
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
      
      if (e.key == "Enter") {
        openLightbox(photographe, photographeMedias,i) ;
      
      }
    });









    media.addEventListener("click", (e) => {
      //sessionStorage.setItem - stock une paire clé/valeur ici "index", i(number)
      /*
      sessionStorage.setItem("index", i);
    //  modal.style.visibility = "visible";
   
    modal.focus();
    
    mediaActive = i;
    
    let clickedMedia = new Media(photographeMedias[mediaActive], photographe);
    
    lightboxContainer.innerHTML = clickedMedia.display();
    */
    openLightbox(photographe,photographeMedias,i) ;
  });
  });

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
}
//..............................................................................
function openLightbox(photographe,photographeMedias,i) {
 // window.addEventListener("keydown", function (e) {
 // if (e.key == "Enter") {
    const modal = document.querySelector(".modal");
    let lightboxContainer = modal.querySelector(".lightbox__container");
    let mediaActive;
 
   sessionStorage.setItem("index", i);
    //  modal.style.visibility = "visible";
    modal.style.visibility = "visible";
   
    modal.focus();

    
    let clickedMedia = new Media(photographeMedias[i], photographe);
    
    lightboxContainer.innerHTML = clickedMedia.display();
    console.log(photographeMedias[i])
    console.log(clickedMedia)
    
  }
//})}
//......................................................................................................
function cancelInLightBox() {
  const modal = document.querySelector(".modal");
  modal.style.visibility = "hidden";
}
//............................................................................

//.......................................................................
function showRightInLightbox(photographe, photographeMedias) {
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );
  const modal = document.querySelector(".modal");
  let lightboxContainer = modal.querySelector(".lightbox__container");
  //on associe la variable showRight à la fonction pour la logique de l'affichage next media afin de la recuperer dans la fonction navigateKeyboard()

  // sessionStorage.getItem - retourne la valeur associée à une clé ici - "index"
  // on parseInt pour convertir une chaine de caractères en nombre entier
  let newIndex = parseInt(sessionStorage.getItem("index")) + 1;

  //si on essaye afficher le media suivant suite au dernier media , on cree une condition pour afficher le premier media

  if (newIndex >= photographeMedias.length - 1) {
    newIndex = 0;
  }

  //on attribue une nouvelle valeur à la clé "index" , ici  newIndex
  sessionStorage.setItem("index", newIndex);

  //on cree une variable pour nouvelle Media avec la bonne index recupéree en session storage en parametre
  let nextMedia = new Media(photographeMedias[newIndex], photographe);
  // on affiche cette nouvelle media
  lightboxContainer.innerHTML = nextMedia.display();
}
//.........................................................................................................
function showLeftInLightbox(photographe, photographeMedias) {
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
  lightboxContainer.innerHTML = prevMedia.display();
}
//...........................................................................................................
function navigateKeyboard(photographe, mediaData) {
  //etant donnéé la varibale photographeMedias n'est pas connue, on recree le tableau medias afin de la mettre dans le parametre de la function  showRightInLightbox(photographe, photographeMedias)
  let photographeMedias = [];
  let i;
  //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
  photographeMedias = mediaData.filter((media) => {
   
    return photographe.id == media.photographerId;
  });
 
  window.addEventListener("keydown", function (e) {
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
    
    if (e.key == "Enter") {
      openLightbox(photographe, photographeMedias,i) ;
    
    }
  });
}

//............................................................................

function filterDropdown(photographe, mediaData) {
  const mediaContainer = document.querySelector(".galery-photo");

  //on defini element select de la form
  const filterSelect = document.querySelector("#listbox");

  //on ecoute le changement des options
  filterSelect.addEventListener("change", (e) => {
    //on cree un array vide de medias de photographe
    let photographeMedias = [];
    //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
    photographeMedias = mediaData.filter((media) => {
      return photographe.id == media.photographerId;
    });

    console.log(photographeMedias);
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

/*
      photographeMedias.forEach((media) => {
        createMedia(media, photographe);
      });*/
    }
    photographeMedias.forEach((media) => {
      createMedia(media, photographe);
    })
    createLightbox(photographe, photographeMedias);
    //on recree lightbox pour l'affichage apres le filtre
  });
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
function createForm(data) {
  const formModal = document.querySelector(".form-modal");
  const contactBtn = document.querySelector("#contact");
  formModal.innerHTML = ` <p >
  <form class ='form' method="post" action="traitement.php">
  <div class="form-modal__title">
  <h2>Contactez-moi</h2>
  <span><i class="fas fa-times form-modal__close" id = 'close'></i></span>
  </div>
  <h3>${data.name}</h3>
  <div
  class="prenom-formData">
  <label for="prenom">Prénom</label>
  <input type="text" name= "prenom"  id = "prenom"/>
  <span class="error"></span>
  </div>
  <div class="nom-formData">
  <label for="nom">Nom</label>
  <input type="text" name= "nom" id = "nom"/>
  <span class="error"></span>
  </div>
  <div class="email-formData">
  <label for="email">Email</label>
  <input type="email" name= "email" id = "email"/>
  <span class="error"></span>
  </div>
  <label for="message">Votre message</label>
  <textarea name = "message" id = "message"></textarea>
  </p>
  <div class="form-modal-btn">
  <button type="button" class="form__btn contact__btn" id= "btn-modal">Envoyer</button>
  </div>
  </form>
  `;
  const inputs = document.querySelectorAll(
    'input[type ="text"], input[type="email"]'
  );

  const prenom = document.getElementById("prenom");

  const btnModal = document.getElementById("btn-modal");
  const nom = document.getElementById("nom");
  const email = document.getElementById("email");
  const close = document.getElementById("close");

  contactBtn.addEventListener("click", (e) => {
    formModal.style.visibility = "visible";
    prenom.focus();
  });

  close.addEventListener("click", (e) => {
    //formModal.style.visibility = "hidden";
    cancelModalKeyboard();
  });

  //.............................................................................

  //............................................................................................
  const errorDisplay = (tag, message, valid) => {
    // message de chaque champs (se trouve dans le span )

    const spanMsg = document.querySelector("." + tag + "-formData > span");

    // pointe le nom de champs
    const global = document.querySelector("." + tag + "-formData");

    if (!valid) {
      global.classList.add("error");
      spanMsg.textContent = message;
    } else {
      global.classList.remove("error");
      spanMsg.textContent = message;
    }
  };
  //.................................................................................................
  const nameChecker = (type, value, element) => {
    if (value.length > 0 && (value.length < 3 || value.length > 20)) {
      errorDisplay(
        type,
        "Le " + type + " doit contenir entre 3 et 20 caracteres"
      );

      element.style.border = "3px solid maroon";
    } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
      errorDisplay(
        type,
        "Le " + type + "  ne doit pas contenir de caracteres speciaux"
      );

      element.style.border = "3px solid maroon";
    } else {
      errorDisplay(type, "", true);
      errorDisplay.textContent = "";
      element.style.border = "3px solid green";
    }
  };
  //....................................................................................................
  const emailChecker = (value, element) => {
    if (
      !value.match(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      )
    ) {
      errorDisplay("email", "Adresse mail non valide");
      element.style.border = "3px solid maroon";
    } else {
      errorDisplay("email", "", true);
      element.style.border = "3px solid green";
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (
        e.target.id //test la valeur de champs
      ) {
        case "prenom": //si tu es dans le prenom
          //  console.log(e);
          nameChecker("prenom", e.target.value, prenom); //on  analise cette fonction : (nameChecker (avec les arguments comme ceux ci pour les parametres :type, value, element))
          break;

        case "nom":
          nameChecker("nom", e.target.value, nom); // nom ici -  le nom de la variable
          break;

        case "email":
          emailChecker(e.target.value, email);
          break;

        default:
          null;
      }
    });
  });

  btnModal.addEventListener("click", (e) => {
    if (prenom.value == "") {
      errorDisplay("prenom", "Veuillez remplir ce champs");
    }

    if (nom.value == "") {
      errorDisplay("nom", "Veuillez remplir ce champs");
    }

    if (email.value == "") {
      //  e.preventDefault();
      errorDisplay("email", "Veuillez remplir ce champs");
    } else {
      const userData = {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
      };
      console.log(userData);
    }
  });
}
//.............................................................................................
function cancelModalKeyboard() {
  const formModal = document.querySelector(".form-modal");

  formModal.style.visibility = "hidden";
}
