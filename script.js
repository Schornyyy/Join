const STORAGE_TOKEN = '1WGJFXCVU20M8HTON9ZTKKZ6YH67E347XBHJGJS3';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let contacts = [];
let tasks;

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
}

/**
 * Lädt alle Contacte aus dem Backend.
 */
async function loadContacts() {
   let contactsResp = await getItem("contacts");
   if(contactsResp == "404") {
    contacts = []
   } else {
    contacts.push(contactsResp);
   }
   console.log(contacts, "laden");
    saveContacts();
}

/**
 * Lädt alle Tasks aus dem backend.
 */
async function loadTasks() {
    tasks = await getItem('tasks');
    if(tasks.status != 'error') {
        tasks = tasks;
    } else {
        tasks = [];
    }
}

/**
 * speichert alle Contacte von dem Array contacts im Backend.
 */
async function saveContacts() {
    contacts.push({test: "test"});
    await setItem('contacts', [{}]);
    console.log(await getItem('contacts'));
}

/**
 * speichert alle Tasks von dem Array tasks im Backend.
 */
async function saveTasks() {
    setItem('tasks', tasks);
}