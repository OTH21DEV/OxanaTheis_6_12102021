export { openLightbox };
export { navigateKeyboard };
import { Media } from "./Media.js";

export { currentMedia };

let currentMedia;
/*
const medias = document.querySelectorAll(
  ".galery-photo__img img, .galery-photo__img video"
);
  const next = document.querySelector(".lightbox__next .fa-chevron-right");
  const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
  const close = document.querySelector(".lightbox__close .fa-times");
  const modal = document.querySelector(".modal");
const lightboxContainer = modal.querySelector(".lightbox__container");*/

function openLightbox(photographe, photographeMedias) {
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );
  const next = document.querySelector(".lightbox__next .fa-chevron-right");
  const prev = document.querySelector(".lightbox__prev .fa-chevron-left");
  const close = document.querySelector(".lightbox__close .fa-times");
  const modal = document.querySelector(".modal");

  let lightboxContainer = modal.querySelector(".lightbox__container");
  // console.log(photographeMedias);

  medias.forEach((media, i) => {
    media.addEventListener("click", (e) => {
      (currentMedia = i),
        //   console.log(currentMedia);

        //  console.log(photographeMedias[currentMedia]);
        //sessionStorage.setItem - stock une paire clé/valeur ici "index", i(number)

        // sessionStorage.setItem("index", i);

        (modal.style.visibility = "visible");

      let clickedMedia = new Media(
        photographeMedias[currentMedia],
        photographe
      );

      lightboxContainer.innerHTML = clickedMedia.displayLightbox();
    });
  });
  next.addEventListener("click", (e) => {
    //on apelle cette fonction pour executer au click
    showRightInLightbox(photographe, photographeMedias);
  });

  prev.addEventListener("click", (e) => {
    //on apelle cette fonction pour executer au click

    showLeftInLightbox(photographe, photographeMedias);
  });

  close.addEventListener("click", (e) => {
    //on associe à la fonction la fermeture de lightbox pour la recuperer dans la fonction navigateKeyboard()

    cancelInLightBox();
  });

  navigateKeyboard(photographe, photographeMedias);
}

function showRightInLightbox(photographe, photographeMedias) {
  const modal = document.querySelector(".modal");
  let lightboxContainer = modal.querySelector(".lightbox__container");

  currentMedia++;

  if (currentMedia === photographeMedias.length) {
    currentMedia = 0;
  }

  let nextMedia = new Media(photographeMedias[currentMedia], photographe);

  lightboxContainer.innerHTML = nextMedia.displayLightbox();
}
function showLeftInLightbox(photographe, photographeMedias) {
  const medias = document.querySelectorAll(
    ".galery-photo__img img, .galery-photo__img video"
  );
  const modal = document.querySelector(".modal");
  let lightboxContainer = modal.querySelector(".lightbox__container");

  currentMedia -= 1;

  if (currentMedia < 0) {
    currentMedia = photographeMedias.length - 1;
  }

  let prevMedia = new Media(photographeMedias[currentMedia], photographe);
  // on affiche cette nouvelle media
  lightboxContainer.innerHTML = prevMedia.displayLightbox();
}
function cancelInLightBox() {
  const modal = document.querySelector(".modal");
  modal.style.visibility = "hidden";
}

function navigateKeyboard(photographe, photographeMedias) {
  window.addEventListener("keydown", function (e) {
   

    //  TEST1 ouvre lightbox mais tjs le dernier media mais next marche !

    const medias = document.querySelectorAll(
      ".galery-photo__img img, .galery-photo__img video"
    );
    const modal = document.querySelector(".modal");
    let lightboxContainer = modal.querySelector(".lightbox__container");

    if (e.key == "Enter") {
      //currentMedia = 0;

      medias.forEach((media, i) => {
        console.log(media)
        currentMedia = i;

        console.log(photographeMedias[currentMedia]);

        modal.style.visibility = "visible";

        let clickedMedia = new Media(
          photographeMedias[currentMedia],
          photographe
        );

        lightboxContainer.innerHTML = clickedMedia.displayLightbox();
      });
    }
    //.....................................................

    //...................................................

    if (e.key == "ArrowRight") {
      showRightInLightbox(photographe, photographeMedias);
    }
    if (e.key == "ArrowLeft") {
      showLeftInLightbox(photographe, photographeMedias);
    }

    if (e.key == "Escape") {
      cancelInLightBox();
      cancelModalKeyboard();
    }
  });
}
