///////////////// FOR TESTING

let urlPrefix= './assets';

let tasksForTesting= [
    {
        id: 0,
        title: 'eins',
        description: 'erste Aufgabe zum testen von Board',
        prio: 'urgent', //string oder number?
        category: 'testing Board', //Farbe für Kategorien muss wo gespeichert werden
        assignedTo: [], //eigene Klasse für Kontake bzw. User?
        subtasks: [],
        status: 'in progress' //brauchen wir zum Einordnen in eine section (bzw. spalte). Vielleicht statt finished?
    },
    {
        id: 1,
        title: 'zwo',
        description: 'zweite Aufgabe kommt in Spalte await feedback',
        prio: 'medium',
        category: 'another category', //
        assignedTo: [],
        subtasks: [],
        status: 'await feedback'
    },
    {
        id: 2,
        title: 'drei',
        description: 'lorem ipsum',
        prio: 'medium',
        category: 'third category',
        assignedTo: [],
        subtasks: [],
        status: 'done'
    },
    {
        id: 3,
        title: 'vier',
        description: 'eine zweite Aufgabe für die Spalte in progress',
        prio: 'low',
        category: 'irgendwas',
        assignedTo: [],
        subtasks: [],
        status: 'in progress'
    },
    {
        id: 4,
        title: 'fünf',
        description: 'Ich habe sogar Unteraufgaben ;)',
        prio: 'low',
        category: 'irgendwas',
        assignedTo: [],
        subtasks: [0, 1],
        status: 'done'
    },
    {
        id: 5,
        title: 'sechs',
        description: 'Die Spalte ToDo braucht auch eine Aufgabe.',
        prio: 'low',
        category: 'farbe',
        assignedTo: [],
        subtasks: [],
        status: 'todo'
    },
];

let subtasksForTesting= [
    {
        id: 0,
        title: 'erste Unteraufgabe',
        finished: false
    },
    {
        id: 1,
        title: 'zweite Unteraufgabe',
        finished: true
    }
];

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



