class PhotographerProfile {
  constructor(photographeMedias) {

    this.photographeMedias = photographeMedias;
  }

  createGallery = (data) => {
    //On pointe le DOM - section
    const sectionMain = document.querySelector("#cont_phtographer");

    //On cree li avec la variable tagHtml et on fait une boucle for pour chaque variable tag
    let tagHtml = "";
    for (let tag of data.tags) {
      // <li><a id ="category__link category__link--photographer" href="#">#${tag}</a></li>`;
      tagHtml += `  <li><a class = "photographer-profile__li" href="#">#${tag}</a></li>`;
    }
    // On reconstruit le contenu depuis index.html avec de variable, on rajoute id au lien <a>
    sectionMain.innerHTML += `  <article class="photographer-profile" id = "photographer-${data.id}">
        
        <a class="photographer-profile__img" href="./photographer.html?id=${data.id}" "="" aria-label="Mimi Keel">
            <img class ="photographer-profile__photo"
              src="./assets/images/Photographers ID Photos/${data.portrait}"
              alt="photo de ${data.name}"
            />
      
            <h2 class="photographer-profile__name">${data.name}</h2>
          </a>
          <a class="photographer-profile__title" href="#">
          <h3>${data.city}, ${data.country}</h3>
          <p>${data.tagline}</p>
          <p>${data.price}/jour</p>
          </a>
      
          <nav class="photographer-profile__nav">
            <ul class="photographer-profile__ul">
             
             ${tagHtml}
              
             </ul> 
          </nav> 
        </article>`;
  };

  createPhotographer = (data) => {
    const container = document.querySelector(".test");

    let tagHtml = "";
    for (let tag of data.tags) {
      // tagHtml += `  <li><a class = "photographer-profile__li"  >#${tag}</a></li>`;
      tagHtml += `  <a class = "photographer-profile__li" href = '#'>#${tag}</li></a>`;
    }

    container.innerHTML += ` <article id = "tt" class="photographer-profile photographer-profile--page">
          <a href="#">
            <h2
              class="
                photographer-profile__name photographer-profile__name--page
              "
            >
            ${data.name}
            </h2></a
          >
          <a
            class="
              photographer-profile__title photographer-profile__title--page
            "
            href="#"
          >
            <h3>${data.city}, ${data.country}</h3>
            <p>${data.tagline}</p>
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
            src="./assets/images/Photographers ID Photos/${data.portrait}"
            alt="photo de  ${data.name}"
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
}
export { PhotographerProfile };

