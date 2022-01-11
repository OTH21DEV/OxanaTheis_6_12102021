class Photo {
  constructor(path, image) {
    this.path = path;
    this.image = image;
    
  }
  display() {
    return `
        <a href="#">
        <p class="galery-photo__img">
          <img src="photo_video/${this.path}/${this.image}" />
   
          </p>
        </p>
      </a>
        
        `;
  }
}
//source de base
//<img src="photo_video/${photographe.path}/${media.image}" />

export { Photo };
