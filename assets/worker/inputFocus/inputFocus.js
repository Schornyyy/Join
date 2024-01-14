function changeBorderColor(containerId) {
  let FocusContainer = document.getElementById(containerId);
  FocusContainer.classList.add("active");
}

function resetBorderColor(containerId) {
  let FocusContainer = document.getElementById(containerId);
  FocusContainer.classList.remove("active");
}

function showError(containerId) {
  let FocusContainer = document.getElementById(containerId);
  FocusContainer.classList.add("error");
}

function removeError(inputId) {
  let inputElement = document.getElementById(inputId);
  inputElement.classList.remove("error");
}
