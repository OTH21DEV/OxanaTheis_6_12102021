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
            createMedia(media, photographe);
         // createLightbox()
           
          }

         
          
        }
        createLightbox();// array cible img/video de photographe 
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

function createMedia(media, photographe) {
  //parametre photographe recupere path (prenom de phtographe depuis .json pour creer le chemin dynamiqument)
  const mediaContainer = document.querySelector(".galery-photo");

  mediaContainer.innerHTML +=
    
    '<article>' + choiseMedia(media, photographe) +
  '<div class="galery-photo-title">'+
    '<a href="#">'+ '<p>'+ media.title+'</p>'+'</a>'+
   '<div class="galery-photo-like">'+
      '<a href="#">'+ '<p>'+ media.likes + '</p>'+ '</a>'+
      '<a href="#">'+
        '<p><i class="fas fa-heart" ></i>'+
          
          '</p>'+

    '</a>'+
    '</div>'+
  '</div>'+
'</article>';

}
//......................................................................................

function choiseMedia(media, photographe) {
  if (media.image) {
    return `
    <a href="#">
    <p class="galery-photo__img">
      <img src="photo_video/${photographe.path}/${media.image}" />
    </p>
  </a>
    
    `;
  } else if (media.video) {
    return `
    <a href="#">
    <p class="galery-photo__img">
      <video controls src="photo_video/${photographe.path}/${media.video}" />
    </p>
  </a>`;
  }
  return
}
//.......................................................................
/*
function createLightbox(){


  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.innerHTML = 

  `<span class="lightbox__close"><i class="far fa-window-close"></i>Fermer</span>
  <span class="lightbox__next"><i class="fas fa-chevron-right"></i>Suivant</span>
  <span class="lightbox__prev"><i class="fas fa-chevron-right"></i>Précédent</span>
  <div class="lightbox__container"></div>`
  




  //..............................................................................

}

*/
function createLightbox(media, photographe){
const modal = document.querySelector(".modal");
const lightboxContainer = document.querySelector('.lightbox__container');
//const pour cibler img et video de photographe 
const images = document.querySelectorAll(".galery-photo__img img, .galery-photo__img video");



//console.log(images[0])

images.forEach((image) =>{
  image.addEventListener('click', (e)=> {
    modal.style.visibility = "visible";
    const pic = modal.querySelector(".lightbox__container img")
    console.log(pic)
    pic.src = this.href;

})
})





}
/*let imgActive = 0;
for (let i = 1; i < images.length; i+=1){
  images[i].classList.add('hidden');
}*/
