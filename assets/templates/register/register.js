/**
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 */
function registerUser(name, email, password) {
    let user = new User(name, email, password);
    users.push(user);
    saveUsers();
}


/**
 * Wo kann ich die Funktion abfragen?
 * @param {*} email 
 * @returns 
 */
function emailAlreadyTaken(email) {
    let emails = users.find(a => a.email === email);
    let c = false;

    if(emails != null || emails != undefined) {
        c = true;
    }

    return c;
}


async function registOnclick() {
    let regNameInp = document.getElementById("nameRegist").value;
    let regEmailInp = document.getElementById("registerInpMail").value;
    let regPassInp = document.getElementById("RegisterInpPass").value;
    let regConfirmPassInp = document.getElementById("ConfirmPasswort").value;

    await emailAlreadyTaken(regEmailInp);
    registerUser(regNameInp, regEmailInp, regPassInp)
}
// input validieren
// email prüfen.
// an registerUser(1,2,3) übergeben.

// local storage "Remember me"