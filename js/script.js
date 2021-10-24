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
   
   

photographersData.forEach(element => {
  

   // for (let i in photographersData) {
    const {name, city, country, tags, tagline, price, portrait} = element;
    console.log(price);
    
    createPhtotographer(name, city, country, tagline, price, portrait);
  
   

      
    } )})

  

  .catch(function (err) {
    console.log(err);
  });



  function createPhtotographer (name, city, country, tags, tagline,price, portrait){
    
    const article = document.querySelector(".photographer-profile");
    article.innerHTML=  
 
'<a class="photographer-profile__img" href="MimiKeel.html">'+
            '<img class="photographer-profile__photo" src="photo_video/Photographers ID Photos/'+portrait+' alt="photo de Mimi Keel"/>'+

'<h2 class="photographer-profile__name">'+ name + '</h2>'+'</a>'+
'<a class="photographer-profile__title" href="#">'+
'<h3> '+ city +','+ country+'</h3>'+
'<p class ="testt"> '+ tagline +'€</p>'+
'<p>'+ price+'</p>'+'</a>'





  }