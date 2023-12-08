const STORAGE_TOKEN = '1WGJFXCVU20M8HTON9ZTKKZ6YH67E347XBHJGJS3';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/**
 * 
 * Speichert einen Value zum Key im Backend
 * 
 * @param {*} key 
 * @param {*} value 
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
 * @param {*} key 
 * @returns 
 */

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}