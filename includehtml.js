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
 * @param {String} contentView - <Board|Add Tasks|Contacts|Summary> 
 */
async function includeContentHTML(contentView) {
    let content = document.getElementById("content");
    content.innerHTML = "";
    switch (contentView) {
        case 'Board':
            var includedContent = await includeTemplate('./assets/templates/board/board_template.html');
            content.innerHTML = includedContent;
            break;
        case 'Add Tasks':
            var includedContent = await includeTemplate('./assets/templates/add_tasks/add_tasks_template.html');
            content.innerHTML = includedContent;
            // add form to formContainer
        break;
        case 'Contacts':
            var includedContent = await includeTemplate('./assets/templates/contacs/contacts_template.html');
            content.innerHTML = includedContent;
            contactsInit();
        break;
        case 'Summary':
            var includedContent = await includeTemplate('./assets/templates/summary/summary_template.html');
            content.innerHTML = includedContent;
        break;
    
        default:
            break;
    }
}

/**
 * Included HTML Content und returnt diesen.
 * @param {*} path - Path to template.
 * @returns - returns response Text
 */
async function includeTemplate(path) {
    let content;
    let resp = await fetch(path);
    if(resp.ok) {
        content = await resp.text();
    } else {
        content = "Page not found. " + resp.status;
    }
    return content;
}