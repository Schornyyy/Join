/**
 * Starts all processes.
 */
async function init() {
  await includeHTML();
  await loadData();
  initSummeryData();
}

/**
 * Initializes all documents.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Executed when MenuItem click to load the content.
 * @param {String} contentView - <Board|Add Tasks|Contacts|Summary>
 */
async function includeContentHTML(contentView) {
  let content = document.getElementById("content");
  content.innerHTML = "";

  switch (contentView) {
    case "Board":
      var includedContent = await includeTemplate(
        "./assets/templates/board/board_template.html"
      );
      content.innerHTML = includedContent;
      boardInit();
      break;

    case "Add Tasks":
      var includedContent = await includeTemplate(
        "./assets/templates/add_tasks/add_tasks_template.html"
      );
      content.innerHTML = includedContent;
      await includeAddTaskFormTempalte();
      initEventListener();
      break;

    case "Contacts":
      var includedContent = await includeTemplate(
        "./assets/templates/contacs/contacts_template.html"
      );
      content.innerHTML = includedContent;
      contactsInit();
      break;

    case "Privacy Policy":
      var includedContent = await includeTemplate(
        "./assets/templates/privacy_policy/privacy_policy_internal.html"
      );
      content.innerHTML = includedContent;
      break;

    case "Legal notice":
      var includedContent = await includeTemplate(
        "./assets/templates/legal_notice/legal_notice_internal.html"
      );
      content.innerHTML = includedContent;
      break;

    case "Help":
      var includedContent = await includeTemplate(
        "./assets/templates/help/help.html"
      );
      content.innerHTML = includedContent;
      break;

    case "Summary":
      var includedContent = await includeTemplate(
        "./assets/templates/summary/summary_template.html"
      );
      content.innerHTML = includedContent;
      initSummeryData();
      break;
    default:
      break;
  }
}

/**
 * Include HTML Content and return.
 * @param {*} path - Path to template.
 * @returns - returns response Text
 */
async function includeTemplate(path) {
  let content;
  let resp = await fetch(path);
  if (resp.ok) {
    content = await resp.text();
  } else {
    content = "Page not found. " + resp.status;
  }
  return content;
}
