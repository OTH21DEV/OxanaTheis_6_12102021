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

function createLightbox(media, photographe){
const modal = document.querySelector(".modal");

//const pour cibler img et video de photographe 
const medias = document.querySelectorAll(".galery-photo__img img, .galery-photo__img video");
const next = document.querySelector(".lightbox__next .fa-chevron-right");
const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
const close = document.querySelector(".lightbox__close .fa-times");


let lightboxMedia = modal.querySelector(".lightbox__container img")
  



medias.forEach((media, i) =>{
  //console.log(i)
  media.addEventListener('click', (e)=> {
    //sessionStorage.setItem - stock une paire clé/valeur ici "index", i(number)
    sessionStorage.setItem("index", i);
    modal.style.visibility = "visible";
    lightboxMedia.src = media.src;
    
    
  })
})
next.addEventListener("click",(e)=> {
// sessionStorage.getItem - retourne la valeur associée à une clé ici - "index"
// on parseInt pour convertir une chaine de caractères en nombre entier 
let newIndex = parseInt(sessionStorage.getItem("index"))+1;



//si on essaye afficher le media suivant suite au dernier media , on cree
//une condition pour afficher le premier media 

if(newIndex >= medias.length){
newIndex = 0;
}
sessionStorage.setItem("index", newIndex);
lightboxMedia.src = medias[newIndex].src;

})


prev.addEventListener("click",(e)=>{

  let newIndex = parseInt(sessionStorage.getItem("index"))-1;
//si on n'a pas de media 
if(newIndex < 0){

// on recepure la longeur totale de tableau medias donc dernier media du tableau 
newIndex = medias.length;
}
sessionStorage.setItem("index", newIndex);
lightboxMedia.src = medias[newIndex].src;


})

close.addEventListener("click",(e)=>{

 modal.style.visibility = "hidden";
})

 
}

