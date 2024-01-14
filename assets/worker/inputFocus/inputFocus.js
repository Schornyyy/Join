function changeBorderColor(containerId) {
  let FocusContainer = document.getElementById(containerId);
  FocusContainer.classList.add("active");
}

function resetBorderColor(containerId) {
  let FocusContainer = document.getElementById(containerId);
  FocusContainer.classList.remove("active");
}

function showErrorBorder(inputData, useParent) {
  //Inputdata = "[data-<Deine Sache>]"
  let dataElements = document.querySelectorAll(inputData);

  dataElements.forEach(ele => {
    if(useParent) {
      if(ele == null || ele.value == "") {
        ele.parentElement.classList.add("error");
      } else if(ele.value != "") {
        if(ele.parentElement.classList.contains("error")) {
          ele.parentElement.classList.remove("error");
        }
      }
    } else {
      if(ele == null || ele.value == "") {
        ele.classList.add("error");
      } else if(ele.value != "") {
        if(ele.classList.contains("error")) {
          ele.classList.remove("error");
        }
      }
    }
  })

}
