// recupere les datas depuis.json

const linkToJson = "./FishEyeData.json";
fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  .then(function (value) {
    const photographersData = value.photographers; // donnes de photographes array et objets
    const mediaData = value.media; // données de media

    for (let photographe of photographersData) {
      createPhtotographer(photographe);
      filterTags(photographe);
    }
    filterPhotographeTags(photographersData);
    filterTagsFromPhotographePage(photographersData);
  })

  .catch(function (err) {
    console.log(err);
  });

//...............................................................
// <li><a id ="category__link category__link--photographer" href="#">#${tag}</a></li>`;
function createPhtotographer(data) {
  //On pointe le DOM - section
  const sectionMain = document.querySelector("#cont_phtographer");

  //On cree li avec la variable tagHtml et on fait une boucle for pour chaque variable tag
  let tagHtml = "";
  for (let tag of data.tags) {
    tagHtml += `  <li><a class = "photographer-profile__li" href="#">#${tag}</a></li>`;
  }
  // On reconstruit le contenu depuis index.html avec de variable, on rajoute id au lien <a>
  sectionMain.innerHTML += `  <article class="photographer-profile" id = "photographer-${data.id}">
  
  <a class="photographer-profile__img" href="./MimiKeel.html?id=${data.id}" "="" aria-label="Mimi Keel">
      <img class ="photographer-profile__photo"
        src="photo_video/Photographers ID Photos/${data.portrait}"
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
}

// Filtre de tags depuis la page d'accuel -menu de navigation

function filterTags(data) {
  let navLink = document.querySelectorAll(".category__link");
  //On rajoute eventlistener click pour chaque tag
  navLink.forEach((link) => {
    //console.log(link)
    link.addEventListener("click", (e) => {
      //on cree une variable qui recupere le nom de tag (en la mettant en minuscule et enlevant #)
      let element = e.target.text.toLowerCase().replace("#", "");

      //On pointe l'element de photographe sur le DOM ( en rajoutant au prealable dans la class de cet element un id (chiffre) )

      const profileEl = document.getElementById("photographer-" + data.id);
      //console.log(profileEl);

      //On cree une condition pour verifier si le tag clické est present parmi les tags de chaque photographe

      if (data.tags.includes(element)) {
        //  console.log(profileEl);

        profileEl.style.display = "flex";
        document.querySelector("#cont_phtographer").style.justifyContent =
          "center";
      } else {
        profileEl.style.display = "none";
      }
    });
  });
}
//...................................................................................................

function filterPhotographeTags(data) {
  let photographeLinks = document.querySelectorAll(".photographer-profile__li");
  //console.log(photographeLinks)
  photographeLinks.forEach((photographeLink) => {
    photographeLink.addEventListener("click", (e) => {
      let newElement = e.target.text.toLowerCase().replace("#", "");

      //on applique la methode .filter au parametre data ( photographersData) pour acceder au contenu de chaque photographe -photographeProfile

      data.filter((photographeProfile) => {
        //on recupere element de dom <article> en attribuant nouveau id -photographeProfile.id
        let newprofileEl = document.getElementById(
          "photographer-" + photographeProfile.id
        );
        //on verifie si les tags de photographe comprennent la valeur de l'element clické
        if (photographeProfile.tags.includes(newElement)) {
          newprofileEl.style.display = "flex";
          document.querySelector("#cont_phtographer").style.justifyContent =
            "center";
        } else {
          newprofileEl.style.display = "none";
        }
      });
    });
  });
}
function filterTagsFromPhotographePage(data) {
  //on applique la methode .filter au parametre data ( photographersData) pour acceder au contenu de chaque photographe -photographeProfile

  data.filter((photographeProfile) => {
    //on recupere element de dom <article> en attribuant nouveau id -photographeProfile.id
    let newprofileEl = document.getElementById(
      "photographer-" + photographeProfile.id
    );
    //on verifie si les tags de photographe comprennent les Tags enregistrés dans sessionStorage dans la fonction filterTagsOnPhotographePage sur la page de photographe.js
    if (photographeProfile.tags.includes(sessionStorage.tag)) {
      newprofileEl.style.display = "flex";
      document.querySelector("#cont_phtographer").style.justifyContent =
        "center";
    } else {
      newprofileEl.style.display = "none";
    }
  });
}
