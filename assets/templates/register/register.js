async function registerUser() {
  let username = document.getElementById("register-name");
  let email = document.getElementById("register-email");
  let password = document.getElementById("register-password");
  let validated = await validateForm();

  if (!validated) return;

  let signedUpSuccessfully = document.getElementById("signedUpSuccessfully");
  signedUpSuccessfully.classList.add("signedUpAnimationDesktop");



  setTimeout(() => {
    let user = new User(username.value, email.value, password.value, null);
    users.push(user);
    currentUser = user;
    currentUser.save();
    window.location.href = "/assets/templates/login/login.html";
    signedUpSuccessfully.classList.remove("signedUpAnimationDesktop");
  }, 1000*1.5)
}

function checkedPrivacy() {
  let checkedEle = document.getElementById("privacy-check");
  let checked = checkedEle.hasAttribute("checked");
  let setAttr = checked
    ? checkedEle.removeAttribute("checked")
    : checkedEle.setAttribute("checked", "");
}

async function validateForm() {
  let c = true;
  let email = document.getElementById("register-email");
  let emailTaken = await emailAlreadyTaken(email);
  let errorMsg = document.getElementById("registerError");
  let checked = document.getElementById("privacy-check").hasAttribute("checked");
  let registerName = document.getElementById("register-name");

  if(registerName == null || registerName.value == "") {
    errorMsg.innerHTML = "U must enter a Username!";
    c = false;
    return c;
  }

  if (email == null || email.value == "") {
    errorMsg.innerHTML = "U must enter a Email Adress!";
    c = false;
    return c;
  }

  if (emailTaken) {
    errorMsg.innerHTML = "A Account with this Email already exists";
    c = false;
    return c;
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
    return c;
  }

  if (password == null || !password.value.match(password_confirm.value)) {
    errorMsg.innerHTML = "Passwords dosnt match!";
    c = false;
    return c;
  }

  if (!checked) {
    errorMsg.innerHTML = "U must accept the privacy police";
    c = false;
    return c;
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
