/**
 * To open submenu for logout.
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
  let logoutBtn = document.getElementById("header-logout");
  let todosSummery = document.querySelectorAll(".summaryToDoSum");
  logoutBtn.addEventListener("click", (e) => {
    logout();
  });

  window.addEventListener("click", (e) => {
    if (e.target != clickedEld || e.target == logoutBtn) {
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

/**
 * Remove logged in user from local storage.
 */
function logout() {
  window.location.assign("./assets/templates/login/login.html");
  localStorage.clear();
}

/**
 * Animate the logged in user's profile picture.
 * @param {svg picture} element
 */
function changeHeaderImage(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editHeaderImage")) {
    img.src = "assets/img/header/headerCurrentGuestImageHover.svg";
  }
}

/**
 * Animate the logged in user's profile picture.
 * @param {svg picture} element
 */
function changeHeaderImageBack(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editHeaderImage")) {
    img.src = "assets/img/header/headerCurrentGuestImage.svg";
  }
}

function loadHeaderProfileInitials() {
  const profileImg = document.getElementById("header_profile");
  if(currentUser != null || currentUser.name != "") {
    profileImg.innerHTML = getInitialsByContact(currentUser.name)
  }
}
