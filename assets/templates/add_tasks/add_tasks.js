let prio;

function clickedPrio(prioElement) {
    prio = prioElement.getAttribute("for");
    let ele = prioElement.parentNode;
    let prios = document.querySelectorAll("[data-prio]");
    prios.forEach(p => {
        if(p.getAttribute("for") === prio) {
            if(prio === "prio-urgent") {
                ele.style = "background-color: #ff3d00";
            } else if(prio === "prio-medium") {
                ele.style = "background-color: #ffa800";
            } else if(prio === "prio-low") {
                ele.style = "background-color: #1fd7c1";
            }
            p.parentNode.style = "filter: brightness(0) invert(1);";
        } else {
            p.style = "background-color: white;"
            prioElement.style = "filter: none";
        }
    })
}