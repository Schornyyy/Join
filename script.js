const STORAGE_TOKEN = "NHVJPHBLRQALJ98XTMXQA0FK8V369I8UCJ65G3KN";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let users = [];
let currentUser;

/**
 * Push request to backend.
 * Either it is fulfilled successfully (resolved) or it fails (rejected).
 * @param {lokal storage key} key
 * @param {string} value
 * @returns Promise: resolved or rejected.
 */
async function setItem(key, value) {
  try {
    const payload = { key, value, token: STORAGE_TOKEN };
    const response = await fetch(STORAGE_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during setItem:", error);
    throw error;
  }
}

/**
 * Get request to backend.
 * @param {lokal storage key} key
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  try {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      return res.status;
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    return error;
  }
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
    }
    data.loginCount++;
    localStorage.setItem("userData", JSON.stringify(data));
    await loadDataToUser();
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
}

function removeEventlistenerForContactsResize() {
  if (typeof contactsInit === 'function') {
    window.removeEventListener('resize', contactsInit);
  } else {
    console.warn('Event listener for contactsInit not found.');
  }
}