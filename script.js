const STORAGE_TOKEN = 'MU03W9OLC4M9O5ZLSW91OZWGA938X4EBLQKC0CNW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let contacts = [];
let tasks = [];
let users = [];
let currentUser;

/**
 * 
 * Speichert einen Value zum Key im Backend
 * 
 * @param {String} key 
 * @param {ArrayofObject} value 
 * 
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * Nimmt die Daten aus dem Backend mit dem Key
 * 
 * @param {String} key 
 * @returns 
 */

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    let resp;
        await fetch(url).then((res) => {
            if(res.ok) {
                resp = res.json();
            } else {
                resp = res.status;
            }
        })
    return resp;
}


/**
 * Lädt alle nötigen Daten aus dem Backend.
 */
async function loadData() {
    await loadContacts();
    await loadTasks();
    await loadUsers();
    if(localStorage.getItem("userData") != null) {
        if(window.location.href.match("/index.html")) {
            await loadDataToUser();
        }
    } else if(!window.location.href.match("/assets/templates/login/login.html") 
    && !window.location.href.match("/assets/templates/register/register.html")){
        window.location.href = "/assets/templates/login/login.html";
    }
}

/**
 * Lädt alle Contacte aus dem Backend.
 */
async function loadContacts() {
   let contactsResp = await getItem("contacts");
   if(contactsResp == "404") {
    contacts = []
   } else {
    contacts = JSON.parse(contactsResp.data.value);
   }
}

/**
 * Lädt alle User aus dem Backend.
 */
async function loadUsers() {
    let usersResp = await getItem("users");
    if(usersResp == "404") {
     users = []
    } else {
        users = JSON.parse(usersResp.data.value);
    }
 }

/**
 * Lädt alle Tasks aus dem backend.
 */
async function loadTasks() {
   let tasksResp = await getItem("tasks");
   if(tasksResp == "404") {
    tasks = []
   } else {
    tasks = JSON.parse(tasksResp.data.value);
   }
//    console.log(tasks);
}

/**
 * speichert alle Contacte von dem Array contacts im Backend.
 */
async function saveContacts() {
    await setItem('contacts', contacts);
}

/**
 * speichert alle User von dem Array contacts im Backend.
 */
async function saveUsers() {
    let l = await setItem('users', users);
}

/**
 * speichert alle Tasks von dem Array tasks im Backend.
 */
async function saveTasks() {
    setItem('tasks', tasks);
}


/**
 * Lädt alle daten zum aktulisieren des offenen Tabs?
 */
async function loadDataToUser() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let userEmail = userData.email;
    let user = await users.find(a => a.email == userEmail);
    let u = new User(user.name, user.email, user.password);

    tasks.forEach((task) => {
        if(task.from == u.name) {
            u.addTask(task);
        }
    })

    currentUser = u;
}
