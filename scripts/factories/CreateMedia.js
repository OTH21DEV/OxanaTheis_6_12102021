//import { photographe, photographeMedias } from "../pages/photographe.js";

import { photographeMedias } from "../pages/photographe.js";
import { Media } from "../factories/Media.js";
import { Lightbox } from "../factories/Lightbox.js";

class CreateMedia {
  constructor(media, photographe, currentMedia) {
    this.media = media;
    this.photographe = photographe;
    this.currentMedia = currentMedia;
    this.photographeMedias = photographeMedias;
    this.display();
  }
  display = () => {
    //parametre photographe recupere path (prenom de phtographe depuis .json pour creer le chemin dynamiqument)

    //on cree une variable factoryMedia pour recuperer class Media depuis Media.js
    let factoryMedia = new Media(this.media, this.photographe);
    let article = document.createElement("article");

    let mediaTitle = document.createElement("div");
    mediaTitle.classList.add("galery-photo-title");

    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    document.querySelector(".galery-photo").appendChild(wrapper);
    wrapper.appendChild(article);
    wrapper.appendChild(mediaTitle);

    article.innerHTML = factoryMedia.display();

    mediaTitle.innerHTML =
      `
    <a href="#">
  <p> 
   ${this.media.title} 
    </p>
    </a>
    <div class="galery-photo-like">
    <a href="#">
    <p class = "nb-likes" id = "${this.media.id}" >
   ${this.media.likes}
    </p>
    </a>
    <a class = "heart-link" href="#">
    <p class = "heart">` +
      `<i class="fas fa-heart" data-id = "${this.media.id}" data-like = "${this.media.likes}" aria-label = "likes"></i>` +
      "</p>" +
      " </a>" +
      "</div>" +
      "</div>";

    article.addEventListener("click", (e) => {
      new Lightbox(
        this.media,
        this.photographe,
        this.currentMedia,
        this.photographeMedias
      );
    });
  };
}

export { CreateMedia };
