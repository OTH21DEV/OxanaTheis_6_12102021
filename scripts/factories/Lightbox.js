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
    this.loadMedia = () => {
      modal.style.visibility = "visible";
      let clickedMedia = new Media(this.media, this.photographe);
      lightboxContainer.innerHTML = clickedMedia.displayLightbox();
    };

    this.next = () => {
      next.addEventListener("click", (e) => {
        this.currentMedia++;

        if (this.currentMedia === this.photographeMedias.length) {
          this.currentMedia = 0;
        }

        let nextMedia = new Media(
          this.photographeMedias[this.currentMedia],
          this.photographe
        );

        lightboxContainer.innerHTML = nextMedia.displayLightbox();
      });
    };

    this.prev = () => {
      prev.addEventListener("click", (e) => {
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
      });
    };

    this.close = () => {
      btnClose.addEventListener("click", function (e) {
        modal.style.visibility = "hidden";
        
      });
    };

    this.onKeyup = (e) => {
       // media.addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
          this.loadMedia();
        }

        if (e.key == "ArrowRight") {
          this.next();
        }
        if (e.key == "ArrowLeft") {
          this.prev();
        }

        if (e.key == "Escape") {
          this.close();
        }
      //});
    };
  }
}

export { Lightbox };
