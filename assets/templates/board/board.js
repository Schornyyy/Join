///////////////// FOR TESTING

let urlPrefix= './assets';

function boardInitForTesting() {
    let contentElement= document.getElementById('content');
    contentElement.classList.remove('d-none');
}

function testen() {
    let tempTask= tasksForTesting[4];
    console.log(getAmountOfSubtasks(tempTask));
    console.log(getAmountOfFinishedSubtasks(tempTask));
    console.log(getSubtaskById(2));
}

//////////////// INIT

function boardInit() {
    boardInitForTesting();
    renderBoard();
}

//////////////// RENDER

function renderBoard() {
    renderTasks('cardContainerTodo', 'todo');
    renderTasks('cardContainerInprogress', 'in progress');
    renderTasks('cardContainerAwaitfeedback', 'await feedback');
    renderTasks('cardContainerDone', 'done');
}

function renderTasks(containerID, status) {
    let cardContainer= document.getElementById(containerID);
    let tasksStatus= getTasksFromStatus(tasksForTesting, status);
    if (tasksStatus.length > 0) {
        cardContainer.innerHTML= tasksToHML(tasksStatus);
    }
}

//////////////// GETTER

function getTasksFromStatus(tasksArray, status){
    return tasksArray.filter((task) => task.status==status);
}

function tasksToHML(tasksParam) {
    let output= '';
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
    output= [];
    let subtaskTemp;
    task.subtasks.forEach(subtaskID => {
        subtaskTemp= getSubtaskById(subtaskID);
        if (subtaskTemp.finished) {
            output.push(subtaskTemp);
        }
    });
    return output;
}

function getSubtaskById(idParam) {
    return subtasksForTesting.find(subtask => subtask.id==idParam);
}

//////////////// TO HTML

function singleTaskToHTML(task) {
    return `
        <div class="task-card">
            ${categoryToHTML(task)}
            <h3>${task.title}</h3>
            <p class="task-description">${task.description}</p>
            ${progressToHTML(task)}
            <div class="members-prio-container">
                ${membersToHTML(task)}
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
    let amountOfSubtasks= getAmountOfSubtasks(task);
    if (amountOfSubtasks > 0) {
        let amountOfFinishedSubtasks= getAmountOfFinishedSubtasks(task);
        return `
            <div class="progress-container">
                <progress class="progress-bar" value="${amountOfFinishedSubtasks}" max="${amountOfSubtasks}"></progress>
                <label for="progressBar"><span>${amountOfFinishedSubtasks}</span>/<span>${amountOfSubtasks}</span>Subtasks</label>
            </div>
        `;
    } else 
        return '';
}

function membersToHTML(task) {
    let iconMoveRightStep= 10;

    return `<div class="members-container">
    <div class="member-icon">AB</div>
</div>`;
}

function singleMemberToHTML(eMail) {
    let member= contactsForTesting.find(contact => contact.email==eMail);
    return `
        <div class="member-icon" style="background-color: ${member.colorCode};">
            ${getFirstLetterOfName(member)}
        </div>    
    `;
}

function getFirstLetterOfName(eMail) {
    let member= contactsForTesting.find(contact => contact.email==eMail);
    return member.name.slice(0,1);
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
    let r= parseInt(hexcode.slice(0,2),16);
    let g= parseInt(hexcode.slice(2,4),16);
    let b= parseInt(hexcode.slice(4),16);
    var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return (a < 0.5);
}



