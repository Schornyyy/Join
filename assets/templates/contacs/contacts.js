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
    showContactsContentRightSideDesktop();
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

function handleAddContactClick() {
  addContactScreen(); // Diese Funktion wird direkt im HTML-Code aufgerufen
}

function createContact() { // Create contact für Mobile Ansicht
  const { newName, newMail, newPhone } = constForCreateContact();
  if (newName === "" || newMail === "" || newPhone === "") {
    alert("Bitte füllen Sie alle Felder aus.");
    return;
  }
  const defaultImage = "../assets/img/contact/defaultContactImage.svg";
  let nextContactId = contactsData.length + 1; // Hier wird die nächste ID festgelegt
  const newContact = constNewContactForCreateContact(nextContactId, newName, newMail, newPhone, defaultImage);
  contactsData.push(newContact);
  saveContactsData(contactsData);
  hideOverlay();
  contactsInit();  
}

function constNewContactForCreateContact(nextContactId, newName, newMail, newPhone, defaultImage) {
  return {
    id: nextContactId,
    contactName: newName,
    contactMailAdress: newMail,
    contactPhone: newPhone,
    contactImg: defaultImage,
  };
}

function constForCreateContact() {
  const nameInput = document.querySelector(".addContactInputNameDesktop");
  const mailInput = document.querySelector(".addContactInputMailAddresssDesktop");
  const phoneInput = document.querySelector(".addContactInputPhoneDesktop");
  const newName = nameInput.value.trim();
  const newMail = mailInput.value.trim();
  const newPhone = phoneInput.value.trim();
  return { newName, newMail, newPhone };
}

function saveContactsData(data) {  // Hier werden die Kontakte Lokal gespeichert!
  try {   
    localStorage.setItem('contactsData', JSON.stringify(data));  // Lokal speichern    
    console.log("Kontakt erfolgreich gespeichert.");
  } catch (error) {
    console.error("Fehler beim Speichern der Kontakte:", error);
  }
}




 // Developer tool (Nur für die entwickler, nicht für das Projekt ansich notwendig)
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