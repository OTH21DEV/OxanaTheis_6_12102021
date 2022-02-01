export { Video };


class Video {
  //constructor(path, video) {
    constructor(path, media) {
    this.path = path;
   // this.video = video;
   this.video = media.video;
   this.title = media.title;
  }
  display() {
    return `
        <a href="#">
        <p class="galery-photo__img">
          <video controls src="./assets/images/${this.path}/${this.video}" />
        </p>
      </a>
      </article>`;
  }
  displayLightbox() {
    return `
        <a href="#">
        <p class="galery-photo__img">
        <video controls src="./assets/images/${this.path}/${this.video}" />

          </p>
        <h3 class = "test2">${this.title ? this.title : ""}</h3>
      </a>
        
        
        `;
  }
}
