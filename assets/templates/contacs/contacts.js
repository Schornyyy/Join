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
        showHeaderAndFooter();        
        renderContacts();
        renderAddContactButton();
    } catch (error) {
        console.error("Fehler beim Initialisieren der Kontakte:", error);
    }
}

function renderAddContactButton() {
    const content = document.getElementById("contactsContent");
    const addContactButtonContainer = document.createElement("div");
    addContactButtonContainer.classList.add("addContactButtonContainer");    
    addContactButtonContainer.innerHTML = '<img src="../assets/img/contact/addContactButtonMobile.svg" class="addContactImage" onclick="handleAddContactClick()">';  // onclick-Funktion direkt im HTML-Code
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
    contactsData.forEach(oneContact => {  // Hier werden die Kontakte Jeweils erstellt und den Buchstaben zugeordnet
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
            <div class="justifyContentCenter" onclick="openContactScreen()">
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
    content.innerHTML = /*html*/ `
                            <div class="addContactContainerHeader">
                                <div class="addContactCloseXContainer" onclick="contactsInit()">
                                    <img src="../assets/img/contact/addContactCloseX.svg" alt="">
                                </div>

                            <div class="addContactBlockHeader">
                                <p class="addContactH1">Add contact</p>
                                <p class="addContactText">Tasks are better with a team!</p>
                                <img class="addContactBlueStroked" src="../assets/img/contact/addContactBlueStroked.svg" alt="">
                            </div>

                            <div>
                                <img class="addContactBlankUserImg" src="../assets/img/contact/addContactBlankUserImg.svg" alt="">
                            </div>
                        </div>

                        <form onsubmit="createContact()">
                            <div class="addContactContainerFooter">
                                <input class="addContactInputName" type="text" required placeholder="Name">
                                <input class="addContactInputMailAddresss" type="text" required placeholder="E Mail">
                                <input class="addContactInputPhone" type="text" required placeholder="Phone">
                                <img class="createContactButtonImg" src="../assets/img/contact/createContactButton.svg" alt="" onclick="createContact()">
                            <div>
                        </form>
                        `;
    hideHeaderAndFooter();
}

function hideHeaderAndFooter() {    
    const mobileHeader = document.querySelector(".mobileHeader");  // Verstecke mobileHeader und menuTemplate
    const menuTemplate = document.querySelector(".menuTemplate");
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
    saveContactsData(contactsData);

    // Zurück zur Kontaktliste wechseln
    renderContacts();
}

async function saveContactsData(data) {
    try {
        const authToken = STORAGE_TOKEN; // Authentifizierungstoken einfügen
        const response = await fetch('../assets/templates/contacs/allContacts.json', {
            method: 'Post', // Änderet die Methode auf PUT oder POST, je nach Serverkonfiguration
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`, // Füget den Authentifizierungstoken zum Header hinzu
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Fehler beim Speichern der Kontakte. Status: ' + response.status);
        }

        console.log('Kontakte erfolgreich gespeichert.');
    } catch (error) {
        console.error('Fehler beim Speichern der Kontakte:', error);        
    }
}

function editContactScreen(contactId) {
    const content = document.getElementById("contactsContent");    
    const selectedContact = contactsData.find(contact => contact.id === contactId);  // Findet den ausgewählten Kontakt anhand der ID
    content.innerHTML = /*html*/`
        <div class="addContactContainerHeader">
                            <div class="addContactCloseXContainer" onclick="contactsInit()">
                                <img src="../assets/img/contact/addContactCloseX.svg" alt="">
                            </div>
                            <div class="addContactBlockHeader">
                                <p class="addContactH1">Edit contact</p>                                
                                <img class="addContactBlueStroked" src="../assets/img/contact/addContactBlueStroked.svg" alt="">
                            </div>
                        </div>
                        <div class="addContactBlankUserImg">
                            <img src="../assets/img/contact/antonMayer.svg" alt="">
                        </div>
        <form onsubmit="updateContact(${selectedContact.id})">
            <div class="addContactContainerFooter">
                <input class="addContactInputName" type="text" required placeholder="Name" value="${selectedContact.contactName}"> 
                <input class="addContactInputMailAddresss" type="text" required placeholder="E Mail" value="${selectedContact.contactMailAdress}">
                <input class="addContactInputPhone" type="text" required placeholder="Phone" value="${selectedContact.contactPhone}">
                <div>
                    <img class="createContactButtonImg" src="../assets/img/contact/editContactDeleteButtonImg.svg" alt="" onclick="deleteContact(${selectedContact.id})">
                    <img class="createContactButtonImg" src="../assets/img/contact/editContactSaveButtonImg.svg" alt="" onclick="saveContact(${selectedContact.id})">
                </div>
                
            </div>
        </form>
    `;
    hideHeaderAndFooter();
}

function updateContact(contactId) {
    const nameInput = document.querySelector('.addContactInputName');
    const mailInput = document.querySelector('.addContactInputMailAddresss');
    const phoneInput = document.querySelector('.addContactInputPhone');    
    const updatedName = nameInput.value.trim();  // Daten aus den Input-Feldern lesen
    const updatedMail = mailInput.value.trim();
    const updatedPhone = phoneInput.value.trim();    
    if (updatedName === '' || updatedMail === '' || updatedPhone === '') {  // Überprüfen, ob alle Felder ausgefüllt sind
        alert('Bitte füllen Sie alle Felder aus.');
        return;
    }    
    const updatedContactIndex = contactsData.findIndex(contact => contact.id === contactId);  // Aktualisiere den Kontakt in der Datenquelle
    contactsData[updatedContactIndex] = {
        ...contactsData[updatedContactIndex],
        contactName: updatedName,
        contactMailAdress: updatedMail,
        contactPhone: updatedPhone,
    };    
    saveContactsData(contactsData[updatedContactIndex]);  // JSON-Array speichern (z.B. auf dem Server)    
    renderContacts();  // Zurück zur Kontaktliste wechseln
}

// function deleteContact(selectedContactID) {
    // Muss noch defeniert werden
//}

// function saveContact(selectedContactID) {
    // Muss noch defeniert werden
//}

function openContactScreen(contactId) {    
    const content = document.getElementById("content");
    content.style.height = "fit-content";    
    const selectedContact = contactsData.find(contact => contact.id === contactId);  // Findet den ausgewählten Kontakt anhand der ID
    content.innerHTML = /*html*/`
        <div class="openContactContainerHeader">
            <div class="addContactCloseXContainer" onclick="contactsInit()">
                <img src="../assets/img/contact/addContactCloseX.svg" alt="">
            </div>
            <div class="addContactBlockHeader">
                <p class="openContactH1">Contacts</p>
                <p class="openContactText">Better with a team!</p>                               
                <img class="addContactBlueStroked" src="../assets/img/contact/addContactBlueStroked.svg" alt="">
            </div>
            <div class="openContactContentContainer">
                <input class="addContactInputName" type="text" required placeholder="Name" value="${selectedContact.contactName}"> 
                <input class="addContactInputMailAddresss" type="text" required placeholder="E Mail" value="${selectedContact.contactMailAdress}">
                <input class="addContactInputPhone" type="text" required placeholder="Phone" value="${selectedContact.contactPhone}">
            </div>
        </div>
    `;
    showHeaderAndFooter();
   // containerHeightOFF();
}

function containerHeightOFF() {
    const container = document.querySelector(".container");
    container.style.height = "auto";
}
































