const STORAGE_TOKEN = 'MU03W9OLC4M9O5ZLSW91OZWGA938X4EBLQKC0CNW';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
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
    await loadUsers();
    if(localStorage.getItem("userData") != null) {
        await loadDataToUser();
    } else if(!window.location.href.match("/assets/templates/login/login.html") 
    && !window.location.href.match("/assets/templates/register/register.html")){
        window.location.href = "/assets/templates/login/login.html";
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
        users.push(JSON.parse(usersResp.data.value));
    }
    console.log("loaded User: ", users);
 }

/**
 * Lädt alle daten zum aktulisieren des offenen Tabs?
 */
async function loadDataToUser() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let userEmail = userData.email;
    let user = await users.find(a => a.email == userEmail);
    let u = new User(user.name, user.email, user.password);
    u.contacts = user.contacts;
    u.contacts = u.contacts.map((contact, index) => ({ ...contact, id: index}));
    u.contacts = u.contacts.sort((a, b) => a.name.localeCompare(b.name));
    currentUser = u;
    console.log("User: ", u);
}


function editContactObject(contactIndex ,obj) {
    let contact = currentUser.contacts[contactIndex];
    // let vals = Object.values(obj)
    // let keys = Object.keys(obj);
    // for (let index = 0; index < vals.length; index++) {
    //     contact[keys[index]] = vals[index];
    // }
    console.log("Edited Contact: ", currentUser.contacts);
}