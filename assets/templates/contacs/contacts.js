let contactsData; // Kontakt Daten global gespeichert nach dem fetchen
let nextContactId; // ID-Zähler für die nächste Kontakt-ID

async function contactsInit() {
  try {
    // Versuche, die Kontaktdaten aus dem lokalen Speicher zu lesen
    const storedContactsData = localStorage.getItem('contactsData');
    
    // Wenn Daten im lokalen Speicher vorhanden sind, verwende sie
    if (storedContactsData) {
      contactsData = JSON.parse(storedContactsData);
    } else {
      // Andernfalls lade die Daten vom Server
      contactsData = await fetchContactsData();
      localStorage.setItem('contactsData', JSON.stringify(contactsData));
    }

    // Initialisiere den ID-Zähler basierend auf der vorhandenen Anzahl von Kontakten
    nextContactId = contactsData.length;

    contactsContentBackgroundColorWhite();
    renderContacts();
    renderAddContactButton();
    showHeaderAndFooter();
  } catch (error) {
    console.error("Fehler beim Initialisieren der Kontakte:", error);
  }
}

function renderAddContactButton() {
  const content = document.getElementById("contactsContent");
  const addContactButtonContainer = document.createElement("div");
  addContactButtonContainer.classList.add("addContactButtonContainer");
  addContactButtonContainer.innerHTML =
    '<img src="../assets/img/contact/addContactButtonMobile.svg" class="addContactImage" onclick="handleAddContactClick()">'; // onclick-Funktion direkt im HTML-Code
  content.appendChild(addContactButtonContainer);
}

function handleAddContactClick() {
  addContactScreen(); // Diese Funktion wird direkt im HTML-Code aufgerufen
}

async function fetchContactsData() {
  try {
    const response = await fetch("../assets/templates/contacs/allContacts.json");
    let data = await response.json();
    data = data.map((contact, index) => ({ ...contact, id: index + 1 })); // Füget eine eindeutige ID zu jedem Kontakt hinzu
    return data.sort((a, b) => a.contactName.localeCompare(b.contactName));
  } catch (error) {
    console.error("Fehler beim Laden der Kontakte:", error);
    throw error;
  }
}

function renderContacts() {
  const content = document.getElementById("contactsContent");
  content.innerHTML = "";
  const contactsByFirstLetter = {};

  contactsData.forEach((oneContact) => {
    const firstLetter = oneContact.contactName.charAt(0).toUpperCase();

    if (!contactsByFirstLetter[firstLetter]) {
      contactsByFirstLetter[firstLetter] = /*html*/ `
                <div class="letterAndContactsContainer">
                    <div class="letter-column">
                        <h2 class="contact-first-letter">${firstLetter}</h2>
                    </div>
                </div>
            `;
    }

    const oneContactContainer = /*html*/ `
            <div class="justifyContentCenter" onclick="openContactScreen(${oneContact.id})">
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

  Object.values(contactsByFirstLetter).forEach((section) => {
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
  const mobileHeader = document.querySelector(".mobileHeader"); // Verstecke mobileHeader und menuTemplate
  const menuTemplate = document.querySelector(".menuTemplate");
  mobileHeader.style.display = "none";
  menuTemplate.style.display = "none";
}

function showHeaderAndFooter() {
  const mobileHeader = document.getElementById("headerTemplate"); // Verstecke mobileHeader und menuTemplate
  const menuTemplate = document.getElementById("menuTemplate");
  mobileHeader.style.display = "block";
  menuTemplate.style.display = "block";
}

function createContact() {
  const nameInput = document.querySelector(".addContactInputName");
  const mailInput = document.querySelector(".addContactInputMailAddresss");
  const phoneInput = document.querySelector(".addContactInputPhone");
  const newName = nameInput.value.trim();
  const newMail = mailInput.value.trim();
  const newPhone = phoneInput.value.trim();
  if (newName === "" || newMail === "" || newPhone === "") {
    alert("Bitte füllen Sie alle Felder aus.");
    return;
  }
  const defaultImage = "../assets/img/contact/defaultContactImage.svg";
  let nextContactId = contactsData.length + 1; // Hier wird die nächste ID festgelegt
  const newContact = {
    id: nextContactId,
    contactName: newName,
    contactMailAdress: newMail,
    contactPhone: newPhone,
    contactImg: defaultImage,
  };
  contactsData.push(newContact);
  saveContactsData(contactsData);
  renderContacts();
}

function saveContactsData(data) {
  try {    
    localStorage.setItem('contactsData', JSON.stringify(data));  // Lokal speichern
    // Auf dem Server speichern (falls notwendig)
    // Hier könntest du den ursprünglichen Fetch-Code einfügen, wenn die Daten auf dem Server gespeichert werden sollen.
    console.log("Kontakte erfolgreich gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern der Kontakte:", error);
  }
}

function editContactScreen(contactId) {
  const content = document.getElementById("contactsContent");
  const selectedContact = contactsData.find(
    (contact) => contact.id === contactId
  ); // Findet den ausgewählten Kontakt anhand der ID
  content.innerHTML = /*html*/ `
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
  const nameInput = document.querySelector(".addContactInputName");
  const mailInput = document.querySelector(".addContactInputMailAddresss");
  const phoneInput = document.querySelector(".addContactInputPhone");
  const updatedName = nameInput.value.trim(); // Daten aus den Input-Feldern lesen
  const updatedMail = mailInput.value.trim();
  const updatedPhone = phoneInput.value.trim();
  if (updatedName === "" || updatedMail === "" || updatedPhone === "") {
    // Überprüfen, ob alle Felder ausgefüllt sind
    alert("Bitte füllen Sie alle Felder aus.");
    return;
  }
  const updatedContactIndex = contactsData.findIndex(
    (contact) => contact.id === contactId
  ); // Aktualisiere den Kontakt in der Datenquelle
  contactsData[updatedContactIndex] = {
    ...contactsData[updatedContactIndex],
    contactName: updatedName,
    contactMailAdress: updatedMail,
    contactPhone: updatedPhone,
  };
  saveContactsData(contactsData[updatedContactIndex]); // JSON-Array speichern (z.B. auf dem Server)
  renderContacts(); // Zurück zur Kontaktliste wechseln
}

function deleteContact(contactId) {
  if (!contactId) {
    console.error("Invalid contact ID");
    return;
  }
  const confirmDelete = confirm("Möchten Sie diesen Kontakt wirklich löschen?");
  if (!confirmDelete) {
    return;
  }
  try {
    const contactIndex = contactsData.findIndex((contact) => contact.id === contactId);

    if (contactIndex === -1) {
      console.error("Selected contact not found in contactsData.");
      return;
    }
    const deletedContact = contactsData.splice(contactIndex, 1)[0];
    saveContactsData(contactsData);
    console.log(`Kontakt "${deletedContact.contactName}" wurde erfolgreich gelöscht.`);
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
  }
  renderContacts();
}

 function saveContact(selectedContactID) {
// Muss noch defeniert werden
}

function openContactScreen(contactId) {
  const content = document.getElementById("contactsContent");

  // Findet den ausgewählten Kontakt anhand der ID im Kontakt-Datenarray.
  const selectedContact = contactsData.find(contact => contact.id === contactId);

  // Überprüft, ob der ausgewählte Kontakt gefunden wurde.
  if (!selectedContact) {
    console.error("Selected contact not found in contactsData.");
    return;
  }

  // Aktualisiert den globalen Wert für den ausgewählten Kontakt.
  selectetContactID = selectedContact;

  // Rendert die Detailansicht des ausgewählten Kontakts.
  content.innerHTML = /*html*/ `
    <div class="openContactContainerHeader">                            
        <div class="openContactBlockHeader">
            <div>
                <p class="openContactH1">Contacts</p>
                <p class="openContactText">Better with a team!</p>                              
                <img class="addContactBlueStroked" src="../assets/img/contact/addContactBlueStroked.svg" alt="">                                                                        
            </div>

            <div class="arrorLeftContainer">
                <div onclick="contactsInit()">
                    <img src="../assets/img/contact/arrow-left-line.svg" alt="">
                </div>
            </div>                                                                
        </div>                    
    </div>

    <div class="openContactContainerFooter">
        <div class="openContactUserImageAndNameContainer">   
            <img class="openContactUserImg" src="${selectedContact.contactImg}" alt="">
            <h2 class="openContactH2">${selectedContact.contactName}</h2>
        </div>
        <p class="openContactInformation">Contact Information</p>
        <p class="openContactEmail">Email</p>
        <a class="openContactEmailLink" href="mailto:${selectedContact.contactMailAdress}">${selectedContact.contactMailAdress}</a>
        <p class="openContactPhoneText">Phone</p>
        <p class="openContactPhoneNumber">${selectedContact.contactPhone}</p>        
    </div>

    <!-- Dropdown-Menü für Kontaktoptionen -->
    <div class="dropdown-container" id="contactOptionsDropdownContainer">
        <div class="dropdown-trigger" onclick="toggleDropdownMenu()">
            <img id="menuContactOptionsButton" src="../assets/img/contact/menuContactOptionsButtonImg.svg" alt="">
        </div>
        <div class="dropdown-menu" id="contactOptionsDropdown">
            <!-- Option zum Bearbeiten des Kontakts -->
            <div class="dropdown-option" data-value="edit" onclick="editContactScreen(${selectedContact.id})">
                <img src="../assets/img/contact/editContactsDropDownIcon.svg" alt="Edit Contact">
            </div>
            <!-- Option zum Löschen des Kontakts -->
            <div class="dropdown-option" data-value="delete" onclick="deleteContact(${selectedContact.id})">
                <img src="../assets/img/contact/DeleteContactDropwDownIcon.svg" alt="Delete Contact">
            </div>
        </div>
    </div>
  `;
  console.log(selectedContact.id);
  // Zeigt Header und Footer an.
  showHeaderAndFooter();

  // Ändert die Hintergrundfarbe des Kontaktbereichs.
  contactsContentBackgroundColorWhiteGray();
}

function contactsContentBackgroundColorWhiteGray() {
  const content = document.getElementById("contactsContent");
  content.style.backgroundColor = "var(--white-grey)";
}

function contactsContentBackgroundColorWhite() {
  const content = document.getElementById("contactsContent");
  content.style.backgroundColor = "white";
}

function toggleDropdownMenu() {
  const dropdownMenu = document.getElementById("contactOptionsDropdown");
  dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
}

function handleDropdownOptionClick(action) {  // Hier die Logik für die ausgewählte Aktion (Edit oder Delete) implementieren  
  if (action === "edit") {  // Edit Contact    
    console.log("Edit Contact selected");  
  } else if (action === "delete") {  // Delete    
    console.log("Delete Contact selected");
  }  
  const dropdownMenu = document.getElementById("contactOptionsDropdown");  // Schließt das Dropdown-Menü nach der Auswahl
  dropdownMenu.style.display = "none";
}

