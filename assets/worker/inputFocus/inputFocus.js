/**
 * Die Input felder im focus sollen Border-color ein eigene Farbe haben.
 */
function changeBorderColor(containerId) {
  let container = document.getElementById(containerId);
  container.classList.add('active');
}

  /**
   * Den Focus/ die Farbe wieder entfernen.
   */
function resetBorderColor(containerId) {
  let container = document.getElementById(containerId);
  container.classList.remove('active');
}

/**
 * Input field - border red
 * @param {*} containerId 
 */
function showError(containerId) {
  let container = document.getElementById(containerId);
  container.classList.add('error');
}

// ??? funktion unnötig ???
// Beispiel für die Verwendung, wenn eine falsche E-Mail eingegeben wurde
// function validateEmail() {
//   let emailInput = document.getElementById('emailInput').value;
  
  // Prüfen der E-Mail (z. B. eine einfache Überprüfung auf '@')
//   if (!emailInput.includes('@')) {
//     showError('emailContainer');
//   } else {
//     resetBorderColor('emailContainer');
//   }
// }

// Weitere Funktionen für das Überprüfen von Passwort usw. könnten ähnlich erstellt werden
