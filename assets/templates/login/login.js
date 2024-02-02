/**
 * Validate user befor login.
 * Remember user in local storage.
 * @returns Else, then error message.
 */
async function login() {
  let loginInput = document.getElementById("login-input-email");
  let loginPasswordInput = document.getElementById("login-input-password");
  let errorMsg = document.getElementById("login-error");
  let validated = validateLoginForm();

  if (!validated) return;
  let user = await findUserByEmail(loginInput.value);

  if (user == null) {    
    return;
  }  

  if (user == null) {
    errorMsg.innerHTML = "No user found with this email address.";
    return;
  }

  if (!user.password.match(loginPasswordInput.value)) {
    errorMsg.innerHTML = "The password is incorrect!";
    return;
  }

  currentUser = user;
  if (document.getElementById("rememberMe").checked) {
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...user, remberMe: true, loginCount: 0 })
    );
  } else {
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...user, remberMe: false, loginCount: 0 })
    );
  }
  window.location.assign("./../../../index.html");
}

/**
 * Find currently user in backend.
 * @param {currently email from input} email
 * @returns Boolean
 */
async function findUserByEmail(email) {
  /*
  let u = {};
  users.map((user) => {
    if (user["email"] != null && user["email"] == email) {
      u = user;
    } else {
      u = null;
    }
  });
  return u;
*/
  return users.find((userI) => userI.email == email);
}

/**
 * Manual verification of correct entry of email and password fields.
 * @returns Else, then error message.
 */
function validateLoginForm() {
  let loginInput = document.getElementById("login-input-email");
  let loginPasswordInput = document.getElementById("login-input-password");
  let errorMsg = document.getElementById("login-error");
  let c = true;

  if (loginInput.value == "") {
    errorMsg.innerHTML = "U must enter a Email!";
    c = false;
  }

  if (loginPasswordInput.value == "") {
    errorMsg.innerHTML = "U must enter a Password";
    c = false;
  }

  showErrorBorder("[data-login]", true);
  return c;
}

/**
 * Remember checked for last / currently user.
 */
function handleRememberme() {
  let e = document.getElementById("rememberMe");
  let checked = e.hasAttribute("checked") ? true : false;
  let handelChecked = checked
    ? e.removeAttribute("checked")
    : e.setAttribute("checked", "");
}

/**
 * Guest access to test the application.
 */
function loginAsGuest() {
  let loginEmailInput = document.getElementById("login-input-email");
  let loginPasswordInout = document.getElementById("login-input-password");
  let loginBtn = document.getElementById("login-btn");
  loginEmailInput.value = "Guest@test.de";
  loginPasswordInout.value = "test";
  loginBtn.click();
}

function redirectToRegister() {
  window.location.assign("./../register/register.html");
}
