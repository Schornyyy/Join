async function init() {
    await includeHTML();
}
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/**
 * Wird beim MenuItem click ausgeführt um den Content zu laden. 
 * 
 * @param {path zum template} path 
 */
async function includeContentHTML(path) {
    let content = document.getElementById("content");
    content.innerHTML = "";
    let resp = await fetch(path);
    if(resp.ok) {
        content.innerHTML = await resp.text();
    } else {
        content.innerHTML = "Page not found. " + resp.status;
    }
} 