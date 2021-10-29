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
      console.log(queryString );
       //on parce le chemin 
      let urlParams = new URLSearchParams(queryString);
     console.log(urlParams);

     //on recupere ici 'id ' donné à <a> dans le script.js (function createPhotographe) pour chaque photographe
     const idTag = urlParams.get('id');
     console.log(idTag);


     //..............................

    for (let photographe of photographersData) {

        console.log(photographe.id);
        //on cree le photographe si son id (de .json) correspond au idTag (id) recuperé dans le lien url 
        if (photographe.id == idTag){
     createPhtotographer(photographe);


 


     
  
    }}
  })
  

  .catch(function (err) {
    console.log(err);
  });



  function createPhtotographer(data) {
    const container = document.querySelector(".test");
  
    let tagHtml = "";
    for (let tag of data.tags) {
      tagHtml += `  <li><a class="category__link" href="#">#${tag}</a></li>`;
  
      
    }

  
  
    container.innerHTML += 
    ` <article class="photographer-profile photographer-profile--page">
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
  </a>`
  }
  