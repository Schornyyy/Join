
/**
 * 
 * @param {*} task 
 * @returns 
 */
function singleTaskToHTML(task) {
  // console.log("singleTaskToHTML(task)" , task);
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
// ${detailMembersToHTML(task)}
// ${task.assignedTo}

function progressToHTML(task) {
  let amountOfSubtasks = getAmountOfSubtasks(task);
  if (amountOfSubtasks > 0) {
    let amountOfFinishedSubtasks = getAmountOfFinishedSubtasks(task);
    return `
            <div class="progress-container">
                <progress class="progress-bar" value="${amountOfFinishedSubtasks}" max="${amountOfSubtasks}"></progress>
                <span><span>${amountOfFinishedSubtasks}</span>/<span>${amountOfSubtasks}</span>Subtasks</span>
            </div>
        `;
  } else return '<div class="progress-container"></div>';
}

function cardContainerEmptyToHTML() {
  return `
          <div class="card-container-empty">
           <p>No tasks</p>
          </div>
    `;
}
