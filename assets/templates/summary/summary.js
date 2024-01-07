"use strict";

// TODO
// greeting();

// greetingMobile();
// showUserName();

// function generateSummary() {
//   load();
//   if (loggedIn) activeSummary();
// }

/**
 * Symmary content animate images.
 * @param {Image to animate whit hover} element
 */
// function changeImage(element) {
//   const img = element.querySelector('.summaryAnimateProgramm');
// img.src = "assets/img/summary/summaryWhiteEdit.svg"
// }

// function changeImageBack(element) {
//   const img = element.querySelector('.summaryAnimateProgramm');
// img.src = "assets/img/summary/summaryGrayEdit.svg"
// }

/**
 * Symmary content animate images.
 * @param {Image to animate whit hover} element
 */
function changeImage(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "assets/img/summary/summaryWhiteEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "assets/img/summary/summaryCheckWhite.svg";
  }
}

function changeImageBack(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "assets/img/summary/summaryGrayEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "assets/img/summary/summaryCheckGray.svg";
  }
}
