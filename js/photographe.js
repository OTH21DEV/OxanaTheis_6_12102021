// recupere les datas depuis.json

const linkToJson = "./FishEyeData.json";
fetch(linkToJson)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })

  .then(function (value) {
    // donnes de chaque photographe
    const photographersData = value.photographers;
    // données de media
    const mediaData = value.media;

    //on recupere le lien
    let queryString = window.location.search;
    //console.log(queryString );
    //on parce le chemin
    let urlParams = new URLSearchParams(queryString);
    //console.log(urlParams);

    //on recupere ici 'id ' donné à <a> dans le script.js (href="./MimiKeel.html?id=${data.id}") (function createPhotographe) pour chaque photographe
    const idTag = urlParams.get("id");
    //console.log(idTag);

    //..............................

    for (let photographe of photographersData) {
      // console.log(photographe.id);
      //on cree le photographe si son id (de .json) correspond au idTag (id) recuperé dans le lien url
      if (photographe.id == idTag) {
        createPhtotographer(photographe);

        //.................................

        for (let media of mediaData) {
          // console.log(media)
          if (media.photographerId == idTag) {
            // console.log(media.photographerId)
            createMedia(media);
          }
        }
      }
    }
  })

  .catch(function (err) {
    console.log(err);
  });

//..................................................................................

function createPhtotographer(data) {
  const container = document.querySelector(".test");

  let tagHtml = "";
  for (let tag of data.tags) {
    tagHtml += `  <li><a class="category__link" href="#">#${tag}</a></li>`;
  }

  container.innerHTML += ` <article class="photographer-profile photographer-profile--page">
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

  <a class="photographer-profile__img" href="/MimiKeel.html">
    <img
      class="
        photographer-profile__photo photographer-profile__photo--small
      "
      src="photo_video/Photographers ID Photos/${data.portrait}"
      alt="photo de  ${data.name}"
    />
  </a>`;
}
//......................................................................

function createMedia(media) {
  const mediaContainer = document.querySelector(".galery-photo");

  mediaContainer.innerHTML += `<article>
    
  <a href="#">
    <p class="galery-photo__img">
      <img src="photo_video/Mimi/${media.image}" />
    </p>
  </a>
  <div class="galery-photo-title">
    <a href="#"> <p>${media.title}</p></a>
    <div class="galery-photo-like">
      <a href="#"> <p>${media.likes}</p></a>
      <a href="#">
        <p><i class="fas fa-heart" ></i>
          
          </p
      >

    </a>
    </div>
  </div>
</article>`;
}
