
export{Lightbox}

class Lightbox{
    constructeur(media, photographe, i ){
        this.media = media;
        this.photographe = photographe;
        this.i = i;
    }

    display() {
        
        const modal = document.querySelector(".modal");
        let lightboxContainer = modal.querySelector(".lightbox__container");
        //sessionStorage.setItem - stock une paire clé/valeur ici "index", i(number)
      
        sessionStorage.setItem("index", i);
      
        modal.style.visibility = "visible";
      
        modal.focus();
      
        let clickedMedia = new Media(photographeMedias[i], photographe);
      
        lightboxContainer.innerHTML = clickedMedia.displayLightbox();
      }

}