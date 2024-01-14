"use strict";

/**
 * First remove the class from all elements
 * Add the class to the selected element
 * @param {The ID of the menu items} id 
 */
function setActiveLink(id) {
  document.getElementById("nav-summary").classList.remove("activeLink");
  document.getElementById("nav-board").classList.remove("activeLink");
  document.getElementById("nav-addTask").classList.remove("activeLink");
  document.getElementById("nav-contacts").classList.remove("activeLink");
  document.getElementById(id).classList.add("activeLink");
}
