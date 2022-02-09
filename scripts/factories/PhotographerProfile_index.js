import { photographe } from "../pages/index.js";

class PhotographerProfile_index {
  constructor() {
    this.photographe = photographe;
    this.createPhtotographer();
  }

  createPhtotographer = () => {
    //On pointe le DOM - section
    const sectionMain = document.querySelector("#cont_phtographer");

    //On cree li avec la variable tagHtml et on fait une boucle for pour chaque variable tag
    let tagHtml = "";
    for (let tag of this.photographe.tags) {
      // <li><a id ="category__link category__link--photographer" href="#">#${tag}</a></li>`;
      tagHtml += `  <li><a class = "photographer-profile__li" href="#">#${tag}</a></li>`;
    }
    // On reconstruit le contenu depuis index.html avec de variable, on rajoute id au lien <a>
    sectionMain.innerHTML += `  <article class="photographer-profile" id = "photographer-${this.photographe.id}">
        
        <a class="photographer-profile__img" href="./photographer.html?id=${this.photographe.id}" "="" aria-label="Mimi Keel">
            <img class ="photographer-profile__photo"
              src="./assets/images/Photographers ID Photos/${this.photographe.portrait}"
              alt="photo de ${this.photographe.name}"
            />
      
            <h2 class="photographer-profile__name">${this.photographe.name}</h2>
          </a>
          <a class="photographer-profile__title" href="#">
          <h3>${this.photographe.city}, ${this.photographe.country}</h3>
          <p>${this.photographe.tagline}</p>
          <p>${this.photographe.price}/jour</p>
          </a>
      
          <nav class="photographer-profile__nav">
            <ul class="photographer-profile__ul">
             
             ${tagHtml}
              
             </ul> 
          </nav> 
        </article>`;
  };
}
export { PhotographerProfile_index };
