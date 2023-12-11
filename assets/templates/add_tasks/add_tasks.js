let selectedPrio; // Es gibt 3 Mögliche Prioritäten die mit dem onclick als ein Parameter überreicht werden. Es wird aber nur einer für die if Abfrage in gebrauch genohmen.
let selectedCategory;
let dropdown = false;

/**
 * Die Funktion dient dem Vergleich des geklicket und der Setzung der jeweiliegen Farbe.
 * @param {3 Mögliche stufen} prioElement
 */
function clickedPrio(prioElement) {
  selectedPrio = prioElement; // Global setzen wirklich nötig?
  let prios = document.querySelectorAll("[data-prio]"); // Als Gruppierte Datas (NodeListOf<Element>) -> als ein Array.
  prios.forEach((p) => {
    // Die Prios weiter in der Arraw function als ein Paramter, mit dem Wert: Element.
    let parentEle = p.parentElement; // Wie kann ich mir das Technisch vorstellen. HTML Zauberei?
    let prioAttribute = p.getAttribute("for");
    if (prioAttribute === selectedPrio) {
      switch (selectedPrio) {
        case "prio-urgent":
          parentEle.style = "background-color: #ff3d00;";
          p.style = "filter: brightness(0) invert(1);";
          break;
        case "prio-medium":
          parentEle.style = "background-color: #ffa800;";
          p.style = "filter: brightness(0) invert(1);";
          break;
        case "prio-low":
          parentEle.style = "background-color: #1fd7c1;";
          p.style = "filter: brightness(0) invert(1);";
          break;
        default:
          break;
      }
    } else {
      parentEle.style = "background-color: white;";
      p.style = "filter: none;";
    }
  });
}

function handelDropDown() {
  let category_dropdown_menu = document.getElementById(
    "category-dropdown-menu"
  );
  let dropdownArrow = document.getElementById("category-dropdown-arrow");

  dropdown
    ? category_dropdown_menu.classList.add("show")
    : category_dropdown_menu.classList.remove("show");
  dropdown
    ? (dropdownArrow.src = "./assets/img/add_tasks/arrow_up.svg")
    : (dropdownArrow.src = "./assets/img/add_tasks/arrow_drop.svg");

  dropdown = !dropdown;
}

function selectCategory(category) {
  selectedCategory = category;

  let categoryField = document.getElementById("categorys-dropdown");
  categoryField.innerHTML = category;
  categoryField.style = "color: black;";
  dropdown = false;
  handelDropDown();
}
