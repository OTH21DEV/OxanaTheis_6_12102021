class Photo {
  constructor(path, media) {
    this.path = path;
    this.image = media.image;
    this.title = media.title;

  }
  display() {
    return `
        <a href="#">
        <p class="galery-photo__img">
          <img src="photo_video/${this.path}/${this.image}" />

          </p>
      </a>
        
        `;
  }
}
//source de base
//<img src="photo_video/${photographe.path}/${media.image}" />

export { Photo };
