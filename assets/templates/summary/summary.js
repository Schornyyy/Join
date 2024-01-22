let showedLoginGreeting = false;

/**
 * Show your greeting after login.
 */
async function initSummeryData() {
  if (!showedLoginGreeting) {
    showGreetScreen();
    showedLoginGreeting = true;
    initSummeryDataRest();
  } else {
    initSummeryDataRest();
  }
  document.getElementById("summaryToDos").style.display = "flex";
}

/**
 * Your greeting / you are welcome as guest.
 */
function showGreetScreen() {
  let screen = document.getElementById("summary-greet-user-screen");
  screen.classList.add("showScreen");

  setTimeout(() => {
    screen.classList.remove("showScreen");
  }, 2500);
}

/**
 * Your greeting / you are welcome as member.
 */
// async function greetUser() {
//   let greetingEles = document.getElementsByClassName("summery-greetX");
//   let userName = await currentUser.name;
//   greetingEles.innerHTML = "";
//   Array.from(greetingEles).forEach((ele) => {

//     if (userName.match("Guest Master") ){
//       userName = "";
//     } else {
//     ele.innerHTML = userName;
//     };
// }

async function greetUser() {
  let greetingEles = document.getElementsByClassName("summery-greetX");
  let userName = await currentUser.name;
  if (userName.match("Guest Master")) {
    userName = "";
  }

  Array.from(greetingEles).forEach((ele) => {
    ele.innerHTML = userName;
  });
}

/**
 * Gets the current tasks.
 */
async function initSummeryDataRest() {
  await greetUser();
  getTodosCounting();
  getTodoStatusCounting("summery-done-todos", "done");
  getTodoStatusCounting("summery-process-tasks", "in progress");
  getTodoStatusCounting("summery-awaiting-task", "await feedback");
  getUrgentTask();
}

/**
 * The current open tasks.
 */
function getTodosCounting() {
  let summeryTodoSize = document.querySelectorAll("[data-todos]");
  summeryTodoSize.forEach((ele) => {
    ele.innerHTML = "";
    ele.innerHTML = "" + currentUser.tasks.length;
  });
}

/**
 * Status function. From the three importances to choose from.
 * @param {IDs of each reactangle} eleId
 * @param {The status when setting the tasks} status
 */
function getTodoStatusCounting(eleId, status) {
  let doneTodosEle = document.getElementById(eleId);
  doneTodosEle.innerHTML = "";
  let arr = currentUser.tasks;
  arr = arr.filter((a) => a.status.match(status));
  doneTodosEle.innerHTML = arr.length;
}

/**
 * Get the current urgent task and next nearest date.
 */
function getUrgentTask() {
  let summerUrgentDateEle = document.getElementById("summery-urgent-date");
  let tasks = currentUser.tasks;
  let firstDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };

  tasks.forEach((task) => {
    let dueDate = new Date(task.dueDate);
    let today = new Date();
    if (firstDate <= dueDate) {
      if (today >= dueDate) {
        firstDate = dueDate;
      }
    }
  });
  summerUrgentDateEle.innerHTML = firstDate.toLocaleDateString(
    "en-US",
    options
  );
  getTasksonDate(firstDate);
}

/**
 * Format the nearest date in en-US.
 * @param {nearest date} date
 */
function getTasksonDate(date) {
  let upcomingTasksEle = document.getElementById("summery-upcoming-tasks");
  let arr = currentUser.tasks;
  const options = { year: "numeric", month: "long", day: "numeric" };
  let dateToString = new Date(date).toLocaleDateString("en-US", options);
  let tasksForDay = [];
  arr.forEach((task) => {
    let taskDate = new Date(task.dueDate).toLocaleDateString("en-US", options);
    if (taskDate.match(dateToString)) {
      tasksForDay.push(task);
    }
  });
  upcomingTasksEle.innerHTML = tasksForDay.length;
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

/**
 * Symmary content animate images.
 * @param {Image to animate whit hover} element
 */
function changeImageBack(element) {
  const img = element.querySelector(".summaryAnimateProgramm");
  if (img.classList.contains("editImage")) {
    img.src = "assets/img/summary/summaryGrayEdit.svg";
  } else if (img.classList.contains("checkImage")) {
    img.src = "assets/img/summary/summaryCheckGray.svg";
  }
}
