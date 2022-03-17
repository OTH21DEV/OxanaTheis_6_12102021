import { Media } from "../factories/Media.js";

import { photographeMedias } from "../pages/photographe.js";

const modal = document.querySelector(".modal");
let lightboxContainer = document.querySelector(".lightbox__container");

const btnClose = document.querySelector(".lightbox__close .fa-times");
const next = document.querySelector(".lightbox__next .fa-chevron-right");
const prev = document.querySelector(".lightbox__prev .fa-chevron-left");

const medias = document.querySelectorAll(".galery-photo__img img, .galery-photo__img video");

class Lightbox {
  constructor(media, photographe, currentMedia, photographeMedias) {
    this.media = media;
    this.photographeMedias = photographeMedias;
    this.photographe = photographe;
    this.currentMedia = currentMedia;
    this.loadMedia();
    this.next();
    this.prev();
    this.clickCloseMedia();
    this.onKeyup();
  }
  loadMedia = () => {
    //btn contactez -moi (position absolute ) restait visible dans le lightbox
    document.querySelector(".contact").style.visibility = "hidden";
    modal.style.visibility = "visible";

    //pour lecteur NVDA
    document.querySelector(".main").setAttribute("aria-hidden", "true");

    modal.focus();
    // document.querySelector(".lightbox__prev").focus()

    let clickedMedia = new Media(this.photographeMedias[this.currentMedia], this.photographe);
    lightboxContainer.innerHTML = clickedMedia.displayLightbox();
  };
  //methode d'affichage next media
  nextMedia = () => {
    this.currentMedia++;

    if (this.currentMedia === this.photographeMedias.length) {
      this.currentMedia = 0;
    }

    let nextMedia = new Media(this.photographeMedias[this.currentMedia], this.photographe);

    lightboxContainer.innerHTML = nextMedia.displayLightbox();
  };
  //methode d'affichage prev media
  prevMedia = () => {
    this.currentMedia -= 1;

    if (this.currentMedia < 0) {
      this.currentMedia = this.photographeMedias.length - 1;
    }

    let prevMedia = new Media(this.photographeMedias[this.currentMedia], this.photographe);
    // on affiche cette nouvelle media
    lightboxContainer.innerHTML = prevMedia.displayLightbox();
  };
  //methode de fermeture media
  closeMedia = () => {
    modal.style.visibility = "hidden";
    //pour lecteur NVDA
    document.querySelector(".main").setAttribute("aria-hidden", "false");
    document.querySelector(".contact").style.visibility = "visible";
  };
  //appel de la methode nextMedia au click
  next = () => {
    next.addEventListener("click", (e) => {
      this.nextMedia();
    });
  };
  //appel de la methode prevMedia au click
  prev = () => {
    prev.addEventListener("click", (e) => {
      //this -Lightbox
      this.prevMedia();
    });
  };
  //appel de la methode closeMedia() au click
  clickCloseMedia = () => {
    btnClose.addEventListener("click", (e) => {
      //this -Lightbox
      this.closeMedia();
    });
  };

  /*
  methode de navigation avec Tab
  on definie si l'element actif (ciblé avec tab) est la fleche droite/gauche ou close, puis
  on apelle la methode de l'affichage de next, prev , close
  */
  
  tabNavigation = () => {
    if (document.activeElement === document.querySelector(".fa-chevron-left") || document.activeElement === document.querySelector(".fa-chevron-left","::before")) {
      this.prevMedia();
   
    }
    if (
      document.activeElement === document.querySelector(".fa-chevron-right")
    ) {
      this.nextMedia();
    }
    if (document.activeElement === document.querySelector(".fa-times")) {
      this.closeMedia();
    }
    console.log(document.activeElement.parentElement)
   
  };

/*
  tabNavigation = (e) => {
    console.log(document.activeElement.childNodes[7]);
    console.log(document.activeElement);
    
  //  if (document.activeElement.childNodes[7] === document.querySelector(".lightbox__prev")) {
   //   this.prevMedia();
   
    }
    
    if (document.activeElement.childNodes[7]) {
      this.prevMedia();
    }

    if (document.activeElement === document.querySelector(".fa-chevron-right")) {
      this.nextMedia();
    }
    if (document.activeElement === document.querySelector(".fa-times")) {
      this.closeMedia();
    }
  };
*/
  //.............................

  /*evenement clavier avec appel des methodes (evenement enter se declanche automatiquement 
  car considére comme click lors de l'appel loadMedia)
  */
  onKeyup = () => {
    window.addEventListener("keydown", (e) => {
      console.log(console.log(e));
      if (e.key == "ArrowRight") {
        this.nextMedia();
      }
      if (e.key == "ArrowLeft") {
        this.prevMedia();
      }

      if (e.key == "Escape") {
        this.closeMedia();
      }
      //pour la navigation avec tab

      if (e.key == "Enter") {
        this.tabNavigation();
      }

      /*
      if (e.key === "Tab") {

  this.tabNavigation();
  //  this.prevMedia()
  
      }

    */
    });

    //.........................
  };
}
export { Lightbox };
