function registerUser(name, email, password) {
    let user = new User(name, email, password);
    users.push(user);
    saveUsers();
}

function emailAlreadyTaken(email) {
    let emails = users.find(a => a.email === email);
    let c = false;

    if(emails != null || emails != undefined) {
        c = true;
    }

    return c;
}
