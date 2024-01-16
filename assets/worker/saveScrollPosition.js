"use strict";

function saveScrollPosition() {
  localStorage.setItem("scrollPosition", window.scrollY);
}

function scrollToSavedPosition() {
  var scrollPosition = localStorage.getItem("scrollPosition");
  if (scrollPosition !== null) {
    window.scrollTo(0, parseInt(scrollPosition));
  }
}

window.addEventListener("beforeunload", saveScrollPosition);

window.addEventListener("load", scrollToSavedPosition);
