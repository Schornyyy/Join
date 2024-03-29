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
  clickedPrio('prio-medium')
  dueDateMinDate();

  window.addEventListener('click', (e) => {
    let dropdown = document.getElementById("aissgned-to-dropdown");
    let dropwDownMenu = document.getElementById("assigned-to-dropdown-menu");


    if(e.target != dropdown && dropwDownMenu != null && dropwDownMenu.classList.contains("show")) {
      dropwDownMenu.classList.remove("show")
    }
  })
}


/**
 * This function sets the Color of the current Prio.
 * @param {3 Mögliche stufen} prioElement - States <prio-urgent | prio-medium | prio-low>
 */
function clickedPrio(prioElement) {
  selectedPrio = prioElement;
  let prios = document.querySelectorAll("[data-prio]");
  prios.forEach((p) => {
    let parentEle = p.parentElement; 
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
 * handle the Dropdown.
 * 
 * @param {dropdownMenuID} dropdownMenu - The HTML Element which is used as Dropdown
 * @param {arrowImage} arrowImage - The Image of the Dropdown 
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
 * Sets the curretn Category.
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
 * Changes the style of the clicked Subtasks.
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
 * Sets the images of the Subtasks Input.
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
  let dateInput = document.getElementById("form-date");

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

  if(dateInput.value === "") {
    correct = false;
    error.innerHTML = "U have to select a Due Date!"
  }

  let dateNow = new Date().getTime();
  let date = new Date(dateInput.value).getTime();
  if(date < dateNow) {
    correct = false;
    error.innerHTML = "U must enter a Date in future!";
  }

  return correct;
}

function dueDateMinDate() {
  let dateInput = document.getElementById("form-date");
  let currentDate = new Date();

  let minDate = currentDate.toISOString().split('T')[0]
  dateInput.setAttribute('min', minDate);
}

/**
 * Adds EventListener
 */
async function initEventListener() {
  let validatet = validateForm();
  if(!validatet) return;
  let taskTitle = document.getElementById("form-title").value == "" ? "" : document.getElementById("form-title").value; 
  let taskDesc = document.getElementById("descriptionID").value == "" ? "" : document.getElementById("descriptionID").value; 
  let prio = selectedPrio;
  let dueDate = document.getElementById("form-date").value;
  let category = selectedCategory;
  let subs = subtasks;
  let task = new Task(taskTitle, dueDate, category, currentUser.tasks.length+1, "Open", currentUser.name, assigendContacts); // Deklaration der task-Variable hier
  task.setPrio(prio);
  task.assignedTo = assigendContacts; // Zuweisung der zugewiesenen Kontakte hier    
  taskDesc == "" ? task.setDescription("") : task.setDescription(taskDesc);
  subs.length > 0 ? task.subtasks = subs : subs = [];
  await currentUser.tasks.push(task);
  await currentUser.save();
  document.getElementById("task-form-error").style = "color:green"
  document.getElementById("task-form-error").innerHTML = "Du hast den Task erfolgreich erstellt!"    
  clearTask();
  await includeContentHTML('Board');
  setActiveLink('nav-board');
  displayAssignedContacts(task);
  saveAssignedContactsToBackend(task);
  console.log("initEventListener() task.assignedTo", task.assignedTo);
  console.log("async function initEventListener()" , task);
}

async function saveAssignedContactsToLocalStorage(task) {
  try {
    localStorage.setItem(`task_${task.id}_assigned_contacts`, JSON.stringify(task.assignedTo));
  } catch (error) {
    console.error("Error saving assigned contacts to LocalStorage:", error);
  }
}

// Beim Laden der Seite die ausgewählten Kontakte aus dem LocalStorage abrufen
function getAssignedContactsFromLocalStorage(task) {
  try {
    const contacts = localStorage.getItem(`task_${task.id}_assigned_contacts`);
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error("Error getting assigned contacts from LocalStorage:", error);
    return [];
  }
}

async function saveAssignedContactsToBackend(task) {
  try {
    const key = `taskContacts_${task.id}`;
    const value = JSON.stringify(task.assignedTo);
    await setItem(key, value);
    console.log(`Assigned contacts for task ${task.id} saved to backend.`);
  } catch (error) {
    console.error("Error saving assigned contacts to backend:", error);    
  }
}

async function getAssignedContactsFromBackend(task) {
  try {
    const key = `taskContacts_${task.id}`;
    const response = await getItem(key);
    if (response && response.value) {
      const contacts = JSON.parse(response.value);
      task.assignedTo = contacts;
      console.log(`Assigned contacts for task ${task.id} retrieved from backend.`);
    }
  } catch (error) {
    console.error("Error retrieving assigned contacts from backend:", error);    
  }
}

async function displayAssignedContacts(task) {
  // Rufen Sie die HTML-Elemente ab, in die die Mitglieder eingefügt werden sollen
  let membersContainer = document.querySelector(`#taskCard${task.id} .members-container`);
  // Löschen Sie zuerst den vorhandenen Inhalt, um doppelte Einträge zu vermeiden
  membersContainer.innerHTML = "";
  // Erstellen Sie das HTML für jeden ausgewählten Kontakt und fügen Sie es dem Container hinzu
  for (let i = 0; i < task.assignedTo.length; i++) {
    let member = task.assignedTo[i];
    let memberHTML = singleMemberToHTML(member, i);
    membersContainer.insertAdjacentHTML('beforeend', memberHTML);
  }
  // Speichern Sie die zugewiesenen Kontakte im Backend
  await saveAssignedContactsToBackend(task);
}

async function displayAssignedContactsForAllTasks() {
  try {
    // Durchlaufen Sie alle Tasks
    for (const task of currentUser.tasks) {
      // Rufen Sie die HTML-Elemente ab, in die die Mitglieder eingefügt werden sollen
      let membersContainer = document.querySelector(`#taskCard${task.id} .members-container`);
      // Löschen Sie zuerst den vorhandenen Inhalt, um doppelte Einträge zu vermeiden
      membersContainer.innerHTML = "";
      // Erstellen Sie das HTML für jeden ausgewählten Kontakt und fügen Sie es dem Container hinzu
      for (let i = 0; i < task.assignedTo.length; i++) {
        let member = task.assignedTo[i];
        let memberHTML = singleMemberToHTML(member, i);
        membersContainer.insertAdjacentHTML('beforeend', memberHTML);
      }
      // Speichern Sie die zugewiesenen Kontakte im Backend
      await saveAssignedContactsToBackend(task);
    }
  } catch (error) {
    console.error("Error displaying assigned contacts for all tasks:", error);
  }
}

/**
 * Cleared the Task Forms.
 */
function clearTask() {
  document.getElementById("task-form-error").style = "color:red";
  document.getElementById("task-form-error").innerHTML = "";
  selectedCategory = null;
  selectedContacts = [];
  selectedPrio = null;
  subtasks = []
  assigendContacts = [];
  document.getElementById("descriptionID").value = "";
  document.getElementById("form-title").value = "";
  document.getElementById("form-date").value = "";
  document.getElementById("categorys-dropdown").innerHTML = "Select task category";
  renderSubtaskHTML();
  renderAssignes();
  renderHTMLAssignedTo();
  clickedPrio('prio-medium');

}

/**
 * Changes the Style and the functions of the Subtasks Element.
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
 * Reset the Subtask-Input Element to default.
 */
function setSubTaskInputToDefault() {
  document.getElementById("subtasks-to-dropdown").removeAttribute("data-check")
  document.getElementById("subtasks-to-dropdown-arrow").src = "./assets/img/add_tasks/plus_icon.svg";
  document.getElementById("subtask-accept-icon").style = 'display:none;'
  document.getElementById("hiden-divieder").style = 'display:none;'
}

/**
 * Add the Subtasks to the Current List and re-rendered.
 */
function addSubtaskToList() {
  let ele = document.getElementById("subtasks-to-dropdown");
    subtasks.push(new Subtask(ele.value, subtasks.length+1));
    setSubTaskInputToDefault()
    ele.value = "";
    renderSubtaskHTML();
}

/**
 * Render all Subtasks as HTML.
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
                name="subtask-${index}"
                id='subtask-${index}'
                onclick="changeSubtaskInput(this)"
              />
              <div class="subtask-fake-input-btns">
                <button id="subtask-list-edit-btn" onclick='delete_Subtask(${index})'>
                  <img
                    src="./assets/img/add_tasks/edit_icon.svg"
                    id='subtask-img-${index}'
                  />
                </button>
                <div class="btn-divieder"></div>
                <button id="subtask-list-trash-btn" onclick='delete_Subtask(${index})'>
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
 * Change the Title of the current Subtask
 * @param {String} title 
 * @param {Number} subtaskIndex 
 */
function changeSubtaskTitle(title, subtaskIndex) {
  let subtask = subtasks[subtaskIndex];
  subtask.title = title;
}

/**
 * Delete the Subtasks with the ID.
 * @param {Number} subtaskIndex 
 */
function delete_Subtask(subtaskIndex) {
  subtasks.splice(subtaskIndex, 1)
  renderSubtaskHTML();
}


/**
 * Rendered all Assigned to Contacts as HTML.
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
 * Get the Initials of the String. Max. 2.
 * @param {String} contactName 
 * @returns 
 */
function getInitialsByContact(contactName) {
  let initials = "";
  let splits = contactName.split(" ");
  splits.forEach((split) => {
    if(initials.length <= 1) {
      initials += split[0].toUpperCase();
    }
  });
  return initials;
}

/**
 * Rendered all checked Contacts as List.
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
 * Change the Design of clicked Contacts.
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
    assigendContacts.push(contact);
    parentTableRow.classList.add("addedToAssigned");
    checkBox.setAttribute("checked", true);
  }
  renderAssignes();
  // console.log("async function addToAssigned(contact, index)" , "Wann wird diese funktion ausgeführt?");
}

/**
 * Render the List of Assigneds.
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