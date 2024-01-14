async function login() {
  let loginInput = document.getElementById("login-input-email");
  let loginPasswordInput = document.getElementById("login-input-password");
  let errorMsg = document.getElementById("login-error");
  let validated = validateLoginForm();

  if (!validated) return;
  let user = await findUserByEmail(loginInput.value);
  if (user == null) {
    console.log("No user Found!");
    // TOOOOOO      DOOOOOOO -------------------------------------------------------
    return;
  }

  if(!user.password.match(loginPasswordInput.value)) {
    errorMsg.innerHTML = "The password is incorrect!";
    return;
  }

  currentUser = user;
  if (document.getElementById("rememberMe").hasAttribute("checked")) {
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

async function findUserByEmail(email) {
  let u = {};
  users.map((user) => {
    if (user["email"] != null && user["email"] == email) {
      u = user;
    } else {
      u = null;
    }
  });
  return u;
}

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

  return c;
}

function handleRememberme() {
  let e = document.getElementById("rememberMe");
  let checked = e.hasAttribute("checked") ? true : false;
  let handelChecked = checked
    ? e.removeAttribute("checked")
    : e.setAttribute("checked", "");
}

function loginAsGuest() {
  let loginEmailInput = document.getElementById("login-input-email");
  let loginPasswordInout = document.getElementById("login-input-password");
  let loginBtn = document.getElementById("login-btn");
  loginEmailInput.value = "Guest@test.de";
  loginPasswordInout.value = "guest";

  loginBtn.click();
}

function redirectToRegister() {
  window.location.assign("./../register/register.html");
}
