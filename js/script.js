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

     

      // Filtre de tags depuis la page d'accuel -menu de navigation

      //On pointe des tags de la navigation
      let navLink = document.querySelectorAll(".category__link");
      //On rajoute eventlistener "click" pour chaque tag
      navLink.forEach((link) => {
        link.addEventListener("click", (e) => {
          //on cree une variable qui recupere le nom de tag (en la mettant en minuscule et enlevant #)
          let linkName = e.target.text.toLowerCase().replace("#", "");

          //On pointe profile de photographe sur le DOM ( en rajoutant au prealable dans la class de cet element un id (chiffre) )

          const profile = document.querySelector(
            ".photographer-profile-" + photographe.id
          );
          //console.log(element);

          //On cree une condition pour verifier si le tag clické est present parmi les tags de chaque photographe

          if (photographe.tags.includes(linkName)) {
            console.log(profile);
         
            profile.style.display = "block";
          } else {
            profile.style.display = "none";
          }
        });
      });

      //.................................................


    }
  })

  .catch(function (err) {
    console.log(err);
  });
//...............................................................
function createPhtotographer(data) {

  //On pointe le DOM - section 
  const sectionMain = document.querySelector("#cont_phtographer");

  //On cree li avec la variable tagHtml et on fait une boucle for pour chaque variable tag 
  let tagHtml = "";
  for (let tag of data.tags) {
    tagHtml += `  <li><a class="category__link" href="#">#${tag}</a></li>`;
  }
// On reconstruit le contenu depuis index.html avec de variable
  sectionMain.innerHTML += `  <article class="photographer-profile-${data.id}">
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

/*
function filterTags(e) {
  let navLink = document.querySelectorAll(".category__link");
  //On rajoute eventlistener click pour chaque tag
  navLink.forEach((link) => {
    link.addEventListener("click", (e) => {
      //on cree une variable qui recupere le nom de tag (en la mettant en minuscule et enlevant #)
      let element = e.target.text.toLowerCase().replace("#", "");

      //On pointe l'element de photographe sur le DOM ( en rajoutant au prealable dans la class de cet element un id (chiffre) )

      const profileEl = document.querySelector(
        ".photographer-profile-" + photographe.id
      );
      //console.log(element);

      //On cree une condition pour verifier si le tag clické est present parmi les tags de chaque photographe

      if (photographe.tags.includes(element)) {
        console.log(profileEl);
        // profileEl.style.display="block";
        profileEl.style.display = "block";
      } else {
        profileEl.style.display = "none";
      }
    });
  })}
*/