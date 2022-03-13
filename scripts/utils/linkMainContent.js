function linkMainContent() {
  let mainLink = document.querySelector(".header__hidden-link");


  window.addEventListener("scroll", () => {
    mainLink.style.visibility = "visible";
  });
}
export {linkMainContent};
