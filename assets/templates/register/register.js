/**
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 */
function registerUser() {
    let username = document.getElementById("register-name").value;
    let email = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let validated = validateForm();

    if(!validated) return;

    let user = new User(username, email, password);
    users.push(user);
    saveUsers();
    window.location.href = "/assets/templates/login/login.html";
}

function validateForm() {
    let c = true;
    let email = document.getElementById("register-email")
    let emailTaken = emailAlreadyTaken(email);
    let errorMsg = document.getElementById("registerError");

    if(email.value == "") {
        errorMsg.innerHTML = "U must enter a Email Adress!";
        c = false;
    }

    if(emailTaken) {
        errorMsg.innerHTML = "A Account with this Email already exists";
        c = false;
    }

    if(document.getElementById("register-name").value == "") {
        errorMsg.innerHTML = "U must enter a Username!"
        c = false;
    }

    let password = document.getElementById("register-password");
    let password_confirm = document.getElementById("register-password-confirm");
    
    if(password.value == "" || password_confirm.value == "") {
        errorMsg.innerHTML = "U must enter a Password!";
        c = false;
    }

    if(!password.value.match(password_confirm.value)) {
        errorMsg.innerHTML = "Passwords dosnt match!";
        c = false;
    }

    return c;
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
