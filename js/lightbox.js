import { Media } from "./Media.js";
import { currentMedia } from "./testLightBox.js";
import { photographeMedias } from "./photographe.js";

const modal = document.querySelector(".modal");
let lightboxContainer = modal.querySelector(".lightbox__container");
const medias = Array.from(
  document.querySelectorAll(".galery-photo__img img, .galery-photo__img video")
);
const btnClose = document.querySelector(".lightbox__close .fa-times");
const next = document.querySelector(".lightbox__next .fa-chevron-right");
const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
const close = document.querySelector(".lightbox__close .fa-times");

//TEST3

class Lightbox {
  constructeur(media, photographe) {
    this.media = media;
    this.photographe = photographe;
    this.currentMedia = currentMedia;
  }
  loadMedia(media, photographe) {

    modal.style.visibility = "visible";
    let clickedMedia = new Media(media, photographe);
    lightboxContainer.innerHTML = clickedMedia.displayLightbox();

    
      }
  
  /*
test(){
  modal.style.visibility = "hidden";
}
*/
  close(e) {
   btnClose.addEventListener("click", function (e) {
      modal.style.visibility = "hidden";
//this.test();
    });
  }

  onKeyup(media, photographe, e,currentMedia,photographeMedias) {
    if (e.key == "Enter") {
      this.loadMedia(media, photographe);
    }
    /*
    if (e.key == "ArrowRight") {
      this.next(currentMedia, photographeMedias, photographe);
    }
    */
/*
    if (e.key == "Escape") {
        this.close()
    }
*/
  }
 
  
  next(currentMedia, photographeMedias, photographe) {
    next.addEventListener("click", (e) => {
      currentMedia++;

      if (currentMedia === photographeMedias.length) {
        currentMedia = 0;
      }

      let nextMedia = new Media(photographeMedias[currentMedia], photographe);

      lightboxContainer.innerHTML = nextMedia.displayLightbox();
    });
  }
  
  prev(currentMedia, photographeMedias, photographe){
    prev.addEventListener("click", (e) => {

      currentMedia -= 1;

      if (currentMedia < 0) {
        currentMedia = photographeMedias.length - 1;
      }
    
      let prevMedia = new Media(photographeMedias[currentMedia], photographe);
      // on affiche cette nouvelle media
      lightboxContainer.innerHTML = prevMedia.displayLightbox();
    })
  }
  
}


export { Lightbox };
