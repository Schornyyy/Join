let selectedPrio;

function clickedPrio(prioElement) {
    selectedPrio = prioElement.getAttribute("for");
    let parentEle = prioElement.parentElement;
    let prios = document.querySelectorAll("[data-prio]");
    prios.forEach((p) => {
        let prioAttribute = p.getAttribute("for");
        if(prioAttribute.match(selectedPrio)) {
            switch (selectedPrio) {
                case "prio-urgent":
                    parentEle.style = "background-color: #ff3d00;";
                    break;
                case "prio-medium":
                    parentEle.style = "background-color: #ffa800;";
                    break;
                case "prio-low":
                    parentEle.style = "background-color: #1fd7c1;";
                    break;
                default:
                    break;
            }
        } else {
            parentEle.style = "background-color: white;"
            parentEle.style = "filter: none";
        }
    })
}