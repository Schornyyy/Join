/*
    -----TABLE OF CONTENTS-----
    01. INIT
    02. RENDER
    03. GETTER
    04. TO HTML
    05. DRAG AND DROP
    06. FILTER
    07. MISC
    ------DIALOG DETAIL------
    08. SHOW HIDE DETAIL
    09. RENDER DETAIL DIALOG
    ------DIALOG EDIT------
    10. SHOW HIDE EDIT
    11. RENDER EDIT DIALOG
    
*/

let urlPrefix = "./assets";
let tasksDatasource;
let tasksDatasourceFiltered;
let contactsDatasource;

//////////////// INIT

/**
 *
 */
function boardInit() {
  tasksDatasource = currentUser.tasks;
  tasksDatasourceFiltered = tasksDatasource;
  contactsDatasource = currentUser.contacts;
  renderBoard();
  boardInitDragAndDrop();
  addKeyupListener();
}

//////////////// RENDER

function renderBoard() {
  // renderTasks('cardContainerTodo', 'todo');
  renderTasks("cardContainerTodo", "Open");
  renderTasks("cardContainerInprogress", "in progress");
  renderTasks("cardContainerAwaitfeedback", "await feedback");
  renderTasks("cardContainerDone", "done");
}

function renderTasks(containerID, status) {
  let cardContainer = document.getElementById(containerID);
  let tasksStatus = getTasksFromStatus(tasksDatasourceFiltered, status);
  cardContainer.innerHTML = tasksToHML(tasksStatus);
  if (tasksStatus.length == 0)
    cardContainer.innerHTML += cardContainerEmptyToHTML();

  // Iteriere durch alle neu hinzugefügten <p> Elemente und weise Kategorienklassen zu
  let taskParagraphs = cardContainer.querySelectorAll('p.task-category');
  taskParagraphs.forEach(assignTaskCategory);
}

//////////////// GETTER

function getTaskById(taskID) {
  return tasksDatasource.find((task) => task.id == taskID);
}

function getTasksFromStatus(tasksArray, status) {
  return tasksArray.filter((task) => task.status == status);
}

function tasksToHML(tasksParam) {
  let output = "";
  for (task of tasksParam) {
    output += singleTaskToHTML(task);
  }
  return output;
}

function getAmountOfSubtasks(task) {
  return task.subtasks.length;
}

function getAmountOfFinishedSubtasks(task) {
  let amount = 0;
  amount += getFinishedSubtasks(task).length;
  return amount;
}

function getFinishedSubtasks(task) {
  let finishedSubtasks = task.subtasks.filter((subtask) => subtask.finished);
  if (finishedSubtasks) return finishedSubtasks;
  else return [];
}

function getSubtasks(task) {
  return task.subtasks;
}

function getMembers(task) {
  let output = [];
  for (let eMail of task.assignedTo) {
    // output.push(contactsDatasource.find(contact => contact.email == eMail));
    let contact = contactsDatasource.find((contact) => contact.email == eMail);
    if (contact) output.push(contact);
  }
  return output;
}

function getFirstLetterOfName(member) {
  return member.name.slice(0, 1);
}

function getFirstLettersOfName(name) {
  let words = name.split(" ");
  switch (words.length) {
    case 1:
      return words[0].slice(0, 2);
    case 2:
      return words[0][0] + words[1][0];
    default:
      return words[0][0] + words[1][0];
  }
}

function getPrioImgURL(task) {
  switch (task.prio) {
    case "prio-urgent":
      return `${urlPrefix}/img/board/prio-urgent-icon.svg`;
    case "prio-medium":
      return `${urlPrefix}/img/board/prio-medium-icon.svg`;
    case "prio-low":
      return `${urlPrefix}/img/board/prio-low-icon.svg`;
    default:
      return "";
  }
}

function getContactByEmail(email) {
  return contactsDatasource.find((contactI) => contactI.email == email);
}

function getCategoryClass(task) {
  // CSS Klasse für Kategorie von Aufgabe bekommen  
  return "category-user-story";  
}

function categoryToHTML(task) {  
  return `<p class="task-category ${getCategoryClass(task)}">${
    task.category
  }</p>`;  
}

function assignTaskCategory(taskElement) {
  let taskType = taskElement.textContent;
  if (taskType === 'Technical Task') {
      taskElement.classList.add('category-technical-task');
      taskElement.classList.remove('category-user-story');
  } else if (taskType === 'User Story') {
      taskElement.classList.add('category-user-story');
  }
}

function membersToHTML(task) {
  let members = getMembers(task);
  let output = "";
  let i = 0;

  for (let member of members) {
    output += singleMemberToHTML(member, i);
    i++;
  }
  return output;
}

function singleMemberToHTML(member, index) {
  let textcolor;
  let iconRightStep = 10;
  if (!isColorLight(member.colorCode)) textcolor = "white";
  return `
        <div class="member-icon" style="background-color: ${
          member.colorCode
        };color:${textcolor};right:${index * iconRightStep}px">
             ${getFirstLettersOfName(member.name)}
        </div>
    `;
}

////////////////////////////////////////////////
//////////////// DRAG AND DROP /////////////////
////////////////////////////////////////////////

function boardInitDragAndDrop() {
  // addDragstartHandler('dragItem');
}

function dragstartHandler(event, taskID) {
  event.dataTransfer.setData("taskID", taskID);
  event.target.classList.add("dragging");
}

function dragoverHandler(event) {
  event.preventDefault();
  markDragover(event.currentTarget);
}

function dropHandler(event, status) {
  let draggedTaskID = event.dataTransfer.getData("taskID");
  let draggedTask = getTaskById(draggedTaskID);
  moveTask(draggedTask, status);
  demarkDragoverAll();
}

function dragleaveHandler(event) {
  event.currentTarget.classList.remove("dragover");
}

function demarkDragoverAll() {
  let cardContainers = document.querySelectorAll(".card-container");
  for (let cardContainerI of cardContainers) {
    demarkDragover(cardContainerI);
  }
}

function markDragover(elem) {
  elem.classList.add("dragover");
}

function demarkDragover(elem) {
  elem.classList.remove("dragover");
}

function moveTask(task, status) {
  task.status = status;
  renderBoard();
  // saveTasks();
  currentUser.save();
}

//////////////////////////////////////////////
//////////////////// MISC ////////////////////
//////////////////////////////////////////////

function getRandomColorHex() {
  let colorHex = "#";
  let colorVal;
  for (let i = 0; i < 3; i++) {
    colorVal = Math.floor(Math.random() * 255).toString(16);
    if (colorVal.length == 1) colorVal = "0" + colorVal;
    colorHex += colorVal;
  }
  return colorHex;
}

function isColorLight(hexcode) {
  if (hexcode) {
    let r = parseInt(hexcode.slice(1, 3), 16);
    let g = parseInt(hexcode.slice(3, 5), 16);
    let b = parseInt(hexcode.slice(5), 16);
    var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return a < 0.5;
  } else {
    return true;
  }
}

function timeToInputValueString(time) {
  let output = "";
  let date = new Date(time);

  output += date.getFullYear() + "-";
  output += date.getMonth() + 1 + "-";
  output += date.getDate();

  return output;
}

function hideDialog() {
  let dialogContainer = document.getElementById("dialogContainer");
  dialogContainer.classList.add("reini-d-none");
  renderBoard();
}

function removeEventListener(elem) {
  let elemClone = elem.cloneNode(true);
  elem.parentNode.replaceChild(elemClone, elem);
}

///////////////////////////////////////////////
//////////////// DIALOG DETAIL ////////////////
///////////////////////////////////////////////

//////////////// SHOW HIDE DETAIL

function showDialogContainer() {
  let dialogContainer = document.getElementById("dialogContainer");
  dialogContainer.classList.remove("reini-d-none");
}

function showDialogDetail(taskID) {
  let detailDialog = document.getElementById("detailDialog");
  let editDialog = document.getElementById("editDialog");
  showDialogContainer();
  detailDialog.classList.remove("reini-d-none");
  editDialog.classList.add("reini-d-none");

  let task = tasksDatasourceFiltered.find((taskElem) => taskElem.id == taskID);
  detailDialog.innerHTML = detailDialogToHTML(task);
}

function deleteTask(taskID) {
  task = getTaskById(taskID);
  index = tasksDatasource.indexOf(task);
  tasksDatasource.splice(index, 1);
  hideDialog();
}

//////////////// RENDER DETAIL DIALOG

function detailDialogToHTML(task) {
  let dueDate = new Date(task.dueDate);
  // let dueDateString= `${dueDate.getDay()}/${dueDate.getMonth}/${dueDate.getFullYear()}`;
  let dueDateString = `${dueDate.getDate()}/${
    dueDate.getMonth() + 1
  }/${dueDate.getFullYear()}`;
  return `
        <div class="detail-header">
            <p class="task-category category-user-story">${task.category}</p>
            <img class="detail-close-icon" src="./assets/img/board/close-icon.svg" alt="close-icon" onclick="hideDialog()">
        </div>
        <h3 class="detail-taskname">${task.title}</h3>
        <p class="detail-task-description">${task.description}</p>
        <div class="detail-date-prio-container">
            <p>Due date:</p>
            <p>${dueDateString}</p>
            <p>Priority:</p>
            <p class="detail-priority">${
              task.prio
            } <img class="prio-icon" src="${getPrioImgURL(
    task
  )}" alt="prio-medium-icon"></p>
        </div>
        <div class="detail-members-container">
            <p class="detail-members-container-headline">Assigned To:</p>
            ${detailMembersToHTML(task)}
        </div>
        <div class="detail-subtasks-container">
            <p class="detail-subtasks-headline">Subtasks</p>
            ${detailSubtasksToHTML(task)}
        </div>
        <div class="detail-footer">
            <div class="detail-footer-button" onclick="deleteTask(${task.id})">
                <img src="./assets/img/board/delete-icon.svg" alt="trashcan">
                <p>Delete</p>
            </div>
            <div class="detail-footer-button" onclick="showDialogEdit(${
              task.id
            })">
                <img src="./assets/img/board/edit-icon.svg" alt="pencil">
                <p>Edit</p>
            </div>
        </div>
    `;
}

function detailMembersToHTML(task) {
  members = getMembers(task);
  let output = "";
  for (let member of members) {
    output += detailSingleMemberToHTML(member);
  }
  return output;
}

function detailSingleMemberToHTML(member) {
  let textcolor;
  if (!isColorLight(member.colorCode)) textcolor = "white";
  return `
        <div class="detail-member">
            <div class="member-icon" style="background-color: ${
              member.colorCode
            };color:${textcolor};">${getFirstLettersOfName(member.name)}</div>
            <p>${member.name}</p>
        </div>
    `;
}

function detailSubtasksToHTML(task) {
  let subtasksTemp = getSubtasks(task);
  let output = "";
  let i = 0;
  for (let subtaskTemp of subtasksTemp) {
    output += detailSingleSubtaskToHTML(subtaskTemp, task, i);
    i++;
  }
  return output;
}

function detailSingleSubtaskToHTML(subtask, task, indexOfSubtask) {
  return `
        <div class="detail-subtask" onclick="toggleSubtask(${
          task.id
        }, ${indexOfSubtask})">
            <img src="${getSubtaskCheckboxIconURL(
              subtask
            )}" alt="checkbox" id="checkbox${indexOfSubtask}">
            <p>${subtask.title}</p>
        </div>
    `;
}

function getSubtaskCheckboxIconURL(subtask) {
  return subtask.finished
    ? "./assets/img/board/checkbox-checked-icon.svg"
    : "./assets/img/board/checkbox-icon.svg";
}

function toggleSubtask(taskID, subtaskIndex) {
  let task = tasksDatasource.find((task) => task.id == taskID);
  let subtask = task.subtasks[subtaskIndex];

  subtask.finished = !subtask.finished;
  currentUser.save();
  showDialogDetail(taskID);
  renderBoard();
}

///////////////////////////////////////////////
//////////////// DIALOG EDIT //////////////////
///////////////////////////////////////////////

let prioNew;
let contactsSelected;

//////////////// SHOW HIDE EDIT

function showDialogEdit(taskID) {
  let detailDialog = document.getElementById("detailDialog");
  let editDialog = document.getElementById("editDialog");
  showDialogContainer();
  detailDialog.classList.add("reini-d-none");
  editDialog.classList.remove("reini-d-none");
  let task = tasksDatasource.find((taskElem) => taskElem.id == taskID);
  setContactsSelected(task);  
  editDialog.innerHTML = editDialogToHTML(task);
  editDialogFillInputs(task);
  addDropdownClickHandler(taskID);
}

function addDropdownClickHandler(taskID) {
  let dialogElem = document.getElementById("editDialog");
  let inputContainerMembersElem = document.getElementById(
    "inputContainerMembers"
  );
  dialogElem.addEventListener("click", (event) => {
    if (inputContainerMembersElem.contains(event.target)) {
      expandDropdown();
    } else {
      collapseDropdown(taskID);
    }
  });
}

function setContactsSelected(task) {
  contactsSelected = structuredClone(task.assignedTo);
}

//////////////// RENDER EDIT DIALOG

function editDialogFillInputs(task) {
  let inputTaskTitle = document.getElementById("inputTaskTitle");
  let inputTaskDescription = document.getElementById("inputTaskDescription");
  let inputTaskDuedate = document.getElementById("inputTaskDuedate");

  inputTaskTitle.value = task.title;
  inputTaskDescription.value = task.description;
  inputTaskDuedate.value = timeToInputValueString(task.dueDate);
  editSetPrioButton(task.prio);
}

function editSetPrioButton(prio) {
  editResetPrioButtons();
  prioNew = prio;
  switch (prio) {
    case "prio-low":
      let prioButtonLow = document.getElementById("prioButtonLow");
      let prioIconLow = document.getElementById("prioButtonIconLow");
      prioButtonLow.classList.add("input-prio-button-low-set");
      prioIconLow.src = "./assets/img/board/prio-low-icon-white.svg";
      break;
    case "prio-medium":
      let prioButtonMedium = document.getElementById("prioButtonMedium");
      let prioIconMedium = document.getElementById("prioButtonIconMedium");
      prioButtonMedium.classList.add("input-prio-button-medium-set");
      prioIconMedium.src = "./assets/img/board/prio-medium-icon-white.svg";
      break;
    case "prio-urgent":
      let prioButtonUrgent = document.getElementById("prioButtonUrgent");
      let prioIconUrgent = document.getElementById("prioButtonIconUrgent");
      prioButtonUrgent.classList.add("input-prio-button-urgent-set");
      prioIconUrgent.src = "./assets/img/board/prio-urgent-icon-white.svg";
      break;
  }
}

function editResetPrioButtons() {
  let prioButtonLow = document.getElementById("prioButtonLow");
  let prioIconLow = document.getElementById("prioButtonIconLow");
  let prioButtonMedium = document.getElementById("prioButtonMedium");
  let prioIconMedium = document.getElementById("prioButtonIconMedium");
  let prioButtonUrgent = document.getElementById("prioButtonUrgent");
  let prioIconUrgent = document.getElementById("prioButtonIconUrgent");

  prioButtonLow.classList.remove("input-prio-button-low-set");
  prioIconLow.src = "./assets/img/board/prio-low-icon.svg";
  prioButtonMedium.classList.remove("input-prio-button-medium-set");
  prioIconMedium.src = "./assets/img/board/prio-medium-icon.svg";
  prioButtonUrgent.classList.remove("input-prio-button-urgent-set");
  prioIconUrgent.src = "./assets/img/board/prio-urgent-icon.svg";
}

function editDialogToHTML(task) {
  return `
        <div class="edit-header">
            <img class="edit-close-icon" src="./assets/img/board/close-icon.svg" alt="close-icon" onclick="showDialogDetail(${
              task.id
            })">
        </div>
        <div class="edit-form">
            <div class="input-container">
                <label for="inputTaskTitle">Title</label>
                <input type="text" name="inputTaskTitle" id="inputTaskTitle">
            </div>
            <div class="input-container">
                <label for="inputTaskDescription">Description</label>
                <input type="text" name="inputTaskDescription" id="inputTaskDescription">
            </div>
            <div class="input-container">
                <label for="inputTaskDuedate">Due Date</label>
                <input type="date" name="inputTaskDuedate" id="inputTaskDuedate">
            </div>
            <div class="input-container">
                <span> for="prioButtonUrgent">Priority</span>
                <div class="input-prio-container">
                    <div class="input-prio-button" name="prioButtonUrgent" id="prioButtonUrgent" onclick="editSetPrioButton('prio-urgent')">
                        <span>Urgent</span>
                        <img class="prio-icon" src="./assets/img/board/prio-urgent-icon.svg" alt="urgent-icon" id="prioButtonIconUrgent">
                    </div>
                    <div class="input-prio-button" id="prioButtonMedium" onclick="editSetPrioButton('prio-medium')">
                        <span>Medium</span>
                        <img class="prio-icon" src="./assets/img/board/prio-medium-icon.svg" alt="medium-icon" id="prioButtonIconMedium">
                    </div>
                    <div class="input-prio-button" id="prioButtonLow" onclick="editSetPrioButton('prio-low')">
                        <span>Low</span>
                        <img class="prio-icon" src="./assets/img/board/prio-low-icon.svg" alt="low-icon" id="prioButtonIconLow">
                    </div>
                </div>
            </div>
            <div class="input-container" id="inputContainerMembers">
                <label for="inputSelectMembers">Assigned to</label>
                <div class="input-wrapper edit-input-wrapper">
                    <input class="input-select-members" type="text" placeholder="Select Contacts to assign" name="inputSelectMembers" id="inputSelectMembers">
                    <img src="./assets/img/board/dropdown-down-icon.svg" alt="dropdown-down" id="dropdownIcon">
                </div>                
                <div class="dropdown-menu reini-d-none" id="dropdownContacts">
                    ${editDropdownMembersToHTML()}
                </div>
                <div class="edit-taskmembers-container" id="editTaskMembersContainer">
                    ${editMembersToHTML(task)}
                </div>
            </div>
            <div class="input-container">
                <label for="inputSubtask">Subtask</label>
                <div class="input-wrapper edit-input-wrapper">
                    <input class="input-add-subtask" type="text" placeholder="Add new subtask" name="inputSubtask" id="inputSubtask">
                    <img src="./assets/img/board/plus-icon.svg" alt="plus-icon" id="addSubtaskIcon" onclick="addSubtask(${
                      task.id
                    })">
                </div>
                <div class="edit-subtaskList" id="subtasksContainer">
                    ${editSubtasksToHTML(task)}
                </div>
            </div>
            <div class="edit-footer">
                <button class="edit-OKbutton" onclick="editSaveTask(${
                  task.id
                })">
                    <span>Ok</span>
                    <img src="./assets/img/board/check-icon.svg" alt="chek-icon">
                </button>
            </div>

        </div>
    `;
}

//////////////// MEMBERS DOPDOWN

function editDropdownMembersToHTML() {
  let output = "";
  let i = 0;
  for (let contact of contactsDatasource) {
    let classString = "members-dropdown-item ";
    let imgURL = "./assets/img/board/checkbox-icon.svg";
    let clickfunction = `addSelectedContact('${contact.email}')`;
    if (isMember(contact.email)) {
      classString += "members-dropdown-item-selected";
      imgURL = "./assets/img/board/checkbox-checked-icon-white.svg";
    }
    output += `
            <div class="${classString}" data-contactemail="${
      contact.email
    }" onclick="dropdownItemClickHandler(event)" id="membersDropdownItem${i}">
                <div class="member-item-name-container">
                    ${singleMemberToHTML(contact, 0)}
                    <span>${contact.name}</span>
                </div>
                <img class="member-item-checkbox-icon" src="${imgURL}" alt="checkbox">
            </div>
        `;
    i++;
  }
  return output;
}

function dropdownItemClickHandler(event) {
  let email = event.currentTarget.dataset.contactemail;
  let itemElem = event.currentTarget;
  if (isMember(email)) {
    demarkItemElementSelected(itemElem.id);
    removeSelectedContact(itemElem.dataset.contactemail);
  } else {
    markItemElementSelected(itemElem.id);
    addSelectedContact(itemElem.dataset.contactemail);
  }
}

function markItemElementSelected(elementID) {
  let element = document.getElementById(elementID);
  let imgElement = document.querySelector(
    `#${elementID} .member-item-checkbox-icon`
  );
  element.classList.add("members-dropdown-item-selected");
  imgElement.src = "./assets/img/board/checkbox-checked-icon-white.svg";
}

function demarkItemElementSelected(elementID) {
  let element = document.getElementById(elementID);
  let imgElement = document.querySelector(
    `#${elementID} .member-item-checkbox-icon`
  );
  element.classList.remove("members-dropdown-item-selected");
  imgElement.src = "./assets/img/board/checkbox-icon.svg";
}

function isMember(email) {
  return contactsSelected.includes(email);
}

function removeSelectedContact(email) {
  let index = contactsSelected.indexOf(email);
  contactsSelected.splice(index, 1);
}

function addSelectedContact(email) {
  contactsSelected.push(email);
}

function expandDropdown() {
  let dropdownContactsElement = document.getElementById("dropdownContacts");
  let editTaskMembersContainerElement = document.getElementById(
    "editTaskMembersContainer"
  );

  dropdownIcon.src = "./assets/img/board/dropdown-up-icon.svg";
  dropdownContactsElement.classList.remove("reini-d-none");
  editTaskMembersContainerElement.classList.add("reini-d-none");
}

function collapseDropdown() {
  let dropdownContactsElement = document.getElementById("dropdownContacts");
  let editTaskMembersContainerElement = document.getElementById(
    "editTaskMembersContainer"
  );
  let dropdownIcon = document.getElementById("dropdownIcon");

  dropdownIcon.src = "./assets/img/board/dropdown-down-icon.svg";
  dropdownContactsElement.classList.add("reini-d-none");
  editTaskMembersContainerElement.classList.remove("reini-d-none");
  reloadTaskMembersContainer();
}

//////////////// MEMBER CONTAINER

function editMembersToHTML(memberMails) {  
  if (memberMails.length === 0) {
    return ""; // Return empty string if no contacts selected
  }
  let output = "";
  for (let i = 0; i < memberMails.length; i++) {
    let member = getContactByEmail(memberMails[i]);
    output += editSingleMemberToHTML(member);
  }
  return output;
}

/**
 * chate
 * @param {*} member
 * @returns
 */
// function editSingleMemberToHTML(member) {
//   console.log(member);
//   let textcolor;
//   if (member && member.colorCode) {
//     if (!isColorLight(member.colorCode)) textcolor = "white";
//     return `
//       <div class="member-icon" style="background-color:${
//         member.colorCode
//       };color:${textcolor || "black"};">
//         ${getFirstLettersOfName(member.name)}
//       </div>
//     `;
//   } else {
//     console.log("Probleme was.");
//     return "";
//   }
// }

function editSingleMemberToHTML(member) {
  let textcolor;  
  if (member && member.colorCode) {
    if (!isColorLight(member.colorCode)) textcolor = "white";
    return `
      <div class="member-icon" style="background-color:${
        member.colorCode
      };color:${textcolor || "black"};">
        ${getFirstLettersOfName(member.name)}
      </div>
    `;
  }  
  return '';
}


function reloadTaskMembersContainer() {
  let elem = document.getElementById("editTaskMembersContainer");
  elem.innerHTML = editMembersToHTML(contactsSelected);
}

//////////////// SUBTASKS

function editSubtasksToHTML(task) {
  let output = "";
  let i = 0;
  for (let subtask of getSubtasks(task)) {
    output += `
            <li>
                <div>
                    <span>&bull; </span><span id="subtaskTitle${i}">${subtask.title}</span>
                    <input type="text" class="input-subtask reini-d-none" name="inputSubtask${i}" id="inputSubtask${i}">
                </div>
                <div class="edit-subtask-icon-container">
                    <img src="./assets/img/board/edit-icon.svg" alt="pencil-icon" id="pencilIcon${i}" onclick="editSubtaskStart(${i})">
                    <img src="./assets/img/board/delete-icon.svg" alt="trashcan-icon" id="trashcanIcon${i}" onclick="deleteSubtask(${task.id}, ${i})">
                    <img class="reini-d-none edit-check-icon" src="./assets/img/board/check-icon-black.svg" alt="check-icon" id="checkIcon${i}" onclick="editSubtaskEnd(${task.id},${i})">
                </div>
            </li>
        `;
    i++;
  }
  return output;
}

function addSubtask(taskID) {
  let task = getTaskById(taskID);
  let inputSubtaskElem = document.getElementById("inputSubtask");
  let title = inputSubtaskElem.value;
  if (title) {
    task.subtasks.push(new Subtask(title, 13));
    reloadSubtasksContainer(task);
  }
}

function deleteSubtask(taskID, index) {
  let task = getTaskById(taskID);
  task.subtasks.splice(index, 1);
  reloadSubtasksContainer(task);
}

function editSubtaskStart(index) {
  let titleElem = document.getElementById("subtaskTitle" + index);
  let inputElem = document.getElementById("inputSubtask" + index);
  let pencilIconElem = document.getElementById("pencilIcon" + index);
  let trashIconElem = document.getElementById("trashcanIcon" + index);
  let checkIconElem = document.getElementById("checkIcon" + index);

  titleElem.classList.add("reini-d-none");
  inputElem.value = titleElem.innerHTML;
  inputElem.classList.remove("reini-d-none");
  pencilIconElem.classList.add("reini-d-none");
  checkIconElem.classList.remove("reini-d-none");
}

function editSubtaskEnd(taskID, index) {
  let task = getTaskById(taskID);
  let inputElem = document.getElementById("inputSubtask" + index);
  task.subtasks[index].title = inputElem.value;
  reloadSubtasksContainer(task);
}

function reloadSubtasksContainer(task) {
  let elem = document.getElementById("subtasksContainer");
  elem.innerHTML = editSubtasksToHTML(task);
}

//////////////// SAVE TASK

function editSaveTask(taskID) {
  //TODO: Subtasks
  let task = tasksDatasource.find((taskElem) => taskElem.id == taskID);
  let inputTaskTitle = document.getElementById("inputTaskTitle");
  let inputTaskDescription = document.getElementById("inputTaskDescription");
  let inputTaskDuedate = document.getElementById("inputTaskDuedate");

  task.title = inputTaskTitle.value;
  task.description = inputTaskDescription.value;
  task.dueDate = new Date(inputTaskDuedate.value).getTime();
  task.prio = prioNew;
  task.assignedTo = [];
  for (let i = 0; i < contactsSelected.length; i++) {
    task.assignedTo.push(contactsSelected[i]);
  }

  // renderBoard();
  currentUser.save();
  showDialogDetail(taskID);
}

function testen() {
  let x = document.getElementById("checkIcon0");
}
