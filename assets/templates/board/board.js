let urlPrefix = './assets';
let tasksDatasource;
let subtasksDatasource;

//////////////// INIT

function boardInit() {
    tasksDatasource= tasksForTesting;
    subtasksDatasource= subtasksForTesting;
    renderBoard();
    showDialogEdit();
}

//////////////// RENDER

function renderBoard() {
    renderTasks('cardContainerTodo', 'todo');
    renderTasks('cardContainerInprogress', 'in progress');
    renderTasks('cardContainerAwaitfeedback', 'await feedback');
    renderTasks('cardContainerDone', 'done');
}

function renderTasks(containerID, status) {
    let cardContainer = document.getElementById(containerID);
    let tasksStatus = getTasksFromStatus(tasksDatasource, status);
    if (tasksStatus.length > 0) {
        cardContainer.innerHTML = tasksToHML(tasksStatus);
    }
}

//////////////// GETTER

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
    return getFinishedSubtasks(task).length;
}

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

function getSubtaskById(idParam) {
    return subtasksDatasource.find(subtask => subtask.id == idParam);
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

//////////////// TO HTML

function singleTaskToHTML(task) {
    return `
        <div class="task-card" onclick="showDialogDetail(${task.id})">
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
    // CSS Klasse für Kagegorie von Aufgabe bekommen
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
            ${getFirstLetterOfName(member)}
        </div>    
    `;
}

//////////////// MISC


function getPrioImgURL(task) {
    switch (task.prio) {
        case 'urgent': return `${urlPrefix}/img/board/prio-urgent-icon.svg`;
        case 'medium': return `${urlPrefix}/img/board/prio-medium-icon.svg`;
        case 'low': return `${urlPrefix}/img/board/prio-low-icon.svg`;
        default: return '';
    }
}

function isColorLight(hexcode) {
    let r = parseInt(hexcode.slice(1, 3), 16);
    let g = parseInt(hexcode.slice(3, 5), 16);
    let b = parseInt(hexcode.slice(5), 16);
    var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return (a < 0.5);
}





///////////////////////////////////////////////
//////////////// DIALOG DETAIL ////////////////
///////////////////////////////////////////////


//////////////// RENDER DETAIL DIALOG

function detailDialogToHTML(task) {
    let dueDate= new Date(task.dueDate);
    // let dueDateString= `${dueDate.getDay()}/${dueDate.getMonth}/${dueDate.getFullYear()}`;
    let dueDateString= `${dueDate.getDate()}/${dueDate.getMonth()+1}/${dueDate.getFullYear()}`;
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
            <div class="detail-footer-button">
                <img src="./assets/img/board/edit-icon.svg" alt="pencil">
                <p>Edit</p>
            </div>
        </div>
    `;
}

function detailMembersToHTML(task) {
    members= getMembers(task);
    let output= '';
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
    let subtasksTemp= getSubtasks(task);
    let output= '';
    for (let subtaskTemp of subtasksTemp) {
        output += detailSingleSubtaskToHTML(subtaskTemp);
    }
    return output;
}

function getSubtasks(task) {
    let output= [];
    for (let subtaskID of task.subtasks) {
        output.push(subtasksDatasource.find(subt => subt.id==subtaskID));
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


//////////////// SHOW HIDE

function showDialogContainer() {
    let dialogContainer= document.getElementById('dialogContainer');
    dialogContainer.classList.remove('reini-d-none');
}

function hideDialog() {
    let dialogContainer= document.getElementById('dialogContainer');
    dialogContainer.classList.add('reini-d-none');
}

function showDialogDetail(taskID) {
    let detailDialog= document.getElementById('detailDialog');
    let editDialog= document.getElementById('editDialog');
    showDialogContainer();
    detailDialog.classList.remove('reini-d-none');
    editDialog.classList.add('reini-d-none');
    
    let task= tasksDatasource.find(taskElem => taskElem.id==taskID);
    detailDialog.innerHTML= detailDialogToHTML(task);
}






///////////////////////////////////////////////
//////////////// DIALOG EDIT ////////////////
///////////////////////////////////////////////

function showDialogEdit(task) {
    let detailDialog= document.getElementById('detailDialog');
    let editDialog= document.getElementById('editDialog');
    showDialogContainer();
    detailDialog.classList.add('reini-d-none');
    editDialog.classList.remove('reini-d-none');
}