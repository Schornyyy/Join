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

/**
 * to open submenu for logout
 */
function handleSubMenu() {
  let mobile = window.innerWidth < 751;
  let headerSubMenu = document.getElementById("headerSubMenu");
  let show = headerSubMenu.hasAttribute("show");
  let hide = show
    ? headerSubMenu.removeAttribute("show")
    : headerSubMenu.setAttribute("show", "true");
  let showMenu = show
    ? (headerSubMenu.style.display = "none")
    : (headerSubMenu.style.display = "flex");
  let slideOnMobeil = !mobile
    ? headerSubMenu.classList.add("slideInMenu")
    : headerSubMenu.classList.remove("slideInMenu");
  let clickedEld = document.getElementById("header-profile-menu");

  window.addEventListener("click", (e) => {
    if (e.target != clickedEld) {
      show = false;
      let hide = show
        ? headerSubMenu.removeAttribute("show")
        : headerSubMenu.setAttribute("show", "true");
      let showMenu = show
        ? (headerSubMenu.style.display = "flex")
        : (headerSubMenu.style.display = "none");
      let slideOnMobeil = !mobile
        ? headerSubMenu.classList.add("slideInMenu")
        : headerSubMenu.classList.remove("slideInMenu");
    }
  });
}
