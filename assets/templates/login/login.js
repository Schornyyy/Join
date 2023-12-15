let user;
let rememberMe = false;
let data = {
    email: "",
    rememberMe: rememberMe,
};


/**
 * Logged den User ein.
 */
function login() {
    let userExists = userEmailExists();
    let userEmail = document.getElementById("login-input-email").value;
    let password = document.getElementById("login-input-password").value;
    let errorMsg = document.getElementById("login-error");
    errorMsg.style = "color: red";
    
    if(!userExists) return;
    user = findUserByEmail(userEmail);

    let matchPassword = userPasswordMatch(password);
    if(!matchPassword) {
        errorMsg.innerHTML = "Wrong password";
        return;
    }
    data.email = userEmail;
    localStorage.setItem("userData", data);
}


/**
 * Handled die RememberMe Function
 * @param {Checkbox} element 
 */
function handleRememberme(element) {
    let ele = element;

    rememberMe ? ele.setAttribute("checked", false) : ele.setAttribute("checked", true) ;

    rememberMe = !rememberMe;
}

/**
 * Checkt ob das Password übereinstimmt.
 * @param {String} password 
 * @returns true | false
 */
function userPasswordMatch(password) {
    return user.password.match(password);
}

/**
 * Schaut ob ein User mit dieser email existiert.
 * @returns true | false
 */
function userEmailExists() {
    let errorMsg = document.getElementById("login-error");
    errorMsg.style = "color: red";
    let userEmail = document.getElementById("login-input-email").value;
    let c = true;

    if(!findUserByEmail(userEmail)) {
        errorMsg.innerHTML = "No User with Email: " + userEmail;
        c = false;
    }
    return c;
}


/**
 * 
 * @param {String} email 
 * @returns gibt den User als 
 */
function findUserByEmail(email) {
    return users.find(a => a.email===email);
}