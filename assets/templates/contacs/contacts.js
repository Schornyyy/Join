let contactsData = []; // Kontakt Daten global gespeichert nach dem fetchen
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
    <button class="addContactButtonDesktop" onclick="addContactShowOverlayDesktop()">Add new contact</button>`;
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
    data = currentUser ? [...data, ...currentUser.contacts] : data;
    console.log(data);
    data = data.map((contact, index) => ({ ...contact, id: index + 1 })); // Fügt eine eindeutige ID zu jedem Kontakt hinzu
    return data.sort((a, b) => a.name.localeCompare(b.name));
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
    const firstLetter = oneContact.name.charAt(0).toUpperCase();

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
                    <!-- <img src="${oneContact.contactImg != undefined ? oneContact.contactImg : 'assets/img/contact/addContactBlankUserImg.svg'}" class="contactImg"> -->
                    ${singleMemberToHTML(oneContact, 0)}
                </div>
                <div class="contact-info-container">
                    <h2 class="oneContactContainerH2Desktop">${oneContact.name}</h2>
                    <a class="oneContactContainerAElement">${oneContact.email}</a>
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
                              <div class="addContactCloseXContainer">
                                <button class="addContactCloseXButtonMobile" onclick="contactsInit()">X</button>
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

                        <form id="addContactFormMobileID" onsubmit="createContactMobile()">
                            <div class="addContactContainerFooter">
                                <input class="addContactInputNameMobile" type="text" required placeholder="Name">
                                <input class="addContactInputMailAddresssMobile" type="text" required placeholder="E Mail">
                                <input class="addContactInputPhoneMobile" type="text" required placeholder="Phone">
                                <img class="createContactButtonImg" src="../assets/img/contact/createContactButton.svg" alt="" onclick="createContactMobile()">
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

function createContactMobile() {
  const nameInput = document.querySelector(".addContactInputNameMobile");
  const mailInput = document.querySelector(".addContactInputMailAddresssMobile");
  const phoneInput = document.querySelector(".addContactInputPhoneMobile");
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
    name: newName,
    email: newMail,
    phone: newPhone,
    contactImg: defaultImage,
    from: currentUser.name,
    colorCode: getRandomColorHex()
  };
  contactsData.push(newContact);
  saveContactsData(contactsData);
  hideOverlay();
  contactsInit();  
}

function createContact() {
  console.log('createContact');
  const isMobile = window.innerWidth < 768 ? true : false;
  
  const nameInput = isMobile ? document.querySelector(".addContactInputNameMobile") : document.querySelector(".addContactInputNameDesktop");
  const mailInput = isMobile ? document.querySelector(".addContactInputMailAddresssMobile") : document.querySelector(".addContactInputMailAddresssDesktop");
  const phoneInput = isMobile ? document.querySelector(".addContactInputPhoneMobile") : document.querySelector(".addContactInputPhoneDesktop");
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
    name: newName,
    email: newMail,
    phone: newPhone,
    contactImg: defaultImage,
    colorCode: getRandomColorHex()
  };
  console.log('newContact' + newContact);
  contacts.push(new Contact(newName, newMail, newPhone, null, currentUser.name));
  contactsData.push(newContact);
  saveContactsData(contactsData);
  saveContacts();
  hideOverlay();
  contactsInit();  
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
                            <div class="addContactCloseXContainer">
                              <button class="addContactCloseXButtonMobile" onclick="contactsInit()">X</button>
                            </div>
                            <div class="addContactBlockHeader">
                                <p class="addContactH1">Edit contact</p>                                
                                <img class="addContactBlueStroked" src="../assets/img/contact/addContactBlueStroked.svg" alt="">
                            </div>
                        </div>
                        <div class="addContactBlankUserImg">
                          <img class="openContactUserImg" src="${selectedContact.contactImg}" alt="">
                        </div>
        <form id="editcontactFormMobileID" onsubmit="updateContactMobile(${selectedContact.id})">
            <div class="addContactContainerFooter">
                <input class="addContactInputNameMobile" type="text" required placeholder="Name" value="${selectedContact.name}"> 
                <input class="addContactInputMailAddresssMobile" type="text" required placeholder="E Mail" value="${selectedContact.email}">
                <input class="addContactInputPhoneMobile" type="text" required placeholder="Phone" value="${selectedContact.phone}">
                <div>
                    <img class="createContactButtonImg" src="../assets/img/contact/editContactDeleteButtonImg.svg" alt="" onclick="deleteContact(${selectedContact.id})">
                    <img class="createContactButtonImg" src="../assets/img/contact/editContactSaveButtonImg.svg" alt="" onclick="updateContactMobile(${selectedContact.id})">
                </div>                
            </div>
        </form>
    `;
  hideHeaderAndFooter();  
}

function updateContactMobile(contactId) {
  const nameInput = document.querySelector(".addContactInputNameMobile");
  const mailInput = document.querySelector(".addContactInputMailAddresssMobile");
  const phoneInput = document.querySelector(".addContactInputPhoneMobile");
  const updatedName = nameInput.value.trim();
  const updatedMail = mailInput.value.trim();
  const updatedPhone = phoneInput.value.trim();
  if (updatedName === "" || updatedMail === "" || updatedPhone === "") {
    alert("Bitte füllen Sie alle Felder aus.");
    return;
  }
  const existingContact = contactsData.find(
    (contact) =>
      contact.name === updatedName &&
      contact.email === updatedMail &&
      contact.id !== contactId
  );
  if (existingContact) {
    alert("Ein Kontakt mit diesen Informationen existiert bereits.");
    return;
  }
  const oldContact = contactsData.find(
    (contact) => contact.id === contactId
  );  
  const hasNameChanged = oldContact.name !== updatedName;  // Überprüfe, ob es Änderungen am Kontakt gab
  const hasMailChanged = oldContact.email !== updatedMail;
  const hasPhoneChanged = oldContact.phone !== updatedPhone;
  const updatedContactsData = contactsData.map((contact) =>  // Aktualisiere den Kontakt im Array
    contact.id === contactId
      ? {
          ...contact,
          name: hasNameChanged ? updatedName : contact.name,
          email: hasMailChanged ? updatedMail : contact.email,
          phone: hasPhoneChanged ? updatedPhone : contact.phone,
        }
      : contact
  );
  saveContactsData(updatedContactsData); // JSON-Array speichern
  contactsInit(); // Zurück zur Kontaktliste wechseln
}

function updateContactDesktop(contactId) {
  const nameInput = document.querySelector(".addContactInputNameDesktop");
  const mailInput = document.querySelector(".addContactInputMailAddresssDesktop");
  const phoneInput = document.querySelector(".addContactInputPhoneDesktop");
  const updatedName = nameInput.value.trim();
  const updatedMail = mailInput.value.trim();
  const updatedPhone = phoneInput.value.trim();
  if (updatedName === "" || updatedMail === "" || updatedPhone === "") {
    alert("Bitte füllen Sie alle Felder aus.");
    return;
  }
  const existingContact = contactsData.find(
    (contact) =>
      contact.name === updatedName &&
      contact.email === updatedMail &&
      contact.id !== contactId
  );
  if (existingContact) {
    alert("Ein Kontakt mit diesen Informationen existiert bereits.");
    return;
  }
  const oldContact = contactsData.find(
    (contact) => contact.id === contactId
  );  
  const hasNameChanged = oldContact.name !== updatedName;  // Überprüfe, ob es Änderungen am Kontakt gab
  const hasMailChanged = oldContact.email !== updatedMail;
  const hasPhoneChanged = oldContact.phone !== updatedPhone;
  const updatedContactsData = contactsData.map((contact) =>  // Aktualisiere den Kontakt im Array
    contact.id === contactId
      ? {
          ...contact,
          name: hasNameChanged ? updatedName : contact.name,
          email: hasMailChanged ? updatedMail : contact.email,
          phone: hasPhoneChanged ? updatedPhone : contact.phone,
        }
      : contact
  );
  saveContactsData(updatedContactsData); // JSON-Array speichern
  contactsInit(); // Zurück zur Kontaktliste wechseln
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
    console.log(`Kontakt "${deletedContact.name}" wurde erfolgreich gelöscht.`);
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
  }
  const content = document.getElementById("contactsContentRightSideContactDataContainerID");
  content.innerHTML = "";
  contactsInit();  
}

function deleteContactMobile(contactId) {
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
    console.log(`Kontakt "${deletedContact.name}" wurde erfolgreich gelöscht.`);
  } catch (error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
  }
  contactsInit();  
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
            <h2 class="openContactH2">${selectedContact.name}</h2>
        </div>
        <p class="openContactInformation">Contact Information</p>
        <p class="openContactEmail">Email</p>
        <a class="openContactEmailLink" href="mailto:${selectedContact.email}">${selectedContact.email}</a>
        <p class="openphoneText">Phone</p>
        <p class="openphoneNumber">${selectedContact.phone}</p>        
    </div>
    
    <div class="dropdown-container" id="contactOptionsDropdownContainer">  <!-- Dropdown-Menü für Kontaktoptionen -->
        <div class="dropdown-triggerContainer">
          <div class="dropdown-trigger" onclick="toggleDropdownMenu()">
              <img id="menuContactOptionsButton" src="../assets/img/contact/menuContactOptionsButtonImg.svg" alt="">
          </div>
        </div>
        <div class="dropdown-menu" id="contactOptionsDropdown">            
            <div class="dropdown-option" data-value="edit" onclick="editContactScreen(${selectedContact.id})">  <!-- Option zum Bearbeiten des Kontakts -->
                <img src="../assets/img/contact/editContactsDropDownIcon.svg" alt="Edit Contact">
            </div>            
            <div class="dropdown-option" data-value="delete" onclick="deleteContactMobile(${selectedContact.id})">  <!-- Option zum Löschen des Kontakts -->
                <img src="../assets/img/contact/DeleteContactDropwDownIcon.svg" alt="Delete Contact">
            </div>
        </div>
    </div>
  `;
  console.log(selectedContact.id);  
  showHeaderAndFooter();  // Zeigt Header und Footer an.  
  contactsContentBackgroundColorWhiteGray();  // Ändert die Hintergrundfarbe des Kontaktbereichs.
  addDropdownMenuClickListener();   
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
  content.innerHTML = "";  
  renderAddContactButtonDesktop();  // Add contact button desktop
  const contactsByFirstLetter = {};
  contactsData.forEach((oneContact) => {
    const firstLetter = oneContact.name.charAt(0).toUpperCase();
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
            <div class="oneContactContainer" id="contact-${oneContact.id}" onclick="openContactScreenDesktop(${oneContact.id})" data-contact-id="${oneContact.id}">
                <div>
                    <!-- <img src="${oneContact.contactImg}" class="contactImg"> -->
                    ${singleMemberToHTML(oneContact, 0)}
                </div>
                <div class="contact-info-container">
                    <h2 class="oneContactContainerH2Desktop">${oneContact.name}</h2>
                    <a class="oneContactContainerAElement">${oneContact.email}</a>
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
  const content = document.getElementById("contactsContentRightSideID");  // Holen Sie das Kontaktelement mit der ID "contactsContentRightSideID"  
  const selectedContact = contactsData.find(contact => contact.id === contactId);  // Holen Sie den ausgewählten Kontakt anhand der ID  
  if (lastClickedContactId) {  // Änderung der Hintergrundfarbe des zuletzt geklickten Kontakts (wenn vorhanden)    
    const lastClickedContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${lastClickedContactId}"]`);  // Holen Sie das zugehörige Kontaktelement anhand der Kontakt-ID    
    if (lastClickedContactContainer) {  // Überprüfen, ob das Element gefunden wurde, bevor Sie die Hintergrundfarbe ändern
      lastClickedContactContainer.style.backgroundColor = "transparent";      
      const lastClickedContactH2 = lastClickedContactContainer.querySelector("h2");  // Ändern Sie die Schriftfarbe des H2-Elements innerhalb des Containers
      if (lastClickedContactH2) {
        lastClickedContactH2.style.color = "black"; // Oder setzen Sie die gewünschte Farbe
      }
    }
  }  
  const currentContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${contactId}"]`);  // Änderung der Hintergrundfarbe des aktuellen Kontakts
  if (currentContactContainer) {
    currentContactContainer.style.backgroundColor = "#2A3647"; // Ersetzen Sie "#2A3647" durch die gewünschte Farbe    
    const currentContactH2 = currentContactContainer.querySelector("h2");  // Ändern Sie die Schriftfarbe des H2-Elements innerhalb des Containers
    if (currentContactH2) {
      currentContactH2.style.color = "white"; // Oder setzen Sie die gewünschte Farbe
    }
  }  
  lastClickedContactId = contactId;  // Aktualisieren des zuletzt geklickten Kontakts
  content.innerHTML = /*html*/ `
    <div class="contactsContentRightSideHeadLine">
        <h1 class="contactsContentRightSideH1">
          Contacts
        </h1>
        <img src="../../assets/img/contact/contactsContentRightSideBlueStripe.svg" alt="">        
        <p class="contactsContentRightSideHeadLinePElement">Better with a team</p>
    </div>

    <div id="contactsContentRightSideContactDataContainerID">
      <div class="contactsContentRightSideUserImgAndNameContainer">
        <img class="openContactUserImg" src="${selectedContact.contactImg}" alt="">
        <div>
          <h2 class="contactsContentRightSideUserNameH2">${selectedContact.name}</h2>
            <div class="contactsContentRightSideEditAndDeleteButtonContainer">
              <img class="contactsContentRightSideEditButton" src="../../assets/img/contact/editContactsButtonDesktop.svg" alt="" onclick="editContactDestop(lastClickedContactId)">
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
        <a class="openContactEmailLinkDesktop" href="mailto:${selectedContact.email}">${selectedContact.email}</a>
      </div>
      <div class="contactsContentRightSidephoneH2Desktop">
        <h2 class="contactsContentRightSidephoneH2">Phone</h2>
      </div>
      <div class="openphoneNumberDesktopContainer">
        <p class="openphoneNumberDesktopPElement">${selectedContact.phone}</p>
      </div>
    </div>
  `;  
  showHeaderAndFooter();
  showcontactsContentRightSideDesktop();  
  const contactContainer = document.getElementById("contactsContentRightSideContactDataContainerID");  // Select the container to slide in  
  contactContainer.style.animation = "slide-in 0.5s ease-out";  // Apply the animation to the selected container
}

function showcontactsContentRightSideDesktop() {
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "flex";
}

function hidecontactsContentRightSideDesktop() {
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "none";
}

function addContactShowOverlayDesktop() {
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-container");
  document.body.appendChild(overlayContainer);
  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay-content");
  overlayContainer.appendChild(overlayContent);
  // Füge das Overlay-Inhaltselement hinzu
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
          <div class="addContactCloseXContainer">
            <button class="addContactCloseXButton" onclick="hideOverlay()">X</button>
          </div>
          <form id="addContactShowOverlayDesktopID" onsubmit="createContact()">
            <div class="addContactContainerFooter">
              <input class="addContactInputNameDesktop" type="text" required placeholder="Name">
              <input class="addContactInputMailAddresssDesktop" type="text" required placeholder="E Mail">
              <input class="addContactInputPhoneDesktop" type="text" required placeholder="Phone">
              <div class="addContactButtonContainerDesktop">                
                <button class="editContactDesktopDeleteButton" onclick="hideOverlay()">Cancel</button>
                <button class="createContactButton" onclick="createContact()">Create contact</button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  `; 
  
  overlayContainer.style.animation = "slide-in 0.5s ease-out";
}

function hideOverlay() {
  const overlayContainer = document.querySelector(".overlay-container");
  if (overlayContainer) {
    overlayContainer.parentNode.removeChild(overlayContainer);
  }
}

function editContactDestop(contactId) {  
  const selectedContact = contactsData.find(
    (contact) => contact.id === contactId
  ); // Findet den ausgewählten Kontakt anhand der ID
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-container");
  document.body.appendChild(overlayContainer);
  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay-content");
  overlayContainer.appendChild(overlayContent);  
  overlayContent.innerHTML = /*html*/ `
    <div class="overlay-card">
      <div class="addContactDesktopLeftSideContainer">
        <div class="flexDirectionColumn">
          <img class="joinLogoGreyBackgroundImg" src="../../assets/img/contact/joinLogoGreyBackground.png" alt="">
          <h1 class="addContactDesktopLeftSideContainerH1">Edit contact</h1>          
          <img class="addContactBlueStroked" src="../../assets/img/contact/addContactBlueStroked.svg" alt="">
        </div>
      </div>
      <div class="addContactDesktopRightSideContainer">
        <div class="addContactBlankUserImgContainer">
          <img class="openContactUserImg" src="${selectedContact.contactImg}" alt="">          
        </div>
        <div class="addContactDesktopRightSideContent">
          <div class="addContactCloseXContainer">
            <button class="addContactCloseXButton" onclick="hideOverlay()">X</button>
          </div>
          <form id="editContactDestopID" onsubmit=" updateContactDesktop(${selectedContact.id})">
            <div class="addContactContainerFooter">
                <input class="addContactInputNameDesktop" type="text" required placeholder="Name" value="${selectedContact.name}"> 
                <input class="addContactInputMailAddresssDesktop" type="text" required placeholder="E Mail" value="${selectedContact.email}">
                <input class="addContactInputPhoneDesktop" type="text" required placeholder="Phone" value="${selectedContact.phone}">
                <div class="createContactButtonImgContainer">
                    <button class="editContactDesktopDeleteButton" onclick="deleteContact(${selectedContact.id})">Delete</button>
                    <button class="saveContactButtonDesktop" onclick=" updateContactDesktop(${selectedContact.id})">Save</button>
                </div>                
            </div>
        </form>
        </div>
      </div>
    </div>
  `;
  overlayContainer.style.animation = "slide-in 0.5s ease-out";  
}

async function deleteContactDataById() {  // Funktion deleteContactDataById ist für einen LokalStorage clear da falls ein Kontakt doppelt gespeichert wurde
  try {
    localStorage.clear();  // Lösche alle Daten im localStorage
    contactsData = await fetchContactsData();  // Lade die Daten vom Server
    localStorage.setItem('contactsData', JSON.stringify(contactsData));  // Speichere die neu geladenen Daten im localStorage
    console.log("Kontakt-Daten wurden erfolgreich gelöscht und neu geladen.");
  } catch (error) {
    console.error("Fehler beim Löschen und Neu Laden der Kontakt-Daten:", error);
  }
}



