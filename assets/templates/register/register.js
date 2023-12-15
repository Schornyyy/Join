/**
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} password 
 */
async function registerUser() {
    let username = document.getElementById("register-name");
    let email = document.getElementById("register-email");
    let password = document.getElementById("register-password");
    let validated = await validateForm();

    if(!validated) return;

    let user = new User(username.value, email.value, password.value);
    users.push(user);
    saveUsers();
    window.location.href = "/assets/templates/login/login.html";
}

async function validateForm() {
    let c = true;
    let email = document.getElementById("register-email")
    let emailTaken = await emailAlreadyTaken(email);
    let errorMsg = document.getElementById("registerError");

    if( email == null || email.value == "") {
        errorMsg.innerHTML = "U must enter a Email Adress!";
        c = false;
    }

    if(emailTaken) {
        errorMsg.innerHTML = "A Account with this Email already exists";
        c = false;
    }

    if(document.getElementById("register-name") == null || document.getElementById("register-name").value == "") {
        errorMsg.innerHTML = "U must enter a Username!"
        c = false;
    }

    let password = document.getElementById("register-password");
    let password_confirm = document.getElementById("register-password-confirm");
    
    if(password == null || password_confirm == null || password.value == "" || password_confirm.value == "") {
        errorMsg.innerHTML = "U must enter a Password!";
        c = false;
    }

    if(password == null || !password.value.match(password_confirm.value)) {
        errorMsg.innerHTML = "Passwords dosnt match!";
        c = false;
    }

    return c;
}


/**
 * @param {*} email 
 * @returns 
 */
async function emailAlreadyTaken(email) {
    let emails = await users.find(a => a.email === email);
    let c = false;

    if(emails != null || emails != undefined) {
        c = true;
    }

    return c;
}


// async function registOnclick() {
//     let regNameInp = document.getElementById("nameRegist").value;
//     let regEmailInp = document.getElementById("registerInpMail").value;
//     let regPassInp = document.getElementById("RegisterInpPass").value;
//     let regConfirmPassInp = document.getElementById("ConfirmPasswort").value;

//     await emailAlreadyTaken(regEmailInp);
//     registerUser(regNameInp, regEmailInp, regPassInp)
// }
// input validieren
// email prüfen.
// an registerUser(1,2,3) übergeben.

// local storage "Remember me"