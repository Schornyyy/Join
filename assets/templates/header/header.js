/**
 * Symmary content animate images.
 * @param {Image to animate whit hover} element
 */
function changeHeaderImage(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editHeaderImage")) {
    img.src = "assets/img/header/headerCurrentGuestImageHover.svg";
  }
}

function changeHeaderImageBack(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editHeaderImage")) {
    img.src = "assets/img/header/headerCurrentGuestImage.svg";
  }
}

function loagout() {
  window.location.assign("./assets/templates/login/login.html");
  localStorage.clear();
}
