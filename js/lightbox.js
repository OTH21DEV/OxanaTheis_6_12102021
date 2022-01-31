import { Media } from "./Media.js";
import { currentMedia } from "./testLightBox.js";
const modal = document.querySelector(".modal");
let lightboxContainer = modal.querySelector(".lightbox__container");
const medias = Array.from(
  document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  ))
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
next(media, photographe){
  const medias = Array.from(
    document.querySelectorAll(
      ".galery-photo__img img, .galery-photo__img video"
    ))
  if (currentMedia === medias.length) {
    console.log(medias)
    currentMedia = 0;
  }

  //let nextMedia = new Media(medias[currentMedia], photographe);

  //lightboxContainer.innerHTML = nextMedia.displayLightbox();
}*/

}


//property {HTMLElement} element
/*
class Lightbox {
  static init() {
    
    //const links = Array.from(document.querySelectorAll("a> img "));
    //console.log(links);


    const medias = Array.from(
      document.querySelectorAll(
        ".galery-photo__img img, .galery-photo__img video"
      )
    );
    //  const gallery = links.map(link => link.getAttribute("src"))

    const gallery = medias.map((media) => media.getAttribute("src"));
    medias.forEach((media) => {
      console.log(media);

      media.addEventListener("click", (e) => {
        new Lightbox(e.currentTarget.getAttribute("src"), gallery);

        // enter(e)
      });
    });
  }
*/
//url vers image
//string[] gallery chemins des images de la lightbox
/*
  constructor(url, gallery) {
    this.element = this.buildDOM(url);
    this.gallery = gallery;
    this.loadImage(url);
    this.onKeyup = this.onKeyup.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyup.bind(this));
  }
  //url vers image
  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox__container");
    container.innerHTML = "";
    container.appendChild(image);
    this.url = url;
    /*const loader = document.createElement('div');

loader.classList.add('lightbox__loader');
container.appendChild(loader)


/*image.onload = function(){
    container.removeChild(loader)
container.appendChild(image)
   
}*/
/*
    image.src = url;
  }

  //Keyboard event -ferme lightbox(this.element -modal /lightbox))
  onKeyup(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "Enter") {
      this.enter(e);
    }
  }

  enter(e) {
    //  const test = Array.from(document.querySelectorAll('a'))
    //console.log(gallery)
    let i = this.gallery.findIndex((image) => image === this.url);
    console.log(i);
    this.loadImage(this.gallery[i]);
  }

  //mouse event -ferme lightbox(this.element -modal /lightbox))
  close(e) {
    this.element.classList.add("fadeOut");
    document.removeEventListener("keyup", this.onKeyup);
  }

  next(e) {
    let i = this.gallery.findIndex((image) => image === this.url);
    if (i === this.gallery.length - 1) {
      i = -1;
    }
    this.loadImage(this.gallery[i + 1]);
  }

  prev(e) {
    let i = this.gallery.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.gallery.length;
    }
    this.loadImage(this.gallery[i - 1]);
  }

  //url de l'image
  //return html element
  buildDOM(url) {
    const dom = document.createElement("div");
    dom.classList.add("modal");
    dom.innerHTML = `<span class="lightbox__close"><i class="fas fa-times"></i></i>Fermer</span>
<span class="lightbox__next"><i class="fas fa-chevron-right"></i>Suivant</span>
<span class="lightbox__prev"><i class="fas fa-chevron-left"></i>Précédent</span>
<div class="lightbox__container">


</div>
</div>
`;

    dom
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));

    return dom;
  }
}
*/
/*
<div class="modal">
<span class="lightbox__close"><i class="fas fa-times"></i></i>Fermer</span>
<span class="lightbox__next"><i class="fas fa-chevron-right"></i>Suivant</span>
<span class="lightbox__prev"><i class="fas fa-chevron-left"></i>Précédent</span>
<div class="lightbox__container">
<img src = "./image/Travel_Lonesome.jpg">

</div>
</div>
*/
//Lightbox.init();
//}

//TEST 2 -mon code
/*
class Lightbox{
  constructeur(media, photographe, currentMedia) {
    this.media = media;
    this.photographe = photographe;
    this.currentMedia = currentMedia;}

  loadMedia (url){
    const medias = document.querySelectorAll(
      ".galery-photo__img img, .galery-photo__img video"
    );
    
    const modal = document.querySelector(".modal");
    let lightboxContainer = modal.querySelector(".lightbox__container");
    // console.log(photographeMedias);
    medias.forEach((media,i) => {
      media.addEventListener("click", (e) => {

console.log(medias)
         modal.style.visibility = "visible";
       /*
          this.currentMedia = i;
   console.log(i)    

      let clickedMedia = new Media(
          this.photographeMedias[this.currentMedia],
          this.photographe
        );
  //console.log(medias)
        lightboxContainer.innerHTML = clickedMedia.displayLightbox();
*/
/*
const image = new Image();
lightboxContainer.innerHTML ="";
lightboxContainer.appendChild(image);
this.url = url
image.src = url;
      });
    });
  
  }
 
}
*/

export { Lightbox };
