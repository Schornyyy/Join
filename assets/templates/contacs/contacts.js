let nextContactId; // ID-counter for next contact-ID
let lastClickedContactId; // Last clicked contact-ID
let currentMenuItem = 'nav-contacts'; // Variable zum Verfolgen des aktuellen Menüpunkts

/**
 * initialize all contacts for the current user
 */
async function contactsInit() {
  try {   
    initializeContactId();
    initializeView();
    showHeaderAndFooter();
    renderAddContactButton();
  } catch (error) {
        
  }
}

/**
 * Get contact ID´s
 */
function initializeContactId() {
  nextContactId = currentUser.contacts.length;
}

/**
 * Check if mobile or desktop view for css media querry
 */
function initializeView() {
  const isMobile = window.innerWidth < 960;
  if (isMobile) {      
    renderContacts();
    hidecontactsContentRightSideDesktop();
    hideOverlay();   
  } else {      
    renderContactsDesktop();
    showContactsContentRightSideDesktop();
    changeScrollbar();
  }
  contactsContentBackgroundColorWhite();  
  window.addEventListener('resize', contactsInit);
}

/**
 * This function is called in HTML-Code and shows the "add contact screen" to add a new contact person
 */
function handleAddContactClick() {
  addContactScreen();
}

/**
 * Delete contact function on desktop view
 * @param {string} contactId - This is the contact ID example "5"
 */
function deleteContact(contactId) {
  if (!validateContactId(contactId)) return;
  const confirmDelete = confirm("Möchten Sie diesen Kontakt wirklich löschen?");  
  if (!confirmDelete) return;  
  try {
      const contactIndex = findContactIndex(contactId);
      if (contactIndex === -1) {
          console.error("Selected contact not found in currentUser.contacts.");
          return;
      }      
      const deletedContact = removeContact(contactIndex);
      saveAndLogDeletedContact(deletedContact);
  } catch (error) {
      handleDeleteError(error);
  }
  clearAddContactDesktopRightSideContainer();
  contactsInit();
}

/**
 * Validate contact ID if exist
 * @param {string} contactId - This is the contact ID example "5"
 */
function validateContactId(contactId) {
  if (!contactId) {
      console.error("Invalid contact ID");
      return false;
  }
  return true;
}

/**
 * Find contact ID
 * @param {string} contactId - This is the contact ID example "5"
 */
function findContactIndex(contactId) {
  return currentUser.contacts.findIndex((contact) => contact.id === contactId);
}

/**
 * Remove contact
 * @param {string} contactIndex - This is the contact ID example "5"
 */
function removeContact(contactIndex) {
  return currentUser.contacts.splice(contactIndex, 1)[0];
}

/**
 * Save deleted contact
 * @param {string} deletedContact - This is the deleted contact example "Kevin Mayer"
 */
function saveAndLogDeletedContact(deletedContact) {
  currentUser.save();  
}

/**
 * Catch error
 * @param {string} error - Show error if the contact can´t be deleted
 */
function handleDeleteError(error) {
  console.error("Fehler beim Löschen des Kontakts:", error);
}

/**
 * Clear add contact desktop right side container
 */
function clearAddContactDesktopRightSideContainer() {
  let addContactDesktopRightSideContainer = document.getElementById("contactsContentRightSideContactDataContainerID");
  addContactDesktopRightSideContainer.innerHTML = "";
}

/**
 * Show the color from user image background html
 * @param {string} member - This is the user or contact name
 * @param {string} index - This is the ID for the user or contact
 */
function singleMemberToHTMLOpenContactDesktop(member, index) {
  let textcolor;
  let iconRightStep = 10;
  if (!isColorLight(member.colorCode)) textcolor = 'white';
  return `
      <div class="openContactUserImg" style="background-color: ${member.colorCode};color:${textcolor};right:${index * iconRightStep}px">
            ${getFirstLettersOfName(member.name)}
      </div>
  `;
}

/**
 * Add change scrollbar to event listener or remove it
 */
function changeScrollbar() {
  document.addEventListener("DOMContentLoaded", function() {
    const contactsContainer = document.querySelector('.contacts-container');  
    contactsContainer.addEventListener('mouseenter', function() {
      contactsContainer.classList.add('custom-scrollbar');
    });  
    contactsContainer.addEventListener('mouseleave', function() {
      contactsContainer.classList.remove('custom-scrollbar');
    });
  });
}

/**
 * Developer tool (only for developer, not needed for the project himself). Function to delete a contact without an id
 */
function deleteFirstContact() {
  if (currentUser.contacts.length > 0) {
      const deletedContact = currentUser.contacts.shift();
      saveAndLogDeletedContact(deletedContact);
  } else {
      console.error("No contacts available to delete.");
  }
  contactsInit();
}

/**
 * Developer tool (only for developer, not needed for the project himself). Clear the lokal storage
 */
async function deleteContactDataById() {
  try {
    localStorage.clear();
    contactsData = await fetchContactsData();
    localStorage.setItem('contactsData', JSON.stringify(contactsData));    
  } catch (error) {
    console.error("Fehler beim Löschen und Neu Laden der Kontakt-Daten:", error);
  }
}