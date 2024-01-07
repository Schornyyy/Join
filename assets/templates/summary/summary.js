"use strict";

async function initSummeryData() {
  getTodosSize();
  getTodoStatusSize("summery-done-todos", "Done");
  getTodoStatusSize("summery-process-tasks", "Process");
  getTodoStatusSize("summery-awaiting-task", "Feedback");
  getUrgentTask();
  await greetUser();
}


/**
 * Symmary content animate images.
 * @param {Image to animate whit hover} element
 */
function changeImage(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "assets/img/summary/summaryWhiteEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "assets/img/summary/summaryCheckWhite.svg";
  }
}

function changeImageBack(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "assets/img/summary/summaryGrayEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "assets/img/summary/summaryCheckGray.svg";
  }
}

function getTodosSize() {
  let summeryTodoSize = document.querySelectorAll("[data-todos]");
  summeryTodoSize.forEach(ele => {
    ele.innerHTML = "";
    ele.innerHTML = "" + currentUser.tasks.length;
  })
}

function getTodoStatusSize(eleId, status) {
  let doneTodosEle = document.getElementById(eleId);
  doneTodosEle.innerHTML = "";
  let arr = currentUser.tasks;
  arr = arr.filter((a) => a.status.match(status))
  doneTodosEle.innerHTML = arr.length;
}

// function eventListern() {
//   let events = document.querySelectorAll("[onclick]");
//   events.forEach((ele) => {
//     ele.addEventListener(onclick, (e) => {
//       let func = ele.getAttribute("onclick");
//       func();
//     })
//   })
// }

function getUrgentTask() {
  let summerUrgentDateEle = document.getElementById("summery-urgent-date");
  let tasks = currentUser.tasks;
  let firstDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  tasks.forEach(task => {
    let dueDate = new Date(task.dueDate);
    let today = new Date();
    if(firstDate <= dueDate) {
      if(today >= dueDate) {
        firstDate = dueDate;
      }
    }
  })
  summerUrgentDateEle.innerHTML = firstDate.toLocaleDateString('en-US', options);
  getTasksonDate(firstDate);
}

function getTasksonDate(date) {
  let upcomingTasksEle = document.getElementById("summery-upcoming-tasks");
  let arr = currentUser.tasks;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let dateToString = new Date(date).toLocaleDateString('en-US', options);
  let tasksForDay = []
  arr.forEach((task) => {
    let taskDate = new Date(task.dueDate).toLocaleDateString('en-US', options);
    if(taskDate.match(dateToString)) {
      tasksForDay.push(task);
    }
  })
  upcomingTasksEle.innerHTML = (tasksForDay.length)
}

async function greetUser() {
  let greetingEle = document.getElementById("summery-greet");
  let userName = await currentUser.name;
  greetingEle.innerHTML = "";
  greetingEle.innerHTML = userName;
}
