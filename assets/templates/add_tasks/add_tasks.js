let selectedPrio;
let selectedCategory;
let selectedContacts = [];
let subtasks = [];
let assigendContacts = [];

async function includeAddTaskFormTempalte() {
  let taskForm = document.getElementById("taskForm");
  let resp = await includeTemplate('./assets/templates/tasks_form.html')
  taskForm.innerHTML = resp;
  renderHTMLAssignedTo();
}


/**
 * Die Funktion dient dem Vergleich des geklicket und der Setzung der jeweiliegen Farbe.
 * @param {3 Mögliche stufen} prioElement - Kann sein <prio-urgent | prio-medium | prio-low>
 */
function clickedPrio(prioElement) {
  selectedPrio = prioElement;
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


/**
 * Setzt die Images auf die richtige Rheienfolge.
 * 
 * @param {ElementID} id 
 * @param {HTMLElement} subtaskInput 
 */
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
    let taskTitle = document.getElementById("form-title").value == "" ? "" : document.getElementById("form-title").value; //????
    let taskDesc = document.getElementById("form-desc").value == "" ? "" : document.getElementById("form-desc").value; //????
    let prio = selectedPrio;
    let dueDate = document.getElementById("form-date").value;
    let category = selectedCategory;
    let subs = subtasks;

    let task = new Task(taskTitle, dueDate, category, currentUser.tasks.length+1, "Open", currentUser.name); //+1 ???
    task.setPrio(prio);
    task.assignedTo = assigendContacts;
    taskDesc == "" ? task.setDescription("") : task.setDescription(taskDesc); //??
    subs.length > 0 ? task.subtasks = subs : subs  =[];
    currentUser.tasks.push(task);
    currentUser.save();
    document.getElementById("task-form-error").style = "color:green"
    document.getElementById("task-form-error").innerHTML = "Du hast den Task erfolgreich erstellt!"
    console.log(task);
    clearTask();
    
  })

  document.getElementById("subtask-submit-subtask").addEventListener("click", (e) => {
    e.preventDefault();
    addSubtaskToList()
  })
}

/**
 * Setzt alles auf anfang. 
 */
function clearTask() {
try {
  document.getElementById("task-form-error").style = "color:red";
  document.getElementById("task-form-error").innerHTML = "";
  selectedCategory = null;
  selectedContacts = [];
  selectedPrio = null;
  subtasks = []
  assigendContacts = [];
  document.getElementById("form-desc").value = "";
  document.getElementById("form-title").value = "";
  document.getElementById("form-date").value = "";
  document.getElementById("categorys-dropdow").innerHTML = "Select task category";

  renderSubtaskHTML();
  renderAssignes();
  renderHTMLAssignedTo();
} catch (error) {
  
}
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
    }, 1000)
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
    subtasks.push(new Subtask(ele.value, subtasks.length+1));
    setSubTaskInputToDefault()
    ele.value = "";
    renderSubtaskHTML();
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


/**
 * Rendert die ausgewählten Kontakte unter der AssignedTo Liste im AddTasks.
 */
function renderHTMLAssignedTo() {
  let assignedList = document.getElementById("assigned-to-dropdown-menu");
  assignedList.innerHTML = "";
  
  let contactsHTML = currentUser.contacts.map((contact, index) => {
    return renderHTMLListElementOfAssigned(contact, index);
  }).join(""); 

  assignedList.innerHTML = `
    <ul id="addtasks-contacts-list">
      ${contactsHTML}
    </ul>
  `;
}

/**
 * Gibt die Ersten Buchstaben jedes Wortes zurück.
 * @param {String} contactName 
 * @returns 
 */
function getInitialsByContact(contactName) {
  let initials = "";
  let splits = contactName.split(" ");
  splits.forEach((split) => {
    initials += split[0].toUpperCase();
  });
  return initials;
}

/**
 * Rendert die ausgewählten Kontakte als Liste unter dem Dropdown.
 * 
 * @param {ContactObject} contact 
 * @param {IndexID} index 
 * @returns 
 */
function renderHTMLListElementOfAssigned(contact, index) {
  let initials = getInitialsByContact(contact.name);


  return /*html*/`
    <li class="assigned-to-task" onclick='addToAssigned(${JSON.stringify(contact)}, ${index})'>
        <div class="assignedTo-name-container">
          <p class="assignedTo-initials-container" style='background-color: ${contact.colorCode}'>${initials}</p>
          ${contact.name}
        </div>
        <input type="checkbox" name="check" id='contact${index}' class="assignedTo-checkbox">
      
  </li>
  `;
}

/**
 * Ändert das Design der Contacte beim Auswählen.
 * 
 * @param {ContactObejct} contact 
 * @param {IndecID} index 
 */
async function addToAssigned(contact, index) {
  let isInList = await assigendContacts.find((e) => e.name == contact.name) ? true : false;
  let parentTableRow = document.getElementById("contact" + index).parentElement;
  let checkBox = document.getElementById("contact" + index);
  if(isInList) {
    let indexOfContact = await assigendContacts.findIndex((e) => e.name == contact.name)
    assigendContacts.splice(indexOfContact, 1)
    parentTableRow.classList.remove("addedToAssigned")
    checkBox.removeAttribute("checked");
  } else {
    assigendContacts.push(contact)
    parentTableRow.classList.add("addedToAssigned");
    checkBox.setAttribute("checked", true);
  }
  renderAssignes()
}

/**
 * Rendert die Liste im Dropdown für AssignedTo.
 */
function renderAssignes() {
  let container = document.getElementById("assigned-to-assigens");
  container.innerHTML = "";
  assigendContacts.forEach((contact, index) => {
    container.innerHTML += /*html*/`
      <div class="assigned" style='background-color: ${contact.colorCode}'>
        ${getInitialsByContact(contact.name)}
      </div>
    `
  })
}