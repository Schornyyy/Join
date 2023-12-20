document.addEventListener("DOMContentLoaded", function () {
    contactsInit();
});

window.addEventListener("load", function () {
    contactsInit();
});

async function contactsInit() {        
    try {
        console.log("Vor dem Kontakt Laden");
        contactsData = await fetchContactsData();
        console.log("Nach dem Kontakt Laden");               
        renderContacts();
        renderAddContactButton();
    } catch (error) {
        console.error("Fehler beim Initialisieren der Kontakte:", error);
    }    
    showHeaderAndFooter();
}

function renderAddContactButton() {
    const content = document.getElementById("contactsContent");
    const addContactButtonContainer = document.createElement("div");
    addContactButtonContainer.classList.add("addContactButtonContainer");    
    addContactButtonContainer.innerHTML = '<img src="../assets/img/addContactButtonMobile.svg" class="addContactImage" onclick="handleAddContactClick()">';  // onclick-Funktion direkt im HTML-Code
    content.appendChild(addContactButtonContainer);
}

function handleAddContactClick() {  // Diese Funktion wird direkt im HTML-Code aufgerufen
    addContactScreen();
}

async function fetchContactsData() {
    try {
        const response = await fetch("../assets/templates/contacs/allContacts.json");
        const data = await response.json();        
        return data.sort((a, b) => a.contactName.localeCompare(b.contactName));  // Sortiert die Kontakte nach dem Namen
    } catch (error) {
        console.error("Fehler beim Laden der Kontakte:", error);
        throw error;
    }
}

function renderContacts() {
    const content = document.getElementById("contactsContent");
    content.innerHTML = "";

    const contactsByFirstLetter = {};

    contactsData.forEach(oneContact => {
        const firstLetter = oneContact.contactName.charAt(0).toUpperCase();

        if (!contactsByFirstLetter[firstLetter]) {
            contactsByFirstLetter[firstLetter] = /*html*/`
                <div class="letterAndContactsContainer">
                    <div class="letter-column">
                        <h2 class="contact-first-letter">${firstLetter}</h2>
                    </div>
                </div>
            `;
        }

        const oneContactContainer = /*html*/`
            <div class="justifyContentCenter">
                <div>
                    <img src="${oneContact.contactImg}" class="contactImg">
                </div>
                <div class="contact-info-container">
                    <h2>${oneContact.contactName}</h2>
                    <a>${oneContact.contactMailAdress}</a>
                </div>
            </div>
        `;

        contactsByFirstLetter[firstLetter] += oneContactContainer;
    });

    Object.values(contactsByFirstLetter).forEach(section => {
        content.innerHTML += section;
    });
}

function addContactScreen() {
    const content = document.getElementById("contactsContent");
    content.innerHTML = /*html*/`                        
                        <div class="addContactContainerHeader">
                            <div class="addContactCloseXContainer" onclick="contactsInit()">
                                <img src="../assets/img/addContactCloseX.svg" alt="">
                            </div>
                            <div class="addContactBlockHeader">
                                <p class="addContactH1">Add contact</p>
                                <p class="addContactText">Tasks are better with a team!</p>
                                <img class="addContactBlueStroked" src="../assets/img/addContactBlueStroked.svg" alt="">
                            </div>
                        </div>                        

                        <div class="addContactBlankUserImg">
                            <img src="../assets/img/addContactBlankUserImg.svg" alt="">
                        </div>

                        <form onsubmit="createContact()">
                            <div class="addContactContainerFooter">
                                <input class="addContactInputName" type="text" required placeholder="Name"> 
                                <input class="addContactInputMailAddresss" type="text" required placeholder="E Mail">
                                <input class="addContactInputPhone" type="text" required placeholder="Phone">
                                <img class="createContactButtonImg" src="../assets/img/createContactButton.svg" alt="" onclick="createContact()">
                            </div>
                        </form>
                        `;
    hideHeaderAndFooter();
}

function hideHeaderAndFooter() {    
    const mobileHeader = document.getElementById("headerTemplate");  // Verstecke mobileHeader und menuTemplate
    const menuTemplate = document.getElementById("menuTemplate");
        mobileHeader.style.display = "none";
        menuTemplate.style.display = "none";
}

function showHeaderAndFooter() {
    const mobileHeader = document.getElementById("headerTemplate");  // Verstecke mobileHeader und menuTemplate
    const menuTemplate = document.getElementById("menuTemplate");
        mobileHeader.style.display = "block";
        menuTemplate.style.display = "block";
}

function createContact() {
    const nameInput = document.querySelector('.addContactInputName');
    const mailInput = document.querySelector('.addContactInputMailAddresss');
    const phoneInput = document.querySelector('.addContactInputPhone');

    // Daten aus den Input-Feldern lesen
    const newName = nameInput.value.trim();
    const newMail = mailInput.value.trim();
    const newPhone = phoneInput.value.trim();

    // Überprüfen, ob alle Felder ausgefüllt sind
    if (newName === '' || newMail === '' || newPhone === '') {
        alert('Bitte füllen Sie alle Felder aus.');
        return;
    }

    // Neuen Kontakt erstellen
    const newContact = {
        contactName: newName,
        contactMailAdress: newMail,
        contactPhone: newPhone,        
    };

    // Daten zum JSON-Array hinzufügen
    contactsData.push(newContact);

    // JSON-Array speichern (z.B. auf dem Server)
    saveContactsData(newContact);

    // Zurück zur Kontaktliste wechseln
    renderContacts();
}

async function saveContactsData(data) {
    let contact = new Contact(data.contactName, data.contactMailAdress, data.contactPhone)
    contacts.push(contact);
    saveContacts()
}