let contactsData; // Kontakt Daten global gespeichert nach dem fetchen
let nextContactId; // ID-Zähler für die nächste Kontakt-ID
let lastClickedContactId;

async function contactsInit() {
  try {    
    const storedContactsData = localStorage.getItem('contactsData');  // Versuche, die Kontaktdaten aus dem lokalen Speicher zu lesen
    if (storedContactsData) {     
      contactsData = JSON.parse(storedContactsData);  // Wenn Daten im lokalen Speicher vorhanden sind, verwende sie
    } else {      
      contactsData = await fetchContactsData();  // Andernfalls lade die Daten vom Server
      localStorage.setItem('contactsData', JSON.stringify(contactsData));
    }    
    nextContactId = contactsData.length;  // Initialisiere den ID-Zähler basierend auf der vorhandenen Anzahl von Kontakten    
    const isMobile = window.innerWidth < 768;  // Entscheide, ob die mobile oder Desktop-Ansicht geladen werden soll // Adjust the breakpoint as needed    
    if (isMobile) {  // Ruft die Funktion basierend auf die Bildschirmbreite auf      
      renderContacts();  // Mobile Ansicht
      hidecontactsContentRightSideDesktop();
    } else {      
      renderContactsDesktop();  // Desktop Ansicht
      showcontactsContentRightSideDesktop();
    }    
    contactsContentBackgroundColorWhite();
    showHeaderAndFooter();
    renderAddContactButton();
    addDropdownMenuClickListener();
  } catch (error) {
    console.error("Fehler beim Initialisieren der Kontakte:", error);
  }
}

function renderAddContactButton() {
  const content = document.getElementById("contactsContent");
  const addContactButtonContainer = document.createElement("div");
  addContactButtonContainer.classList.add("addContactButtonContainerMobile");  // Für die mobile Ansicht
  addContactButtonContainer.innerHTML =
    '<img src="../assets/img/contact/addContactButtonMobile.svg" class="addContactImage" onclick="handleAddContactClick()">'; // onclick-Funktion direkt im HTML-Code
  content.appendChild(addContactButtonContainer);  
}

function renderAddContactButtonDesktop() {
  const contentDesktop = document.getElementById("contactsContent");
  const addContactButtonContainerDesktop = document.createElement("div");
  addContactButtonContainerDesktop.classList.add("addContactButtonContainerDesktop");  // Für die desktop Ansicht
  addContactButtonContainerDesktop.innerHTML = /*html*/`
    <button class="addContactButtonDesktop" onclick="showOverlay()">Add new contact</button>`;
  contentDesktop.appendChild(addContactButtonContainerDesktop);  
  addContactButtonContainerDesktop.addEventListener("click", function () {  // Füge einen Event-Listener hinzu, um das Overlay zu zeigen    
  });
}

function handleAddContactClick() {
  addContactScreen(); // Diese Funktion wird direkt im HTML-Code aufgerufen
}

async function fetchContactsData() {
  try {
    const response = await fetch("../assets/templates/contacs/allContacts.json");
    let data = await response.json();
    data = data.map((contact, index) => ({ ...contact, id: index + 1 })); // Fügt eine eindeutige ID zu jedem Kontakt hinzu
    return data.sort((a, b) => a.contactName.localeCompare(b.contactName));
  } catch (error) {
    console.error("Fehler beim Laden der Kontakte:", error);
    throw error;
  }
}

function renderContacts() {  
  const content = document.getElementById("contactsContent");
  content.innerHTML = "";
  renderAddContactButtonDesktop();  // Add contact button desktop
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
            <div class="oneContactContainer" onclick="openContactScreen(${oneContact.id})">
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
  const mobileHeader = document.querySelector(".mobileHeader"); // Zeige mobileHeader und menuTemplate
  const menuTemplate = document.querySelector(".menuTemplate");
  mobileHeader.style.display = "flex";
  menuTemplate.style.display = "flex";
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

function saveContactsData(data) {  // Hier werden die Kontakte Lokal gespeichert!
  try {    
    localStorage.setItem('contactsData', JSON.stringify(data));  // Lokal speichern
    // Auf dem Server speichern (falls notwendig)
    // Hier könntest du den ursprünglichen Fetch-Code einfügen, wenn die Daten auf dem Server gespeichert werden sollen.
    console.log("Kontakt erfolgreich gespeichert.");
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
                    <img class="createContactButtonImg" src="../assets/img/contact/editContactSaveButtonImg.svg" alt="" onclick="updateContact(${selectedContact.id})">
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
    alert("Bitte füllen Sie alle Felder aus.");  // Überprüfen, ob alle Felder ausgefüllt sind
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

function openContactScreen(contactId) {
  const content = document.getElementById("contactsContent");  
  const selectedContact = contactsData.find(contact => contact.id === contactId);  // Findet den ausgewählten Kontakt anhand der ID im Kontakt-Datenarray.  
  if (!selectedContact) {  // Überprüft, ob der ausgewählte Kontakt gefunden wurde.
    console.error("Selected contact not found in contactsData.");
    return;
  }  
  content.innerHTML = /*html*/ `  <!-- Rendert die Detailansicht des ausgewählten Kontakts. -->
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
    
    <div class="dropdown-container" id="contactOptionsDropdownContainer">  <!-- Dropdown-Menü für Kontaktoptionen -->
        <div class="dropdown-trigger" onclick="toggleDropdownMenu()">
            <img id="menuContactOptionsButton" src="../assets/img/contact/menuContactOptionsButtonImg.svg" alt="">
        </div>
        <div class="dropdown-menu" id="contactOptionsDropdown">            
            <div class="dropdown-option" data-value="edit" onclick="editContactScreen(${selectedContact.id})">  <!-- Option zum Bearbeiten des Kontakts -->
                <img src="../assets/img/contact/editContactsDropDownIcon.svg" alt="Edit Contact">
            </div>            
            <div class="dropdown-option" data-value="delete" onclick="deleteContact(${selectedContact.id})">  <!-- Option zum Löschen des Kontakts -->
                <img src="../assets/img/contact/DeleteContactDropwDownIcon.svg" alt="Delete Contact">
            </div>
        </div>
    </div>
  `;
  console.log(selectedContact.id);  
  showHeaderAndFooter();  // Zeigt Header und Footer an.  
  contactsContentBackgroundColorWhiteGray();  // Ändert die Hintergrundfarbe des Kontaktbereichs.   
}

function addDropdownMenuClickListener() {
  const dropdownTrigger = document.getElementById("menuContactOptionsButton");
  const dropdownMenu = document.getElementById("contactOptionsDropdown");
  if (!dropdownTrigger || !dropdownMenu) {
    console.error("Dropdown trigger or menu not found");
    return;
  }
  const handleDocumentClick = function (event) {
    if (!dropdownTrigger.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
      document.removeEventListener("click", handleDocumentClick);
    }
  };
  dropdownTrigger.addEventListener("click", function (event) {
    const isDropdownVisible = (dropdownMenu.style.display === "block");    
    if (!isDropdownVisible) {  // Schließe alle anderen geöffneten Dropdowns, wenn das aktuelle geöffnet wird
      closeAllDropdowns();
    }
    dropdownMenu.style.display = isDropdownVisible ? "none" : "block";
    if (!isDropdownVisible) {
      document.addEventListener("click", handleDocumentClick);
    }
    event.stopPropagation();
  });
}

function closeAllDropdowns() {
  const allDropdowns = document.querySelectorAll(".dropdown-menu");
  allDropdowns.forEach((dropdown) => {
    dropdown.style.display = "none";
  });
  document.removeEventListener("click", handleDocumentClick);
}

function handleDocumentClick(dropdownContainer, addContactButtonContainerMobile, handleDocumentClick) {
  return function (event) {
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    if (!dropdownContainer.contains(event.target) &&
      !addContactButtonContainerMobile.contains(event.target) &&
      !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
      document.removeEventListener("click", handleDocumentClick);
    }
  };
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


// --------------------------------------------------------------------------------------------------------------------------------
// JavaScript Logik für die Desktop Ansicht

function renderContactsDesktop() {
  const content = document.getElementById("contactsContent");  
  renderAddContactButtonDesktop();  // Add contact button desktop
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
            <div class="oneContactContainer" onclick="openContactScreenDesktop(${oneContact.id})">
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

function openContactScreenDesktop(contactId) {  
  if (lastClickedContactId === contactId) {  // Wenn der aktuelle Kontakt bereits geöffnet ist, tue nichts
    return;
  }
  const content = document.getElementById("contactsContentRightSideID");
  const selectedContact = contactsData.find(contact => contact.id === contactId);
  if (!selectedContact) {
    console.error("Selected contact not found in contactsData.");
    return;
  }
  content.innerHTML = /*html*/ `
    <div class="contactsContentRightSideHeadLine">
        <h1 class="contactsContentRightSideH1">
          Contacts
        </h1>
        <img src="../../assets/img/contact/contactsContentRightSideBlueStripe.svg" alt="">        
        <p class="contactsContentRightSideHeadLinePElement">Better with a team</p>
    </div>

    <div class="contactsContentRightSideUserImgAndNameContainer">
      <img class="openContactUserImg" src="${selectedContact.contactImg}" alt="">
      <div>
        <h2 class="contactsContentRightSideUserNameH2">${selectedContact.contactName}</h2>
          <div class="contactsContentRightSideEditAndDeleteButtonContainer">
            <img class="contactsContentRightSideEditButton" src="../../assets/img/contact/editContactsButtonDesktop.svg" alt="">
            <img class="contactsContentRightSideDeleteButton" src="../../assets/img/contact/DeleteContactButtonDesktop.svg" alt="" onclick="deleteContact(lastClickedContactId)">
          </div>
      </div> 
    </div>

    <div class="contactsContentRightSideContactInformationDesktop">
      <p class="contactsContentRightSideContactInformationDesktopPText">Contact Information</p>
    </div>

    <div class="contactsContentRightSideContactEmailH2Desktop">
      <h2 class="contactsContentRightSideContactEmailH2">Email</h2>
    </div>

    <div class="openContactEmailLinkDesktopContainer">
      <a class="openContactEmailLinkDesktop" href="mailto:${selectedContact.contactMailAdress}">${selectedContact.contactMailAdress}</a>
    </div>

    <div class="contactsContentRightSideContactPhoneH2Desktop">
      <h2 class="contactsContentRightSideContactPhoneH2">Phone</h2>
    </div>

    <div class="openContactPhoneNumberDesktopContainer">
      <p class="openContactPhoneNumberDesktopPElement">${selectedContact.contactPhone}</p>
    </div>
  `;  
  lastClickedContactId = contactId;  // Speichere den zuletzt angeklickten Kontakt
  showHeaderAndFooter();
  showcontactsContentRightSideDesktop();
}

function showcontactsContentRightSideDesktop() {
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "flex";
}

function hidecontactsContentRightSideDesktop() {
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "none";
}

function showOverlay() {  
  const overlayContainer = document.createElement("div");  // Erstelle das Overlay-Container-Element
  overlayContainer.classList.add("overlay-container");
  document.body.appendChild(overlayContainer);  
  const overlayContent = document.createElement("div");  // Erstelle das Overlay-Inhaltselement
  overlayContent.classList.add("overlay-content");
  overlayContainer.appendChild(overlayContent);
  // Füge das Overlay-Inhaltselement hinzu (in dieser Beispielkarte können Sie Ihren eigenen HTML-Code für das Formular einfügen)
  overlayContent.innerHTML = /*html*/ `
    <div class="overlay-card">
      <div class="addContactDesktopLeftSideContainer">
        <div class="flexDirectionColumn">
          <img class="joinLogoGreyBackgroundImg" src="../../assets/img/contact/joinLogoGreyBackground.png" alt="">
          <h1 class="addContactDesktopLeftSideContainerH1">Add contact</h1>
          <p class="addContactDesktopLeftSideContainerPElement">Tasks are better with a team!</p>
          <img class="addContactBlueStroked" src="../../assets/img/contact/addContactBlueStroked.svg" alt="">
        </div>
      </div>

      <div class="addContactDesktopRightSideContainer">
        <div class="addContactBlankUserImgContainer">
          <img class="addContactBlankUserImg" src="../../assets/img/contact/addContactBlankUserImg.svg" alt="">
        </div>

        <div class="addContactDesktopRightSideContent">
          <div class="addContactCloseXContainer" onclick="hideOverlay()">
            <img src="../../assets/img/contact/addContactCloseXDesktop.svg" alt="">
          </div>

          <form onsubmit="createContact()">
            <div class="addContactContainerFooter">
              <input class="addContactInputName" type="text" required placeholder="Name">
              <input class="addContactInputMailAddresss" type="text" required placeholder="E Mail">
              <input class="addContactInputPhone" type="text" required placeholder="Phone">
              <div class="addContactButtonContainerDesktop">
                <img class="addContactCancelButtonDesktop" src="../assets/img/contact/addContactCancelButtonDesktop.svg" alt="" onclick="hideOverlay()">
                <img class="createContactButtonImg" src="../assets/img/contact/createContactButton.svg" alt="" onclick="createContact()">
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  `;  
  overlayContainer.addEventListener("click", function () {  // Füge einen Event-Listener hinzu, um das Overlay zu schließen
    hideOverlay();
  });  
  overlayContainer.style.animation = "slide-in 0.5s ease-out";  // Animiere das Overlay von rechts in die Mitte des Bildschirms
}

function hideOverlay() {
  const overlayContainer = document.querySelector(".overlay-container");
  if (overlayContainer) {
    overlayContainer.parentNode.removeChild(overlayContainer);
  }
}