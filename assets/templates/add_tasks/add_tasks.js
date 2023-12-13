let selectedPrio;
let selectedCategory;
let selectedContacts = [];
let subtasks = [];

async function includeAddTaskFormTempalte() {
  let taskForm = document.getElementById("taskForm");
  let resp = await includeTemplate('./assets/templates/tasks_form.html')
  taskForm.innerHTML = resp;
}


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
  document.getElementById("subtask-list-trash-btn").setAttribute("onclick", `changeSubtaskTitle("${ele.value}", ${id})`)
  
  if(document.activeElement === subtaskInput) {
    parentEle.style = 'list-style-type: none;'
    let inter = setInterval(()=> {
      if(document.activeElement != subtaskInput) {
        clearInterval(inter);
        parentEle.style = 'list-style-type: disc;'
        ele.classList.remove("subtask-edit-input");
        document.getElementById("subtask-list-trash-btn").setAttribute("onclick", `deleteSubtask(${id})`)
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

/**
 * 
 * @returns is Form validatet or not
 */
function validateForm() {
  let correct = true;
  let error = document.getElementById("task-form-error")

  if(!selectedPrio) {
    correct = false;
    error.innerHTML = "U have to Select a Prio!"
  }

  if(!selectedCategory) {
    correct = false;
    error.innerHTML = "U have to select a Category!"
  }

  if(document.getElementById("form-title").value === "") {
    correct = false;
    error.innerHTML = "U must enter a Title!";
  }

  if(document.getElementById("form-date") .value === "") {
    correct = false;
    error.innerHTML = "U have to select a Due Date!"
  }

  return correct;
}

/**
 * Fügt EventListener Hinzu.
 */
async function initEventListener() {
  document.getElementById("tasks-form-submit").addEventListener("click", (e) => {
    let validatet = validateForm();
    if(!validatet) return;
    let taskTitle = document.getElementById("form-title").value == "" ? "" : document.getElementById("form-title").value;
    let taskDesc = document.getElementById("form-desc").value == "" ? "" : document.getElementById("form-desc").value;
    let prio = selectedPrio;
    let dueDate = document.getElementById("form-date").value;
    let category = selectedCategory;
    let subs = subtasks;

    let task = new Task(taskTitle, dueDate, category, tasks.length+1, "Open");
    task.setPrio(prio);
    taskDesc == "" ? task.setDescription("") : task.setDescription(taskDesc);
    subs.length > 0 ? task.subtasks = subs : subs  =[];
    tasks.push(task);
    let stat = saveTasks().then((res) => {
      document.getElementById("task-form-error").style = "color:green"
      document.getElementById("task-form-error").innerHTML = "Du hast den Task erfolgreich erstellt!"
      clearTask();
    });
  })
}

/**
 * Setzt alles auf anfang. 
 */
function clearTask() {
document.getElementById("task-form-error").style = "color:red";
document.getElementById("task-form-error").innerHTML = "";
selectedCategory = null;
selectedContacts = [];
selectedPrio = null;
subtasks = []
document.getElementById("form-desc").value = "";
document.getElementById("form-title").value = "";
document.getElementById("form-date").value = "";
document.getElementById("categorys-dropdow").innerHTML = "Select task category";

renderSubtaskHTML();
}

/**
 * Ändert das aussehen und das verhalten des Subtask-list element.
 * @param {HTMLElement} ele 
 */
function changeSubTaskValue(ele) {
  let input = ele;
  let c = input.value === "" ? true : false;
  if(document.activeElement == ele && !c) {
    document.getElementById("subtasks-to-dropdown-arrow").src = './assets/img/add_tasks/check_icon.svg';
    document.getElementById("hiden-divieder").style = "display:block;"
    document.getElementById("subtask-accept-icon").src = './assets/img/add_tasks/trash_icon.svg';
    document.getElementById("subtask-accept-icon").style = 'display: block';
    ele.setAttribute("data-check", true);
    let inter = setInterval(() => {
      if(document.activeElement != ele) {
      setSubTaskInputToDefault();
      ele.value = "";
        clearInterval(inter);
      }
    }, 100)
  }
}

/**
 * Resetet das Subtask-list Item auf die Standart werte
 */
function setSubTaskInputToDefault() {
  document.getElementById("subtasks-to-dropdown").removeAttribute("data-check")
  document.getElementById("subtasks-to-dropdown-arrow").src = "./assets/img/add_tasks/plus_icon.svg";
  document.getElementById("subtask-accept-icon").style = 'display:none;'
  document.getElementById("hiden-divieder").style = 'display:none;'
}

/**
 * Fügt das Subtask der Liste hinzu und rendert alle Elemente neu.
 */
function addSubtaskToList() {
  let ele = document.getElementById("subtasks-to-dropdown");
  let c = ele.hasAttribute("data-check");
  if(c) {
    setSubTaskInputToDefault()
    subtasks.push(new Subtask(ele.value, subtasks.length+1));
    ele.value = "";
    renderSubtaskHTML();
  }
}

/**
 * rendert alle Subtask Elemente.
 */
function renderSubtaskHTML() {
  let list = document.getElementById("subtask-list");
  list.innerHTML = "";
  subtasks.forEach((subtask, index) => {
    list.innerHTML += /*html*/`
      <li>
            <div class="subtask-list-item">
              <input
                type="text"
                value='${subtask.title}'
                class="disabled-input"
                id='subtask-${index}'
                onclick="changeSubtaskInput(this)"
              />
              <div class="subtask-fake-input-btns">
                <button id="subtask-list-edit-btn" onclick='deleteSubtask(${index})'>
                  <img
                    src="./assets/img/add_tasks/edit_icon.svg"
                    id='subtask-img-${index}'
                  />
                </button>
                <div class="btn-divieder"></div>
                <button id="subtask-list-trash-btn" onclick='deleteSubtask(${index})'>
                  <img
                    src="./assets/img/add_tasks/trash_icon.svg"
                    id='subtask-img2-${index}'
                  />
                </button>
              </div>
            </div>
          </li>
    `
  })
}

/**
 * Ändert den Title von dem Subtask mit dem Index.
 * @param {String} title 
 * @param {Number} subtaskIndex 
 */
function changeSubtaskTitle(title, subtaskIndex) {
  let subtask = subtasks[subtaskIndex];
  subtask.title = title;
}

/**
 * Löscht das Subtasks aus der Liste mit dem Index.
 * @param {Number} subtaskIndex 
 */
function deleteSubtask(subtaskIndex) {
  subtasks.splice(subtaskIndex, 1)
  renderSubtaskHTML();
}
