///////////////// FOR TESTING

let urlPrefix= './assets';


//////////////// INIT

function boardInit() {
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
    console.log('renderTasks(), containerID: ' + containerID);
    console.log('renderTasks(), cardContainer: ' + cardContainer);
    let tasksStatus= getTasksFromStatus(tasksForTesting, status);
    if (tasksStatus.length > 0) {
        cardContainer.innerHTML= tasksToHML(tasksStatus);
    }
}

//////////////// GET TASKS

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
    return `<div class="progress-container">
    <progress class="progress-bar" id="progressBar2" value="50" max="100"></progress>
    <label for="progressBar"><span id="subtasksDone2">1</span>/<span id="subtasksAmount2">2</span>
        Subtasks</label>
</div>`;
}

function membersToHTML(task) {
    return `<div class="members-container">
    <div class="member-icon">AB</div>
</div>`;
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



