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

    //..............................

    for (let photographe of photographersData) {
      // console.log(photographe.id);
      //on cree le photographe si son id (de .json) correspond au idTag (id) recuperé dans le lien url
      if (photographe.id == idTag) {
        createPhtotographer(photographe);
        createForm(photographe);
        createTotalLikesContainer(photographe);
        //.................................

        for (let media of mediaData) {
          if (media.photographerId == idTag) {
            //console.log(media)
            //filterPopular(media);

            createMedia(media, photographe);
            filterPopular(media, photographe, mediaData);
          }
        }
        //..................................................
/*
        photographeMedias = mediaData.filter((media) => {
          return photographe.id == media.photographerId;
        });
        console.log(photographeMedias);.....*/

        createLightbox(); // array cible img/video de photographe
        likesCounter();
      }
    }
  })

  .catch(function (err) {
    console.log(err);
  });

//..................................................................................

function createPhtotographer(data) {
  const container = document.querySelector(".test");

  let tagHtml = "";
  for (let tag of data.tags) {
    tagHtml += `  <li><a class="category__link" href="#">#${tag}</a></li>`;
  }

  container.innerHTML += ` <article class="photographer-profile photographer-profile--page">
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

function createMedia(media, photographe) {
  //parametre photographe recupere path (prenom de phtographe depuis .json pour creer le chemin dynamiqument)
  const mediaContainer = document.querySelector(".galery-photo");

  mediaContainer.innerHTML +=
    "<article>" +
    choiseMedia(media, photographe) +
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

  clickLikes();

  // filterPopular(media)
}

function clickLikes() {
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
    });
  });
}

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
  return;
}
//.......................................................................

function createLightbox() {
  const modal = document.querySelector(".modal");

  //const pour cibler img et video de photographe
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );
  const next = document.querySelector(".lightbox__next .fa-chevron-right");
  const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
  const close = document.querySelector(".lightbox__close .fa-times");

  let lightboxMedia = modal.querySelector(".lightbox__container img");

  medias.forEach((media, i) => {
    //console.log(i)
    media.addEventListener("click", (e) => {
      //sessionStorage.setItem - stock une paire clé/valeur ici "index", i(number)
      sessionStorage.setItem("index", i);
      modal.style.visibility = "visible";
      lightboxMedia.src = media.src;
    });
  });
  next.addEventListener("click", (e) => {
    // sessionStorage.getItem - retourne la valeur associée à une clé ici - "index"
    // on parseInt pour convertir une chaine de caractères en nombre entier
    let newIndex = parseInt(sessionStorage.getItem("index")) + 1;

    //si on essaye afficher le media suivant suite au dernier media , on cree
    //une condition pour afficher le premier media

    if (newIndex >= medias.length) {
      newIndex = 0;
    }

    //on attribue une nouvelle valeur à la clé "index" , ici  newIndex
    sessionStorage.setItem("index", newIndex);

    //on attribue la nouvelle src a l'element lightboxMedia = à la nouvelle valeur de newIndex
    lightboxMedia.src = medias[newIndex].src;
  });

  prev.addEventListener("click", (e) => {
    let newIndex = parseInt(sessionStorage.getItem("index")) - 1;
    //si on n'a pas de media
    if (newIndex < 0) {
      // on recepure la longeur totale de tableau medias donc dernier media du tableau
      newIndex = medias.length;
    }
    //on attribue une nouvelle valeur à la clé "index" , ici  newIndex
    sessionStorage.setItem("index", newIndex);
    //on attribue la nouvelle src a l'element lightboxMedia = à la nouvelle valeur de newIndex
    lightboxMedia.src = medias[newIndex].src;
  });

  close.addEventListener("click", (e) => {
    modal.style.visibility = "hidden";
  });
}

//..........................................................................

function filterPopular(media, photographe, mediaData) {
 
  const mediaContainer = document.querySelector(".galery-photo");

  //on defini element select de la form
  const filterSelect = document.querySelector("#listbox");
  //on cree un array vide de medias de photographe 
  let photographeMedias = [];
  //on remplie le tableau avec de medias de chaque photographe si son id == media.photographerId
  photographeMedias = mediaData.filter((media) => {
    return photographe.id == media.photographerId;
  });
 //console.log(photographeMedias);
  

  //on ecoute le changement des options
  filterSelect.addEventListener("change", (e) => {
    //on cree une variable pour recuperer la valeur de l'option choisie
    let choice = filterSelect.value;

    if (choice == "popularité") {
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

        return comparison; // ou juste return 0
      }
    } else if (choice == "titre") {
      function compare(a, b) {
        let comparison = 0;
        if (a.title > b.title) {
          comparison = 1; // ou juste return 1
        } else if (a.title < b.title) {
          comparison = -1; // ou juste return -1
          console.log(comparison);
        }

        return comparison; // ou juste return 0
      }
    }
    //on reinitialise à 0 le contenu de l'element qui contient media 
    mediaContainer.innerHTML = "";
    //on apelle la fonction compare() sur l'array de media
    photographeMedias.sort(compare);
    //on recree chaque media du tableau filtré plus haut 
    photographeMedias.forEach((media) => {
      createMedia(media, photographe);
     
    });
  });
}

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

  const nom = document.getElementById("nom");
  const email = document.getElementById("email");
  const close = document.getElementById("close");
  contactBtn.addEventListener("click", (e) => {
    formModal.style.visibility = "visible";
  });

  close.addEventListener("click", (e) => {
    formModal.style.visibility = "hidden";
  });
  const btnModal = document.getElementById("btn-modal");
  console.log(btnModal);
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
    let isValid = true;
    console.log(e);
    if (prenom.validity.valueMissing) {
      e.preventDefault();
      isValid = false;
      errorDisplay("prenom", "Veuillez remplir ce champs");
    }
    if (nom.validity.valueMissing) {
      e.preventDefault();
      isValid = false;
      errorDisplay("nom", "Veuillez remplir ce champs");
    }

    if (email.validity.valueMissing) {
      e.preventDefault();

      isValid = false;
      errorDisplay("email", "Veuillez remplir ce champs");
    }

    if (isValid == true) {
      const userData = {
        prenom: prenom.value,
        nom: nom.value,
        email: email.value,
      };
      console.log(userData);
    }
  });
}
