

class Photo {
  constructor(path, media) {
    this.path = path;
   this.image = media.image;
    //this.image = media;
    this.title = media.title;

  }
  //   <p class="galery-photo__img">

  display() {
    return `
    <a href="#">
    <p class="galery-photo__img">
    <img class = "galery-photo__img" src="./assets/images/${this.path}/${this.image}" />
    </p>
    </a>
    </article>
        
        `;
  }
  //on rajoute display n2n pour affichage du titre dans le lightbox
  displayLightbox() {
    return `
       
    <a href="#">
    <p class="galery-photo__img">
          <img class = "galery-photo__img" src="./assets/images/${this.path}/${this.image}" />

        
        <h3 class = "test2">${this.title ? this.title : ""}</h3>
    </p>
        </a>
       
        `;
  }
}

export { Photo };
//source de base
//<img src="photo_video/${photographe.path}/${media.image}" />


