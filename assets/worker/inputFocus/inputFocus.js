function changeBorderColor(containerId) {
  var container = document.getElementById(containerId);
  container.classList.add('active');
}

function resetBorderColor(containerId) {
  var container = document.getElementById(containerId);
  container.classList.remove('active');
}

function showError(containerId) {
  var container = document.getElementById(containerId);
  container.classList.add('error');
}

// Beispiel für die Verwendung, wenn eine falsche E-Mail eingegeben wurde
function validateEmail() {
  var emailInput = document.getElementById('emailInput').value;
  
  // Prüfen der E-Mail (z. B. eine einfache Überprüfung auf '@')
  if (!emailInput.includes('@')) {
    showError('emailContainer');
  } else {
    resetBorderColor('emailContainer');
  }
}

// Weitere Funktionen für das Überprüfen von Passwort usw. könnten ähnlich erstellt werden
