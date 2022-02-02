import { photographe } from "../pages/photographe.js";

class Photographer {
  constructor() {
    this.photographe = photographe;
    this.createPhotographer();
    this.filterTagsOnPhotographePage();
    this.createTotalLikesContainer();
  }
  /*
url = () =>{
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    const idTag = urlParams.get("id");
    this.photographe = photographersData.filter((photographe) => {
        return photographe.id == idTag;
      })[0];
}

*/

  createPhotographer = () => {
    const container = document.querySelector(".test");

    let tagHtml = "";
    for (let tag of this.photographe.tags) {
      tagHtml += `  <li><a class = "photographer-profile__li"  >#${tag}</a></li>`;
    }

    container.innerHTML += ` <article id = "tt" class="photographer-profile photographer-profile--page">
          <a href="#">
            <h2
              class="
                photographer-profile__name photographer-profile__name--page
              "
            >
            ${this.photographe.name}
            </h2></a
          >
          <a
            class="
              photographer-profile__title photographer-profile__title--page
            "
            href="#"
          >
            <h3>${this.photographe.city}, ${this.photographe.country}</h3>
            <p>${this.photographe.tagline}</p>
          </a>
      
          <nav class="photographer-profile__nav">
            <ul class="tes">
            ${tagHtml}
            </ul>
          </nav>
        </article>
      
        <a class="photographer-profile__img" href="/photographer.html">
          <img
            class="
              photographer-profile__photo photographer-profile__photo--small
            "
            src="./assets/images/Photographers ID Photos/${this.photographe.portrait}"
            alt="photo de  ${this.photographe.name}"
          />
        </a>`;
  };

  filterTagsOnPhotographePage = () => {
    let photographeLinks = document.querySelectorAll(
      ".photographer-profile__li"
    );

    photographeLinks.forEach((photographeLink) => {
      photographeLink.addEventListener("click", (e) => {
        let clickedTag = e.target.text.toLowerCase().replace("#", "");
        sessionStorage.setItem("tag", clickedTag);

        photographeLink.href = "index.html";
        // on complete la logique de filtrage par une fonction "filterPhotographeTagsFromPhotographe page" sur script.js
      });
    });
  };

  //methode pour creer l'element de conteur
  createTotalLikesContainer = () => {
    const totalLikesContainer = document.querySelector(".total-wrapper");

    totalLikesContainer.innerHTML +=
      '<div class = "total">' +
      '<p class="total__likes">' +
      '<i class="fas fa-heart">' +
      "</i>" +
      "</p>" +
      '<p class="total__price">' +
      this.photographe.price +
      "€ / jour" +
      "</p>" +
      "</div>" +
      "</div>";
  };
}

export { Photographer };
