class Photo {
  constructor(path, media) {
    this.path = path;
    this.image = media.image;
    //this.image = media;
    this.title = media.title;
    this.alt = media.alt;
  }
  //   <p class="galery-photo__img">

  display() {
    return `
    <a href="#">
    <p class="galery-photo__img">
    <img role="image" class = "galery-photo__img" src="./assets/images/${this.path}/${this.image}" alt = '${this.alt}'/>
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
          <img role="image" class = "galery-photo__img" src="./assets/images/${this.path}/${
      this.image
    } " alt = '${this.alt}'/>

        
        <h3 role="text" class = "test2">${this.title ? this.title : ""}</h3>
    </p>
        </a>
       
        `;
  }
}

export { Photo };
//source de base
//<img src="photo_video/${photographe.path}/${media.image}" />
