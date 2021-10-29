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
    let params = new URL(document.location).searchParams;
    console.log(params);

    //  let tagUrl = params.get(photographe.id);
    //console.log(tagUrl);

    for (let photographe of photographersData) {
      createPhtotographer(photographe);

      /*
      let tagsPhotographe = photographe.tags;


      let navLink = document.querySelectorAll('.category__link');
  
      

      //e.target.text  affiche le nom de mon tag 
    
      
      navLink.forEach((link => {
        link.addEventListener("click", (e) => {
          // let arrayTags = photographe.tags;
          console.log(e.target.text.toLowerCase());
      

           // console.log(i);

    if(tagsPhotographe.indexOf(link)){
    
    document.querySelector("#cont_phtographer").innerHTML='';

  
  
       }
    
     
        
      })}))
    }})
      
       */
    }
  })

  .catch(function (err) {
    console.log(err);
  });
//...............................................................
function createPhtotographer(data) {
  const sectionMain = document.querySelector("#cont_phtographer");

  let tagHtml = "";
  for (let tag of data.tags) {
    tagHtml += `  <li><a class="category__link" href="#">#${tag}</a></li>`;
  }
  //.......................
  let params = new URL(document.location).searchParams;
  console.log(params);

  let tagUrl = params.get(data.id);
  console.log(tagUrl);
  //..............................

  sectionMain.innerHTML += `  <article class="photographer-profile">
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
