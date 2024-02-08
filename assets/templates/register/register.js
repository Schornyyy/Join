/**
 * Validate forms.
 * @returns
 */
async function registerUser() {
  let username = document.getElementById("register-name");
  let email = document.getElementById("register-email");
  let password = document.getElementById("register-password");
  let validated = await validateForm();
  if (!validated) return;
  let signedUpSuccessfully = document.getElementById("signedUpSuccessfully");
  signedUpSuccessfully.classList.add("signedUpAnimationDesktop");

  /**
   * If user registert, then switch to login.
   */
  setTimeout(async () => {
    let user = new User(username.value, email.value, password.value, null);
    users.push(user);
    currentUser = user;
    currentUser.save();
    await setItem(JSON.stringify(email), JSON.stringify(user));
    window.location.href = "/assets/templates/login/login.html";
    signedUpSuccessfully.classList.remove("signedUpAnimationDesktop");
  }, 1000 * 1.5);
}

/**
 * Check if privacy checked.
 */
function checkedPrivacy() {
  let checkedEle = document.getElementById("privacy-check");
  let checked = checkedEle.hasAttribute("checked");
  let setAttr = checked
    ? checkedEle.removeAttribute("checked")
    : checkedEle.setAttribute("checked", "");
}

/**
 * Checking the name input.
 * Checking the email input.
 * Checking the password input.
 * Checking the privacy-check input.
 * @returns
 */
async function validateForm() {
  let c = true;
  let email = document.getElementById("register-email");
  let emailTaken = await emailAlreadyTaken(email);
  let errorMsg = document.getElementById("registerError");
  let checked = document
    .getElementById("privacy-check")
    .hasAttribute("checked");
  let registerName = document.getElementById("register-name");
  showErrorBorder("[data-register]", true);
  if (registerName == null || registerName.value == "") {
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

/**
 * Check validate the currently email.
 * @param {currently email to login} email
 * @returns
 */
async function emailAlreadyTaken(email) {
  let emails = await users.find((a) => a.email === email);
  let c = false;
  if (emails != null || emails != undefined) {
    c = true;
  }
  return c;
}

/**
 * switch back from register page to login page.
 */
function redirectToLoin() {
  window.location.assign("./../login/login.html");
}

/**
 * To hide or show currentpassword in any fild.
 * @param {each input from origin HTML-element} passwordId
 * @param {each inputImage from origin HTML-element} imageId
 */
function changeToShowCurrentPassword(passwordId, imageId) {
  let hideThePassword = document.getElementById(passwordId);
  let hideThePasswordImage = document.getElementById(imageId);

  if (hideThePassword.type == "password") {
    hideThePassword.type = "text";
    hideThePasswordImage.src = "/assets/img/login/lock.svg";
  } else {
    hideThePassword.type = "password";
    hideThePasswordImage.src = "/assets/img/login/visibility_off.svg";
  }
}
