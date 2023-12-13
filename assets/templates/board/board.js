///////////////// FOR TESTING

let urlPrefix= '../..';

function initForTesting() {
    includeContentHTML('Board');
}

//////////////// INIT

function boardInit() {
    initForTesting();
    renderBoard();
}

//////////////// RENDER

function renderBoard() {
    renderTodo();
}

function renderTodo() {
    let cardContainerTodo= document.getElementById('cardContainerTodo');
    let tasksTodo= getTasksFromStatus('todo');
    if (tasksTodo.length > 0) {
        cardContainerTodo.innerHTML= tasksToHML(tasksTodo);
    }
}

////// MULTIPLE TASKS

function getTasksFromStatus(status){
    return tasks.filter((task) => task.status==status);
}

function tasksToHML(tasksParam) {
    let output= '';
    for (task of tasksParam) {
        output += singleTaskToHTML(task);
    }
    return output;
}   

////// SINGLE TASK

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

function getPrioImgURL(task) {
    switch (task.prio) {
        case 'urgent': return `${urlPrefix}/img/board/prio-urgent-icon.svg`;
        case 'medium': return `${urlPrefix}/img/board/prio-medium-icon.svg`;
        case 'low': return `${urlPrefix}/img/board/prio-low-icon.svg`;
        default: return '';
    }
}



