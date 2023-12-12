let selectedPrio;
let selectedCategory;
let selectedContacts = [];

/**
 * Die Funktion dient dem Vergleich des geklicket und der Setzung der jeweiliegen Farbe.
 * @param {3 Mögliche stufen} prioElement - Kann sein <prio-urgent | prio-medium | prio-low>
 */
function clickedPrio(prioElement) {
  selectedPrio = prioElement; // Global setzen wirklich nötig?
  let prios = document.querySelectorAll("[data-prio]"); // Als Gruppierte Datas (NodeListOf<Element>) -> als ein Array.
  prios.forEach((p) => {
    // Die Prios weiter in der Arraw function als ein Paramter, mit dem Wert: Element.
    let parentEle = p.parentElement; // p = prios[0] | p.parentElement = nächst höhere Element in HTML
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

/**
 * handelt die Dropdowns als Menü.
 * 
 * @param {dropdownMenuID} dropdownMenu - Das Element das als Dropdown Container fungiert
 * @param {arrowImage} arrowImage - Das Image für die Navigation
 */
function handelDropDown(dropdownMenu, arrowImage) {
  let dropdown_menu = document.getElementById(dropdownMenu);

  let dropdown = dropdown_menu.classList.contains('show') ?  false : true;

  let dropdownArrow = document.getElementById(arrowImage);

  dropdown
    ? dropdown_menu.classList.add("show")
    : dropdown_menu.classList.remove("show");
  dropdown
    ? (dropdownArrow.src = "./assets/img/add_tasks/arrow_up.svg")
    : (dropdownArrow.src = "./assets/img/add_tasks/arrow_drop.svg");

  dropdown = !dropdown;
}

/**
 * Setzt die aktuelle Kategorie.
 * @param {String} category  
 */
function selectCategory(category) {
  selectedCategory = category;

  let categoryField = document.getElementById("categorys-dropdown");
  categoryField.innerHTML = category;
  categoryField.style = "color: black;";
  document.getElementById("category-dropdown-menu").classList.remove('show');
}

/**
 * Zeigt oder verbergt das Dropdown von den Subtasks.
 */
function handleSubtaskDropDown() {
    let dropdown_menu = document.getElementById('subtasks-search-list');
    let dropdown = dropdown_menu.classList.contains("show") ? false : true;

    dropdown
    ? dropdown_menu.classList.add("show")
    : dropdown_menu.classList.remove("show");

    dropdown = !dropdown;
}

/**
 * Ändert den Sytle des ausgewählten Subtasks.
 * @param {HTMLElement} subtaskInput 
 */
function changeSubtaskInput(subtaskInput) {
  let ele = subtaskInput;
  let parentEle = ele.parentElement.parentElement;
  ele.classList.add("subtask-edit-input");
  let id = ele.getAttribute('id').split('-')[1];
  if(document.activeElement === subtaskInput) {
    parentEle.style = 'list-style-type: none;'
    let inter = setInterval(()=> {
      if(document.activeElement != subtaskInput) {
        clearInterval(inter);
        parentEle.style = 'list-style-type: disc;'
        ele.classList.remove("subtask-edit-input");
      }
    }, 100)
  }
  changeSubtaskImages(id, subtaskInput);
}

function changeSubtaskImages(id, subtaskInput) {
  let img1 = document.getElementById(`subtask-img-${id}`);
  let img2 = document.getElementById(`subtask-img2-${id}`);

  let parentEle = subtaskInput.parentElement.parentElement;
  if(document.activeElement === subtaskInput) {
    img1.src = './assets/img/add_tasks/trash_icon.svg';
    img2.src = './assets/img/add_tasks/check_icon.svg';
    let inter = setInterval(()=> {
      if(document.activeElement != subtaskInput) {
        img1.src = './assets/img/add_tasks/edit_icon.svg';
        img2.src = './assets/img/add_tasks/trash_icon.svg';
        clearInterval(inter);
      }
    }, 100)
  } 
}
