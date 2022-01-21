export { Photo };

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
    <img class = "galery-photo__img" src="photo_video/${this.path}/${this.image}" />
    </p>
    </a>
          
      
        
        `;
  }
  //on rajoute display n2n pour affichage du titre dans le lightbox
  displayLightbox() {
    return `
       
    <a href="#">
    <p class="galery-photo__img">
          <img class = "galery-photo__img" src="photo_video/${this.path}/${this.image}" />

        
        <h3 class = "test2">${this.title ? this.title : ""}</h3>
    </p>
        </a>
        
        `;
  }
}
//source de base
//<img src="photo_video/${photographe.path}/${media.image}" />


