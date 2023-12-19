document.addEventListener("DOMContentLoaded", function () {
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
    const contactsByFirstLetter = {};  // Erstellt ein Objekt, um die Kontakte nach dem Anfangsbuchstaben zu gruppieren

    contactsData.forEach(oneContact => {
        const firstLetter = oneContact.contactName.charAt(0).toUpperCase();
        if (!contactsByFirstLetter[firstLetter]) {            
            contactsByFirstLetter[firstLetter] = document.createElement("div");  // Erstelle einen neuen Abschnitt für den Buchstaben, wenn er noch nicht existiert
            contactsByFirstLetter[firstLetter].classList.add("letterAndContactsContainer");            
            const letterContainer = document.createElement("div");  // Erstelle die Buchstaben-Spalte
            letterContainer.classList.add("letter-column");           
            const letterHeader = document.createElement("h2");   // Erstelle den Buchstaben
            letterHeader.textContent = firstLetter;
            letterHeader.classList.add("contact-first-letter");
            letterContainer.appendChild(letterHeader);
            contactsByFirstLetter[firstLetter].appendChild(letterContainer);
        }
        const oneContactContainer = document.createElement("div");  // Erstellt einen Container für einen Kontakt mit dem Namen und der E-Mail-Adresse
        const userImgContainer = document.createElement("div");  // Erstellt einen Container für einen Kontakt mit dem Bild
        const contactImgElement = document.createElement("img");  // Erstellt das img-Element für das Kontaktbild        
        contactImgElement.src = oneContact.contactImg;
        contactImgElement.classList.add("contactImg");        
        const infoContainer = document.createElement("div");  // Erstellt einen Container für den Namen und die E-Mail-Adresse
        infoContainer.classList.add("contact-info-container");
        const nameElement = document.createElement("h2");
        nameElement.textContent = oneContact.contactName;
        const contactMailAddressElement = document.createElement("a");
        contactMailAddressElement.textContent = `${oneContact.contactMailAdress}`;
        userImgContainer.appendChild(contactImgElement);  // Fügt das contactImgElement dem infoContainer hinzu
        oneContactContainer.appendChild(userImgContainer);        
        infoContainer.appendChild(nameElement);  // Füge die Elemente zum Info-Container hinzu
        infoContainer.appendChild(contactMailAddressElement);  
        oneContactContainer.appendChild(infoContainer);        
        contactsByFirstLetter[firstLetter].appendChild(contactImgElement);   // Fügt das Bild zur linken Spalte hinzu        
        contactsByFirstLetter[firstLetter].appendChild(infoContainer);  // Fügt den Info-Container zur rechten Spalte hinzu
    });    
    Object.values(contactsByFirstLetter).forEach(section => {  // Füge die Abschnitte in den HTML-Code ein // Diese Zeile Verursacht einen Fehler bisher !
        content.appendChild(section);
    });
}

function addContactScreen() {
    const content = document.getElementById("contactsContent");
    content.innerHTML = /*html*/`<div class="addContactContainerHeader"'
                            <h1 class="addContactH1">Add contact</h1>
                            <p class="addContactText">Tasks are better with a team!</p>
                        </div>

                        <div>
                        <img src="../assets/img/addContactBlankUserImg.svg" alt="">
                        </div>

                        <form onsubmit="createContact()">
                            <div class="addContactContainerFooter">
                                <input class="addContactInputName" type="text" required placeholder="Name"> 
                                <input class="addContactInputMailAddresss" type="text" required placeholder="E Mail">
                                <input class="addContactInputPhone" type="text" required placeholder="Phone">
                                <img class="createContactButtonImg" src="../assets/img/createContactButton.svg" alt="" onclick="createContact()">
                            <div>
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