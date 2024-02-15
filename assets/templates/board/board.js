
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
    console.log("function getMembers(task)" , task.assignedTo)
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
  output += numToStringTwoDigits(date.getMonth() +1) + "-";
  output += numToStringTwoDigits(date.getDate());

  return output;
}

function numToStringTwoDigits(num) {
  if (num < 10) return '0'+num;
  else return num.toString();
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