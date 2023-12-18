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

// Diese Funktion wird direkt im HTML-Code aufgerufen
function handleAddContactClick() {
    addContactScreen();
    console.log("Bild wurde angeklickt!");
    
}

async function fetchContactsData() {
    try {
        const response = await fetch("../assets/templates/contacs/allContacts.json");
        const data = await response.json();
        // Sortiere die Kontakte nach dem Namen
        return data.sort((a, b) => a.contactName.localeCompare(b.contactName));
    } catch (error) {
        console.error("Fehler beim Laden der Kontakte:", error);
        throw error;
    }
}

function renderContacts() {
    const content = document.getElementById("contactsContent");

    // Erstelle ein Objekt, um die Kontakte nach dem Anfangsbuchstaben zu gruppieren
    const contactsByFirstLetter = {};

    contactsData.forEach(oneContact => {
        const firstLetter = oneContact.contactName.charAt(0).toUpperCase();

        if (!contactsByFirstLetter[firstLetter]) {
            // Erstelle einen neuen Abschnitt für den Buchstaben, wenn er noch nicht existiert
            contactsByFirstLetter[firstLetter] = document.createElement("div");
            contactsByFirstLetter[firstLetter].classList.add("oneContactContainer");

            // Erstelle die Buchstaben-Spalte
            const letterContainer = document.createElement("div");
            letterContainer.classList.add("letter-column");

            // Erstelle den Buchstaben
            const letterHeader = document.createElement("h2");
            letterHeader.textContent = firstLetter;
            letterHeader.classList.add("contact-first-letter");
            letterContainer.appendChild(letterHeader);

            contactsByFirstLetter[firstLetter].appendChild(letterContainer);
        }

        // Erstelle das img-Element für das Kontaktbild
        const contactImgElement = document.createElement("img");
        contactImgElement.src = oneContact.contactImg;
        contactImgElement.classList.add("contactImg");

        // Erstelle einen Container für den Namen und die E-Mail-Adresse
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("contact-info-container");

        const nameElement = document.createElement("h2");
        nameElement.textContent = oneContact.contactName;

        const contactMailAddressElement = document.createElement("a");
        contactMailAddressElement.textContent = `${oneContact.contactMailAdress}`;

        // Füge die Elemente zum Info-Container hinzu
        infoContainer.appendChild(nameElement);
        infoContainer.appendChild(contactMailAddressElement);

        // Füge das Bild zur linken Spalte hinzu
        contactsByFirstLetter[firstLetter].appendChild(contactImgElement);

        // Füge den Info-Container zur rechten Spalte hinzu
        contactsByFirstLetter[firstLetter].appendChild(infoContainer);
    });

    // Füge die Abschnitte in den HTML-Code ein
    Object.values(contactsByFirstLetter).forEach(section => {
        content.appendChild(section);
    });
}

function addContactScreen() {
    const content = document.getElementById("contactsContent");
    content.innerHTML = `<div class="addContactContainerHeader">
                            <h1 class="addContactH1">Add contact</h1>
                            <p class="addContactText">Tasks are better with a team!</p>
                        </div>

                        <div>
                        <img src="../assets/img/addContactBlankUserImg.svg" alt="">
                        </div>

                        <form onsubmit="addContact()">
                            <div class="addContactContainerFooter">
                                <input class="addContactInputName" type="text" required placeholder="Name">
                                <input class="addContactInputMailAddresss" type="text" required placeholder="E Mail">
                                <input class="addContactInputPhone" type="text" required placeholder="Phone">
                                <img class="createContactButtonImg" src="../assets/img/createContactButton.svg" alt="">
                            <div>
                        </form>
                        `;  
}