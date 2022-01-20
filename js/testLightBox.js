export{openLightbox}
import { Media } from "./Media.js";
export{currentMedia}

let currentMedia;
/*
const medias = document.querySelectorAll(
  ".galery-photo__img img, .galery-photo__img video"
);
  const next = document.querySelector(".lightbox__next .fa-chevron-right");
  const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
  const close = document.querySelector(".lightbox__close .fa-times");
  const modal = document.querySelector(".modal");*/
 // let lightboxContainer = modal.querySelector(".lightbox__container");

function openLightbox(photographe, photographeMedias) {
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );
    const next = document.querySelector(".lightbox__next .fa-chevron-right");
    const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
    const close = document.querySelector(".lightbox__close .fa-times");
    const modal = document.querySelector(".modal");
   
    let lightboxContainer = modal.querySelector(".lightbox__container");
   // console.log(photographeMedias);
  
    medias.forEach((media, i) => {
      media.addEventListener("click", (e) => {
        currentMedia = i, 
     //   console.log(currentMedia);
    
      //  console.log(photographeMedias[currentMedia]);
        //sessionStorage.setItem - stock une paire clé/valeur ici "index", i(number)
  
        // sessionStorage.setItem("index", i);
  
        modal.style.visibility = "visible";
  
        let clickedMedia = new Media(
          photographeMedias[currentMedia],
          photographe
        );
  
        lightboxContainer.innerHTML = clickedMedia.displayLightbox();
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

  function showRightInLightbox(photographe, photographeMedias) {
  
    const modal = document.querySelector(".modal");
    let lightboxContainer = modal.querySelector(".lightbox__container");
 
    //on associe la variable showRight à la fonction pour la logique de l'affichage next media afin de la recuperer dans la fonction navigateKeyboard()
  
    // sessionStorage.getItem - retourne la valeur associée à une clé ici - "index"
    // on parseInt pour convertir une chaine de caractères en nombre entier
    // let newIndex = parseInt(sessionStorage.getItem("index")) + 1;
  
    //console.log(sessionStorage)
    //console.log(sessionStorage.index)
    //currentMedia+=1;
   currentMedia++;
    console.log(currentMedia);
    //console.log(photographeMedias.length)
    //si on essaye afficher le media suivant suite au dernier media , on cree une condition pour afficher le premier media
  
    // affichageLightbox(tableau_medias[mediaActive]);
  
    if (currentMedia === photographeMedias.length ) {
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
  }
  function showLeftInLightbox(photographe, photographeMedias) {
    const medias = document.querySelectorAll(
      ".galery-photo__img img, .galery-photo__img video"
    );
    const modal = document.querySelector(".modal");
    let lightboxContainer = modal.querySelector(".lightbox__container");
    //on associe la variable showLight à la fonction pour la logique de l'affichage prev media afin de la recuperer dans la fonction navigateKeyboard()
  //  let newIndex = parseInt(sessionStorage.getItem("index")) - 1;
  currentMedia-=1;
    //si on n'a pas de media
    if (currentMedia < 0) {
      // on recepure la longeur totale de tableau medias donc dernier media du tableau -1
      currentMedia = photographeMedias.length - 1;
    }
    //on attribue une nouvelle valeur à la clé "index" , ici  newIndex
   // sessionStorage.setItem("index", newIndex);
  
    //on cree une variable pour nouvelle Media avec la bonne index recupéree en session storage en parametre
    let prevMedia = new Media(photographeMedias[currentMedia], photographe);
    // on affiche cette nouvelle media
    lightboxContainer.innerHTML = prevMedia.displayLightbox();
  }
  function cancelInLightBox() {
    const modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
  }