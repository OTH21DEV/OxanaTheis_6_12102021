import { Media } from "../factories/Media.js";

import { photographeMedias } from "../pages/photographe.js";

const modal = document.querySelector(".modal");
let lightboxContainer = document.querySelector(".lightbox__container");

const btnClose = document.querySelector(".lightbox__close .fa-times");
const next = document.querySelector(".lightbox__next .fa-chevron-right");
const prev = document.querySelector(".lightbox__prev .fa-chevron-left");

const medias = document.querySelectorAll(
  ".galery-photo__img img, .galery-photo__img video"
);

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
    modal.style.visibility = "visible";
    modal.focus();
    /*
    modal.addEventListener("focus", (e) => {
      modal.classList.add("focused");
    });
*/

    let clickedMedia = new Media(
      this.photographeMedias[this.currentMedia],
      this.photographe
    );
    lightboxContainer.innerHTML = clickedMedia.displayLightbox();
  };
  //methode d'affichage next media
  nextMedia = () => {
    this.currentMedia++;

    if (this.currentMedia === this.photographeMedias.length) {
      this.currentMedia = 0;
    }

    let nextMedia = new Media(
      this.photographeMedias[this.currentMedia],
      this.photographe
    );

    lightboxContainer.innerHTML = nextMedia.displayLightbox();
  };
  //methode d'affichage prev media
  prevMedia = () => {
    this.currentMedia -= 1;

    if (this.currentMedia < 0) {
      this.currentMedia = this.photographeMedias.length - 1;
    }

    let prevMedia = new Media(
      this.photographeMedias[this.currentMedia],
      this.photographe
    );
    // on affiche cette nouvelle media
    lightboxContainer.innerHTML = prevMedia.displayLightbox();
  };
  //methode de fermeture media
  closeMedia = () => {
    modal.style.visibility = "hidden";
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

  //test navigation avec Tab

  tabNavigation = () => {
    if (document.activeElement === document.querySelector(".testt")) {
      // if (e.key == "Enter") {
      this.prevMedia();
    }
    //}
  };

  //.............................

  /*evenement clavier avec appel des methodes (evenement enter se declanche automatiquement 
  car considére comme click lors de l'appel loadMedia)
  */
  onKeyup = () => {
    window.addEventListener("keydown", (e) => {
      if (e.key == "ArrowRight") {
        this.nextMedia();
      }
      if (e.key == "ArrowLeft") {
        this.prevMedia();
      }

      if (e.key == "Escape") {
        this.closeMedia();
      }
      if (e.key == "Tab") {
        console.log(document.activeElement);
        
      }
    });
  };
}
export { Lightbox };

