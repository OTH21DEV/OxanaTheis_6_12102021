class Video {
  constructor(path, video) {
    this.path = path;
    this.video = video;
  }
  display() {
    return `
        <a href="#">
        <p class="galery-photo__img">
          <video controls src="photo_video/${this.path}/${this.video}" />
        </p>
      </a>`;
  }
}
export { Video };
