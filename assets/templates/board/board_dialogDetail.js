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



  
