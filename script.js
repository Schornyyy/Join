const STORAGE_TOKEN = "MU03W9OLC4M9O5ZLSW91OZWGA938X4EBLQKC0CNW";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let users = [];
let currentUser;

/**
 * Push request to backend.
 * @param {lokal storage key} key
 * @param {string} value
 * @returns
 */
async function setItem(key, value) {
  //"users" -> array(User, User, User)
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  let resp;
  await fetch(url).then((res) => {
    if (res.ok) {
      resp = res.json();
    } else {
      resp = res.status;
    }
  });
  return resp;
}

/**
 * load data from backend
 */
async function loadData() {
  await loadUsers();
  if (localStorage.getItem("userData") != null) {
    let data = JSON.parse(localStorage.getItem("userData"));
    if (data.loginCount == 2 && !data.remberMe) {
      localStorage.clear();
      window.location.href = "/assets/templates/login/login.html";
    }
    data.loginCount++;
    localStorage.setItem("userData", JSON.stringify(data));
    await loadDataToUser();
  } else if (
    !window.location.href.match("/assets/templates/login/login.html") &&
    !window.location.href.match("/assets/templates/register/register.html")
  ) {
    window.location.href = "/assets/templates/login/login.html";
  }
}

/**
 * load users from backend
 */
async function loadUsers() {
  let usersResp = await getItem("users");
  if (usersResp == "404") {
    users = [];
  } else {
    users = JSON.parse(usersResp.data.value);
  }
  console.log("loaded User: ", users);
}

/**
 * push data to current user
 */
async function loadDataToUser() {
  let userData = JSON.parse(localStorage.getItem("userData"));
  let userEmail = userData.email;
  let user = await users.find((a) => a.email == userEmail);
  let u = new User("", "", "", "");
  u.loadFromJSON(user);
  u.contacts = user.contacts;
  u.contacts = u.contacts.sort((a, b) => a.name.localeCompare(b.name));
  currentUser = u;
  console.log("User: ", u);
}

/**
 * Edit Users array. To then save if needed.
 * @param {*} contactIndex
 * @param {*} obj
 */
function editUser(contactIndex, obj) {
  let contact = users[contactIndex];
  let vals = Object.values(obj);
  let keys = Object.keys(obj);
  for (let index = 0; index < vals.length; index++) {
    contact[keys[index]] = vals[index];
  }
  console.log("Edited Contact: ", users);
}
