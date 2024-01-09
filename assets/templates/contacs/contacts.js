let nextContactId; // ID-counter for next contact-ID
let lastClickedContactId; // Last clicked contact-ID

// contacts inti function
async function contactsInit() {  // Init function for contacts
  try {   
    initializeContactId();  // Get contact ID´s
    initializeView();  // Check if mobile or desktop view for css media querry
    showHeaderAndFooter();  // Show header and footer for mobile
    renderAddContactButton();  // Create add contact button
  } catch (error) {  // catch error
    console.error("Fehler beim Initialisieren der Kontakte:", error);
  }
}

function initializeContactId() {  // Get contact ID´s
  nextContactId = currentUser.contacts.length;
}

function initializeView() {  // Check if mobile or desktop view for css media querry
  const isMobile = window.innerWidth < 768;
  if (isMobile) {      
    renderContacts();  // Render contacts for mobile view
    hidecontactsContentRightSideDesktop();  // Hide contact right side container in mobile view
  } else {      
    renderContactsDesktop();  // Render contacts for desktop view
    showContactsContentRightSideDesktop();
  }
  contactsContentBackgroundColorWhite();
}

//---------------------------------------------------------------------------------------
function handleAddContactClick() {
  addContactScreen(); // This function is called in HTML-Code and shows the "add contact screen" to add a new contact person
}

// Developer tool (only for developer, not needed for the project himself)
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