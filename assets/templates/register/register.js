async function registerUser() {
  let username = document.getElementById("register-name");
  let email = document.getElementById("register-email");
  let password = document.getElementById("register-password");
  let validated = await validateForm();

  if (!validated) return;

  let user = new User(username.value, email.value, password.value);
  users.push(user);
  saveUsers();
  window.location.href = "/assets/templates/login/login.html";
}

function checkedPrivacy() {
  let checkedEle = document.getElementById("privacy-check");
  let checked = checkedEle.hasAttribute("checked");
  let setAttr = checked
    ? checkedEle.removeAttribute("checked")
    : checkedEle.setAttribute("checked", "");
  return checked;
}

async function validateForm() {
  let c = true;
  let email = document.getElementById("register-email");
  let emailTaken = await emailAlreadyTaken(email);
  let errorMsg = document.getElementById("registerError");
  let checked = checkedPrivacy();

  if (email == null || email.value == "") {
    errorMsg.innerHTML = "U must enter a Email Adress!";
    c = false;
  }

  if (emailTaken) {
    errorMsg.innerHTML = "A Account with this Email already exists";
    c = false;
  }

  if (
    document.getElementById("register-name") == null ||
    document.getElementById("register-name").value == ""
  ) {
    errorMsg.innerHTML = "U must enter a Username!";
    c = false;
  }

  if (!checked) {
    errorMsg.innerHTML = "U must accept the privacy police";
    c = false;
  }

  let password = document.getElementById("register-password");
  let password_confirm = document.getElementById("register-password-confirm");

  if (
    password == null ||
    password_confirm == null ||
    password.value == "" ||
    password_confirm.value == ""
  ) {
    errorMsg.innerHTML = "U must enter a Password!";
    c = false;
  }

  if (password == null || !password.value.match(password_confirm.value)) {
    errorMsg.innerHTML = "Passwords dosnt match!";
    c = false;
  }

  return c;
}

async function emailAlreadyTaken(email) {
  let emails = await users.find((a) => a.email === email);
  let c = false;

  if (emails != null || emails != undefined) {
    c = true;
  }

  return c;
}

function redirectToLoin() {
  window.location.assign("./../login/login.html");
}
