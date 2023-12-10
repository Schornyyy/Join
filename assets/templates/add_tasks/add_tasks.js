let selectedPrio;

function clickedPrio(prioElement) {
    selectedPrio = prioElement;
    let prios = document.querySelectorAll("[data-prio]");
    prios.forEach((p) => {
        let parentEle = p.parentElement;
        let prioAttribute = p.getAttribute("for");
        if(prioAttribute === selectedPrio) {
            switch (selectedPrio) {
                case "prio-urgent":
                    parentEle.style = "background-color: #ff3d00;";
                    p.style = "filter: brightness(0) invert(1);"
                    break;
                case "prio-medium":
                    parentEle.style = "background-color: #ffa800;";
                    p.style = "filter: brightness(0) invert(1);"
                    break;
                case "prio-low":
                    parentEle.style = "background-color: #1fd7c1;";
                    p.style = "filter: brightness(0) invert(1);"
                    break;
                default:
                    break;
            }
        } else {
            parentEle.style = "background-color: white;";
            p.style = "filter: none;";
        }
    })
}