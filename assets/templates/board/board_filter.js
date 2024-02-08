"use strict";

/**
 * Sucht Schlagwörter im dem Titel und in der Beschreibung. Sollte man meinen.
 * 1. Lege einen Event auf das input "ID: inputFilterphrase".
 */
function addKeyupListener() {
  let inputFilterphrase = document.getElementById("inputFilterphrase");
  inputFilterphrase.addEventListener("keyup", () => {
    filterTasks(inputFilterphrase.value);
  });
}

/**
 * 2. Nun das eingentliche Suchen in dem currentUser: tasksDatasource.
 * @param {Suchwort als Zeichenkette.} phrase
 */
function filterTasks(phrase) {
  tasksDatasourceFiltered = tasksDatasource.filter(
    (task) =>
      task.title.toLowerCase().includes(phrase.toLowerCase()) ||
      task.description.toLowerCase().includes(phrase.toLowerCase())
  );
  renderBoard();
}

// function filterTasks(phrase) {
//     tasksDatasourceFiltered= tasksDatasource.filter(task =>
//         task.title.toLowerCase().includes(phrase.toLowerCase())
//     );
//     renderBoard();
// }
