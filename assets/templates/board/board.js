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


let urlPrefix = './assets';
let tasksDatasource;
let tasksDatasourceFiltered;
let subtasksDatasource;
let contactsDatasource;

//////////////// INIT

function boardInit() {
    tasksDatasource = tasksForTesting;
    tasksDatasourceFiltered = tasksDatasource;
    // subtasksDatasource = subtasksForTesting;
    contactsDatasource = contactsForTesting;
    renderBoard();
    boardInitDragAndDrop();
    addKeyupListener();
}

//////////////// RENDER

function renderBoard() {
    // renderTasks('cardContainerTodo', 'todo');
    renderTasks('cardContainerTodo', 'Open');
    renderTasks('cardContainerInprogress', 'in progress');
    renderTasks('cardContainerAwaitfeedback', 'await feedback');
    renderTasks('cardContainerDone', 'done');
}

function renderTasks(containerID, status) {
    let cardContainer = document.getElementById(containerID);
    // let tasksStatus = getTasksFromStatus(tasksDatasource, status);
    let tasksStatus = getTasksFromStatus(tasksDatasourceFiltered, status);
    cardContainer.innerHTML = tasksToHML(tasksStatus);
    if (tasksStatus.length == 0) cardContainer.innerHTML += cardContainerEmptyToHTML();
}

//////////////// GETTER

function getTaskById(taskID) {
    return tasksDatasource.find(task => task.id == taskID);
}

function getTasksFromStatus(tasksArray, status) {
    return tasksArray.filter((task) => task.status == status);
}

function tasksToHML(tasksParam) {
    let output = '';
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

/*
function getFinishedSubtasks(task) {
    output = [];
    let subtaskTemp;
    task.subtasks.forEach(subtaskID => {
        subtaskTemp = getSubtaskById(subtaskID);
        if (subtaskTemp.finished) {
            output.push(subtaskTemp);
        }
    });
    return output;
}
*/

function getFinishedSubtasks(task) {
    let finishedSubtasks = task.subtasks.find(subtask => subtask.finished);
    if (finishedSubtasks)
        return [finishedSubtasks];
    else
        return [];
}

function getSubtaskById(idParam) {
    return subtasksDatasource.find(subtask => subtask.id == idParam);
}

/*
function getSubtasks(task) {
    let output = [];
    for (let subtaskID of task.subtasks) {
        output.push(subtasksDatasource.find(subtask => subtask.id == subtaskID));
    }
    return output;
}
*/

function getSubtasks(task) {
    return task.subtasks;
}

function getMembers(task) {
    let output = [];
    for (let eMail of task.assignedTo) {
        output.push(contactsForTesting.find(contact => contact.email == eMail));
    }
    return output;
}

function getFirstLetterOfName(member) {
    return member.name.slice(0, 1);
}

function getFirstLettersOfName(name) {
    let words = name.split(' ');
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
        case 'prio-urgent': return `${urlPrefix}/img/board/prio-urgent-icon.svg`;
        case 'prio-medium': return `${urlPrefix}/img/board/prio-medium-icon.svg`;
        case 'prio-low': return `${urlPrefix}/img/board/prio-low-icon.svg`;
        default: return '';
    }
}

//////////////// TO HTML

function singleTaskToHTML(task) {
    return `
        <div class="task-card dragItem" 
                onclick="showDialogDetail(${task.id})"
                draggable="true"
                ondragstart="dragstartHandler(event, ${task.id})"
                id="taskCard${task.id}">
            ${categoryToHTML(task)}
            <h3>${task.title}</h3>
            <p class="task-description">${task.description}</p>
            ${progressToHTML(task)}
            <div class="members-prio-container">
                <div class="members-container">
                    ${membersToHTML(task)}
                </div>
                <img src="${getPrioImgURL(task)}" alt="prio img">
            </div>
        </div>
    `;
}

function getCategoryClass(task) {
    // CSS Klasse für Kategorie von Aufgabe bekommen
    return 'category-user-story';
}

function categoryToHTML(task) {
    return `<p class="task-category ${getCategoryClass(task)}">${task.category}</p>`;
}

function progressToHTML(task) {
    let amountOfSubtasks = getAmountOfSubtasks(task);
    if (amountOfSubtasks > 0) {
        let amountOfFinishedSubtasks = getAmountOfFinishedSubtasks(task);
        return `
            <div class="progress-container">
                <progress class="progress-bar" value="${amountOfFinishedSubtasks}" max="${amountOfSubtasks}"></progress>
                <label for="progressBar"><span>${amountOfFinishedSubtasks}</span>/<span>${amountOfSubtasks}</span>Subtasks</label>
            </div>
        `;
    } else
        return '<div class="progress-container"></div>';
}

function membersToHTML(task) {
    let members = getMembers(task);
    let output = '';
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
    if (!isColorLight(member.colorCode)) textcolor = 'white';
    return `
        <div class="member-icon" style="background-color: ${member.colorCode};color:${textcolor};right:${index * iconRightStep}px">
             ${getFirstLettersOfName(member.name)}
        </div>
    `;
}

function cardContainerEmptyToHTML() {
    return `
        <div class="card-container-empty">
            <p>No tasks</p>
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
    event.dataTransfer.setData('taskID', taskID);
    event.target.classList.add('dragging');
}


function dragoverHandler(event) {
    event.preventDefault();
    markDragover(event.currentTarget);
}

function dropHandler(event, status) {
    let draggedTaskID = event.dataTransfer.getData('taskID');
    let draggedTask = getTaskById(draggedTaskID);
    moveTask(draggedTask, status);
    demarkDragoverAll();
}


function dragleaveHandler(event) {
    event.currentTarget.classList.remove('dragover');
}

function demarkDragoverAll() {
    let cardContainers = document.querySelectorAll('.card-container');
    for (let cardContainerI of cardContainers) {
        demarkDragover(cardContainerI);
    }
}

function markDragover(elem) {
    elem.classList.add('dragover');
}

function demarkDragover(elem) {
    elem.classList.remove('dragover');
}

function moveTask(task, status) {
    task.status = status;
    renderBoard();
    // saveTasks();
}

////////////////////////////////////////////////
//////////////////// FILTER ////////////////////
////////////////////////////////////////////////

function addKeyupListener() {
    let inputFilterphrase = document.getElementById('inputFilterphrase');
    inputFilterphrase.addEventListener('keyup', () => {
        filterTasks(inputFilterphrase.value);
    });
}

function filterTasks(phrase) {
    tasksDatasourceFiltered= tasksDatasource.filter(task =>
        task.title.toLowerCase().includes(phrase.toLowerCase())
    );
    renderBoard();
}

//////////////////////////////////////////////
//////////////////// MISC ////////////////////
//////////////////////////////////////////////

function getRandomColorHex() {
    let colorHex = '#';
    let colorVal;
    for (let i = 0; i < 3; i++) {
        colorVal = Math.floor(Math.random() * 255).toString(16);
        if (colorVal.length == 1)
            colorVal = '0' + colorVal;
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
        return (a < 0.5);
    } else {
        console.log('isColorLight(): Achtung kein hexcode. Gebe einfach true zurück!');
        return true;
    }
}

function timeToInputValueString(time) {
    let output = '';
    let date = new Date(time);

    output += date.getFullYear() + '-';
    output += date.getMonth() + 1 + '-';
    output += date.getDate();

    return output;
}


function hideDialog() {
    let dialogContainer = document.getElementById('dialogContainer');
    dialogContainer.classList.add('reini-d-none');
}
















///////////////////////////////////////////////
//////////////// DIALOG DETAIL ////////////////
///////////////////////////////////////////////

//////////////// SHOW HIDE DETAIL

function showDialogContainer() {
    let dialogContainer = document.getElementById('dialogContainer');
    dialogContainer.classList.remove('reini-d-none');
}

function showDialogDetail(taskID) {
    let detailDialog = document.getElementById('detailDialog');
    let editDialog = document.getElementById('editDialog');
    showDialogContainer();
    detailDialog.classList.remove('reini-d-none');
    editDialog.classList.add('reini-d-none');

    let task = tasksDatasource.find(taskElem => taskElem.id == taskID);
    detailDialog.innerHTML = detailDialogToHTML(task);
}

//////////////// RENDER DETAIL DIALOG

function detailDialogToHTML(task) {
    let dueDate = new Date(task.dueDate);
    // let dueDateString= `${dueDate.getDay()}/${dueDate.getMonth}/${dueDate.getFullYear()}`;
    let dueDateString = `${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;
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
            <p class="detail-priority">${task.prio} <img class="prio-icon" src="${getPrioImgURL(task)}" alt="prio-medium-icon"></p>
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
            <div class="detail-footer-button">
                <img src="./assets/img/board/delete-icon.svg" alt="trashcan">
                <p>Delete</p>
            </div>
            <div class="detail-footer-button" onclick="showDialogEdit(${task.id})">
                <img src="./assets/img/board/edit-icon.svg" alt="pencil">
                <p>Edit</p>
            </div>
        </div>
    `;
}

function detailMembersToHTML(task) {
    members = getMembers(task);
    let output = '';
    for (let member of members) {
        output += detailSingleMemberToHTML(member);
    }
    return output;
}

function detailSingleMemberToHTML(member) {
    let textcolor;
    if (!isColorLight(member.colorCode)) textcolor = 'white';
    return `
        <div class="detail-member">
            <div class="member-icon" style="background-color: ${member.colorCode};color:${textcolor};">${getFirstLetterOfName(member)}</div>
            <p>${member.name}</p>
        </div>
    `;
}

function detailSubtasksToHTML(task) {
    let subtasksTemp = getSubtasks(task);
    let output = '';
    for (let subtaskTemp of subtasksTemp) {
        output += detailSingleSubtaskToHTML(subtaskTemp);
    }
    return output;
}

function detailSingleSubtaskToHTML(subtask) {
    return `
        <div class="detail-subtask">
            <img src="${getSubtaskCheckboxIconURL(subtask)}" alt="checkbox">
            <p>${subtask.title}</p>
        </div>
    `;
}

function getSubtaskCheckboxIconURL(subtask) {
    return subtask.finished ? './assets/img/board/checkbox-checked-icon.svg' : './assets/img/board/checkbox-icon.svg'
}















///////////////////////////////////////////////
//////////////// DIALOG EDIT //////////////////
///////////////////////////////////////////////

let prioNew;

//////////////// SHOW HIDE EDIT

function showDialogEdit(taskID) {
    let detailDialog = document.getElementById('detailDialog');
    let editDialog = document.getElementById('editDialog');
    showDialogContainer();
    detailDialog.classList.add('reini-d-none');
    editDialog.classList.remove('reini-d-none');

    let task = tasksDatasource.find(taskElem => taskElem.id == taskID);
    editDialog.innerHTML = editDialogToHTML(task);
    editDialogFillInputs(task);
}

//////////////// RENDER EDIT DIALOG

function editDialogFillInputs(task) {
    let inputTaskTitle = document.getElementById('inputTaskTitle');
    let inputTaskDescription = document.getElementById('inputTaskDescription');
    let inputTaskDuedate = document.getElementById('inputTaskDuedate');

    inputTaskTitle.value = task.title;
    inputTaskDescription.value = task.description;
    inputTaskDuedate.value = timeToInputValueString(task.dueDate);
    editSetPrioButton(task.prio);
}

function editSetPrioButton(prio) {
    editResetPrioButtons();
    prioNew = prio;
    switch (prio) {
        case 'low':
            let prioButtonLow = document.getElementById('prioButtonLow');
            let prioIconLow = document.getElementById('prioButtonIconLow');
            prioButtonLow.classList.add('input-prio-button-low-set');
            prioIconLow.src = './assets/img/board/prio-low-icon-white.svg';
            break;
        case 'medium':
            let prioButtonMedium = document.getElementById('prioButtonMedium');
            let prioIconMedium = document.getElementById('prioButtonIconMedium');
            prioButtonMedium.classList.add('input-prio-button-medium-set');
            prioIconMedium.src = './assets/img/board/prio-medium-icon-white.svg';
            break;
        case 'urgent':
            let prioButtonUrgent = document.getElementById('prioButtonUrgent');
            let prioIconUrgent = document.getElementById('prioButtonIconUrgent');
            prioButtonUrgent.classList.add('input-prio-button-urgent-set');
            prioIconUrgent.src = './assets/img/board/prio-urgent-icon-white.svg';
            break;
    }
}

function editResetPrioButtons() {
    let prioButtonLow = document.getElementById('prioButtonLow');
    let prioIconLow = document.getElementById('prioButtonIconLow');
    let prioButtonMedium = document.getElementById('prioButtonMedium');
    let prioIconMedium = document.getElementById('prioButtonIconMedium');
    let prioButtonUrgent = document.getElementById('prioButtonUrgent');
    let prioIconUrgent = document.getElementById('prioButtonIconUrgent');

    prioButtonLow.classList.remove('input-prio-button-low-set');
    prioIconLow.src = './assets/img/board/prio-low-icon.svg';
    prioButtonMedium.classList.remove('input-prio-button-medium-set');
    prioIconMedium.src = './assets/img/board/prio-medium-icon.svg';
    prioButtonUrgent.classList.remove('input-prio-button-urgent-set');
    prioIconUrgent.src = './assets/img/board/prio-urgent-icon.svg';
}

function editDialogToHTML(task) {
    return `
        <div class="edit-header">
            <img class="edit-close-icon" src="./assets/img/board/close-icon.svg" alt="close-icon" onclick="showDialogDetail(${task.id})">
        </div>
        <div class="edit-form">
            <div class="input-container">
                <label for="inputTaskTitle">Title</label>
                <input type="text" id="inputTaskTitle">
            </div>
            <div class="input-container">
                <label for="inputTaskDescription">Description</label>
                <input type="text" id="inputTaskDescription">
            </div>
            <div class="input-container">
                <label for="inputTaskDuedate">Due Date</label>
                <input type="date" id="inputTaskDuedate">
            </div>
            <div class="input-container">
                <label for="">Priority</label>
                <div class="input-prio-container">
                    <div class="input-prio-button" id="prioButtonUrgent" onclick="editSetPrioButton('urgent')">
                        <span>Urgent</span>
                        <img class="prio-icon" src="./assets/img/board/prio-urgent-icon.svg" alt="urgent-icon" id="prioButtonIconUrgent">
                    </div>
                    <div class="input-prio-button" id="prioButtonMedium" onclick="editSetPrioButton('medium')">
                        <span>Medium</span>
                        <img class="prio-icon" src="./assets/img/board/prio-medium-icon.svg" alt="medium-icon" id="prioButtonIconMedium">
                    </div>
                    <div class="input-prio-button" id="prioButtonLow" onclick="editSetPrioButton('low')">
                        <span>Low</span>
                        <img class="prio-icon" src="./assets/img/board/prio-low-icon.svg" alt="low-icon" id="prioButtonIconLow">
                    </div>
                </div>
            </div>
            <div class="input-container">
                <label for="">Assigned to</label>
                <select class="edit-select-members" name="select-members" id="selectMembers">
                    <option value="" disabled selected">Select contancts to assign</option>
                    ${editSelectMembersToHTML(task)}
                </select>
                <div id="editTaskMembersContainer">
                    ${editMembersToHTML(task)}
                </div>
            </div>
            <div class="input-container">
                <label for="">Subtask</label>
                <div class="input-wrapper edit-input-wrapper">
                    <input class="input-add-subtask" type="text" placeholder="Add new subtask">
                    <img src="./assets/img/board/plus-icon.svg" alt="plus-icon">
                </div>
                <div class="edit-subtaskList">
                    ${editSubtasksToHTML(task)}
                </div>
            </div>
            <div class="edit-footer">
                <button class="edit-OKbutton" onclick="editSaveTask(${task.id})">
                    <span>Ok</span>
                    <img src="./assets/img/board/check-icon.svg" alt="chek-icon">
                </button>
            </div>

        </div>
    `;
}

function editSelectMembersToHTML(task) {
    let output = '';
    for (let contact of contactsDatasource) {
        output += `
            <option value="${contact.email}">${contact.name}</option>
        `;
    };
    return output;
}

function editSubtasksToHTML(task) {
    let output = '';
    for (let subtask of getSubtasks(task)) {
        output += `
            <li>

                <span>&bull; ${subtask.title}</span>
                <div class="edit-subtask-icon-container">
                    <img src="./assets/img/board/edit-icon.svg" alt="pencil-icon">
                    <img src="./assets/img/board/delete-icon.svg" alt="trashcan-icon">
                </div>
            </li>
        `;
    }
    return output;
}

function editMembersToHTML(task) {
    let members = getMembers(task);
    let output = '';

    for (let member of members) {
        output += editSingleMemberToHTML(member);
    }
    return output;
}

function editSingleMemberToHTML(member) {
    let textcolor;
    if (!isColorLight(member.colorCode)) textcolor = 'white';
    return `
        <div class="member-icon" style="background-color:${member.colorCode};color:${textcolor};">
            ${getFirstLetterOfName(member)}
        </div>
    `;
}

function editSaveTask(taskID) {
    //TODO: Prio, Contacts, Subtasks
    let task = tasksDatasource.find(taskElem => taskElem.id == taskID);
    let inputTaskTitle = document.getElementById('inputTaskTitle');
    let inputTaskDescription = document.getElementById('inputTaskDescription');
    let inputTaskDuedate = document.getElementById('inputTaskDuedate');

    task.title = inputTaskTitle.value;
    task.description = inputTaskDescription.value;
    task.dueDate = new Date(inputTaskDuedate.value).getTime();
    task.prio = prioNew;

    renderBoard();
    // saveTasks();
    showDialogDetail(taskID);
}
















function testen() {
    let tasksTemp = tasks.filter(task => task.title.includes('testen'));
    tasksDatasource = tasksTemp;
    renderBoard();
}

