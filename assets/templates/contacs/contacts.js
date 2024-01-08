
let nextContactId; // ID-Zähler für die nächste Kontakt-ID
let lastClickedContactId;

async function contactsInit() {  
  try {   
    initializeContactId();
    initializeView();
    showHeaderAndFooter();
    renderAddContactButton();   
  } catch (error) {
    console.error("Fehler beim Initialisieren der Kontakte:", error);
  }
}


function initializeContactId() {
  nextContactId = currentUser.contacts.length;
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

function handleAddContactClick() {
  addContactScreen(); // Diese Funktion wird direkt im HTML-Code aufgerufen
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