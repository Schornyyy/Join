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
