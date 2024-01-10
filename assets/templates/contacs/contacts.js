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

//---------------------------------------------------------------------------------------
function deleteContact(contactId) {  // Delete contact function on desktop view
  if (!validateContactId(contactId)) return;  // Validate contact ID for no double contact ID´s
  const confirmDelete = confirm("Möchten Sie diesen Kontakt wirklich löschen?");  
  if (!confirmDelete) return;  
  try {
      const contactIndex = findContactIndex(contactId);  // Find contact ID
      if (contactIndex === -1) {
          console.error("Selected contact not found in currentUser.contacts.");
          return;
      }      
      const deletedContact = removeContact(contactIndex);  // Remove contact
      saveAndLogDeletedContact(deletedContact);  // Save deleted contact
  } catch (error) {
      handleDeleteError(error);  // Handle deleted contact error
  }  
  contactsInit();  // contacts init to show changes
}

function validateContactId(contactId) {  // validate contact ID if exist
  if (!contactId) {
      console.error("Invalid contact ID");  // catch error
      return false;
  }
  return true;
}
  
function findContactIndex(contactId) {  // Find contact ID
  return currentUser.contacts.findIndex((contact) => contact.id === contactId);
}
  
function removeContact(contactIndex) {  // Remove contact
  return currentUser.contacts.splice(contactIndex, 1)[0];
}
  
function saveAndLogDeletedContact(deletedContact) {  // Save deleted contact
  currentUser.save();
  console.log(`Kontakt "${deletedContact.name}" wurde erfolgreich gelöscht.`);
}
  
function handleDeleteError(error) {  // Catch error
  console.error("Fehler beim Löschen des Kontakts:", error);
}
// -------------------------------------------------------------------------------

function singleMemberToHTMLOpenContactDesktop(member, index) {  // Show the color from user image background
  let textcolor;
  let iconRightStep = 10;
  if (!isColorLight(member.colorCode)) textcolor = 'white';
  return `
      <div class="openContactUserImg" style="background-color: ${member.colorCode};color:${textcolor};right:${index * iconRightStep}px">
            ${getFirstLettersOfName(member.name)}
      </div>
  `;
}
// -----------------------------------------------------------------------------------

// Developer tool (only for developer, not needed for the project himself)
function deleteFirstContact() {
  if (currentUser.contacts.length > 0) {
      const deletedContact = currentUser.contacts.shift(); // Delete the first contact at currentUser.contacts array
      saveAndLogDeletedContact(deletedContact);  // Save data after deleting contact
  } else {
      console.error("No contacts available to delete.");  // Show console error 
  }
  contactsInit();  // Call function contactsInit 
}
// ----------------------------------------------------------------------------------------

// Developer tool (only for developer, not needed for the project himself)
async function deleteContactDataById() {  // Function deleteContactDataById is for clear lokalStorage if one Kontact need to delete manuel without contact ID
  try {
    localStorage.clear();  // Clear all Data in localStorage
    contactsData = await fetchContactsData();  // Fetch data from server
    localStorage.setItem('contactsData', JSON.stringify(contactsData));  // Save new data in localStorage
    console.log("Kontakt-Daten wurden erfolgreich gelöscht und neu geladen.");
  } catch (error) {  // catch error
    console.error("Fehler beim Löschen und Neu Laden der Kontakt-Daten:", error);
  }
}