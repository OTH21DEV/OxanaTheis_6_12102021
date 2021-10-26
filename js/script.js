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
      const { name, city, country, tags, tagline, price, portrait, element } =
        photographe;

      createPhtotographer(
        name,
        city,
        country,
        tags,

        tagline,
        price,
        portrait
      );

      //...................................

      //pour chaque tag je cree un li
      photographe.tags.forEach((tag) => {
        let newLi = document.createElement("li");
        newLi.setAttribute("class", "category__link");
        let tagName = document.createTextNode(`#${tag}`);
        newLi.appendChild(tagName);

        document.querySelector(".photographer-profile__ul").appendChild(newLi);
      });

      console.log(tag);//si je l'enleve les tag se mettent tous ensemble 
    }
  })

  .catch(function (err) {
    console.log(err);
  });
//...............................................................
function createPhtotographer(
  name,
  city,
  country,
  tags,

  tagline,
  price,
  portrait
) {
  const article = document.querySelector(".photographer-profile");

  article.innerHTML +=
    '<a class="photographer-profile__img" href="MimiKeel.html">' +
    '<img class="photographer-profile__photo" src="../photo_video/Photographers ID Photos/' +
    portrait +
    ' alt="photo de Mimi Keel"/>' +
    '<h2 class="photographer-profile__name">' +
    name +
    "</h2>" +
    "</a>" +
    '<a class="photographer-profile__title" href="#">' +
    "<h3> " +
    city +
    "," +
    country +
    "</h3>" +
    "<p > " +
    tagline +
    "</p>" +
    "<p>" +
    price +
    "€/jour</p>" +
    "</a>" +
    '<nav class="photographer-profile__nav">' +
    '<ul class="photographer-profile__ul" >' +
    "</ul>" +
    "</nav>";
}

