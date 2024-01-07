let contactsData = []; // Kontakt Daten global gespeichert nach dem fetchen
let nextContactId; // ID-Zähler für die nächste Kontakt-ID
let lastClickedContactId;

async function contactsInit() {  
  try {    
    await initializeContactsData();
    initializeContactId();
    initializeView();
    showHeaderAndFooter();
    renderAddContactButton();    
  } catch (error) {
    console.error("Fehler beim Initialisieren der Kontakte:", error);
  }
}

async function initializeContactsData() {
  const storedContactsData = localStorage.getItem('contactsData');
  if (storedContactsData) {     
    contactsData = JSON.parse(storedContactsData);
  } else {      
    contactsData = await fetchContactsData();
    localStorage.setItem('contactsData', JSON.stringify(contactsData));
  }
}

function initializeContactId() {
  nextContactId = contactsData.length;
}

function initializeView() {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {      
    renderContacts();  
    hidecontactsContentRightSideDesktop();
  } else {      
    renderContactsDesktop();  
    showcontactsContentRightSideDesktop();
  }
  contactsContentBackgroundColorWhite();
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

function contactsContentBackgroundColorWhiteGray() {
  const content = document.getElementById("contactsContent");
  content.style.backgroundColor = "var(--white-grey)";
}

function contactsContentBackgroundColorWhite() {
  const content = document.getElementById("contactsContent");
  content.style.backgroundColor = "white";
}

function hideHeaderAndFooter() {
  const mobileHeader = document.querySelector(".mobileHeader"); // Verstecke mobileHeader und menuTemplate
  const menuTemplate = document.querySelector(".menuTemplate");
  mobileHeader.style.display = "none";
  menuTemplate.style.display = "none";
}

function showHeaderAndFooter() {
  const mobileHeader = document.querySelector(".mobileHeader"); // Zeigt mobileHeader und menuTemplate
  const menuTemplate = document.querySelector(".menuTemplate");
  mobileHeader.style.display = "flex";
  menuTemplate.style.display = "flex";
}

function renderAddContactButton() {
  const content = document.getElementById("contactsContent");
  const addContactButtonContainer = document.createElement("div");
  addContactButtonContainer.classList.add("addContactButtonContainerMobile");  // Für die mobile Ansicht
  addContactButtonContainer.innerHTML =/*html*/ `
    <img src="../assets/img/contact/addContactButtonMobile.svg" class="addContactImage" onclick="handleAddContactClick()">`; // onclick-Funktion direkt im HTML-Code
  content.appendChild(addContactButtonContainer);  
}

function renderAddContactButtonDesktop() {
  const contentDesktop = document.getElementById("contactsContent");
  const addContactButtonContainerDesktop = document.createElement("div");
  addContactButtonContainerDesktop.classList.add("addContactButtonContainerDesktop");  // Für die desktop Ansicht
  addContactButtonContainerDesktop.innerHTML = /*html*/ `
    <button class="addContactButtonDesktop" onclick="addContactShowOverlayDesktop()">Add new contact</button>`;
  contentDesktop.appendChild(addContactButtonContainerDesktop);  
  addContactButtonContainerDesktop.addEventListener("click", function () {  // Fügt einen Event-Listener hinzu, um das Overlay zu zeigen    
  });
}

function handleAddContactClick() {
  addContactScreen(); // Diese Funktion wird direkt im HTML-Code aufgerufen
}

function renderContacts() {  
  const content = document.getElementById("contactsContent");
  content.innerHTML = "";
  renderAddContactButtonDesktop();
  const contactsByFirstLetter = {};
  contactsData.forEach((oneContact) => {
    const firstLetter = oneContact.name.charAt(0).toUpperCase();
    updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact);
  });
  renderContactsByFirstLetter(content, contactsByFirstLetter);
}

function updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact) {
  if (!contactsByFirstLetter[firstLetter]) {
    contactsByFirstLetter[firstLetter] = createLetterAndContactsContainer(firstLetter);
  }
  const oneContactContainer = createOneContactContainer(oneContact);
  contactsByFirstLetter[firstLetter] += oneContactContainer;
}

function createLetterAndContactsContainer(firstLetter) {
  return /*html*/ `
    <div class="letterAndContactsContainer">
      <div class="letter-column">
        <h2 class="contact-first-letter">${firstLetter}</h2>
      </div>
    </div>
  `;
}

function createOneContactContainer(oneContact) {
  return /*html*/ `
    <div class="oneContactContainer" onclick="openContactScreenMobile(${oneContact.id})">
      <div>
        ${singleMemberToHTML(oneContact, 0)}
      </div>
      <div class="contact-info-container">
        <h2 class="oneContactContainerH2Desktop">${oneContact.name}</h2>
        <a class="oneContactContainerAElement">${oneContact.email}</a>
      </div>
    </div>
  `;
}

function renderContactsByFirstLetter(content, contactsByFirstLetter) {
  Object.values(contactsByFirstLetter).forEach((section) => {
    content.innerHTML += section;
  });
}

function addContactScreen() {
  const content = document.getElementById("contactsContent");
  content.innerHTML = createAddContactScreenHTML();
  hideHeaderAndFooter();    
}

function createAddContactScreenHTML() {
  return /*html*/ addContactFormMobileHTML();
}

function addContactFormMobileHTML() {
  return /*html*/ `
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
      </div>
    </form>
  `;
}

function createContactMobile() {
  const nameInput = document.querySelector(".addContactInputNameMobile");
  const mailInput = document.querySelector(".addContactInputMailAddresssMobile");
  const phoneInput = document.querySelector(".addContactInputPhoneMobile");
  const newName = nameInput.value.trim();
  const newMail = mailInput.value.trim();
  const newPhone = phoneInput.value.trim();

  if (validateInputs(newName, newMail, newPhone)) {
    const newContact = createNewContact(newName, newMail, newPhone);
    updateContactsData(newContact);
    finalizeContactCreation();
  }
}

function validateInputs(name, mail, phone) {
  if (name === "" || mail === "" || phone === "") {
    alert("Bitte füllen Sie alle Felder aus.");
    return false;
  }
  return true;
}

function createNewContact(name, mail, phone) {
  const defaultImage = "../assets/img/contact/defaultContactImage.svg";
  let nextContactId = contactsData.length + 1;
  return {
    id: nextContactId,
    name: name,
    email: mail,
    phone: phone,
    contactImg: defaultImage,
    from: currentUser.name,
    colorCode: getRandomColorHex()
  };
}

function updateContactsData(newContact) {
  contactsData.push(newContact);
  saveContactsData(contactsData);
}

function finalizeContactCreation() {
  hideOverlay();
  contactsInit();
}

function createContact() {
  const isMobile = window.innerWidth < 768 ? true : false;  
  const nameInput = getInputField(isMobile, ".addContactInputNameMobile", ".addContactInputNameDesktop");
  const mailInput = getInputField(isMobile, ".addContactInputMailAddresssMobile", ".addContactInputMailAddresssDesktop");
  const phoneInput = getInputField(isMobile, ".addContactInputPhoneMobile", ".addContactInputPhoneDesktop");
  const newName = nameInput.value.trim();
  const newMail = mailInput.value.trim();
  const newPhone = phoneInput.value.trim();
  if (validateInputs(newName, newMail, newPhone)) {
    const newContact = createNewContact(newName, newMail, newPhone);
    updateContactsData(newContact);
    updateCurrentUser(newName, newMail, newPhone, newContact.colorCode);
    finalizeContactCreation();
  }
}

function getInputField(isMobile, mobileSelector, desktopSelector) {
  return isMobile ? document.querySelector(mobileSelector) : document.querySelector(desktopSelector);
}

function validateInputs(name, mail, phone) {
  if (name === "" || mail === "" || phone === "") {
    alert("Bitte füllen Sie alle Felder aus.");
    return false;
  }
  return true;
}

function createNewContact(name, mail, phone) {
  const defaultImage = "../assets/img/contact/defaultContactImage.svg";
  const nextContactId = contactsData.length + 1;
  const rndmColor = getRandomColorHex();
  return {
    id: nextContactId,
    name: name,
    email: mail,
    phone: phone,
    contactImg: defaultImage,
    colorCode: rndmColor
  };
}

function updateContactsData(newContact) {
  contactsData.push(newContact);
  saveContactsData(contactsData);
}

function updateCurrentUser(name, mail, phone, colorCode) {
  const user = new Contact(name, mail, phone, colorCode, currentUser.name);
  contacts.push(user);
  currentUser.addContact(user);
}

function finalizeContactCreation() {
  hideOverlay();
  contactsInit();
}

function saveContactsData(data) {  // Hier werden die Kontakte Lokal gespeichert!
  try {   
    localStorage.setItem('contactsData', JSON.stringify(data));  // Lokal speichern    
    console.log("Kontakt erfolgreich gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern der Kontakte:", error);
  }
}

function editContactScreen(contactId) {
  const content = document.getElementById("contactsContent");
  const selectedContact = getSelectedContact(contactId);
  content.innerHTML = createEditContactHTML(selectedContact);
  hideHeaderAndFooter();
}

function getSelectedContact(contactId) {
  return contactsData.find(contact => contact.id === contactId);
}

function createEditContactHTML(selectedContact) {
  return /*html*/ `
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

function openContactScreenMobile(contactId) {
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
        <p class="openContactPhoneText">Phone</p>
        <p class="openContactPhoneNumber">${selectedContact.phone}</p>        
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
