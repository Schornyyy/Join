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
   * @param {string} contactIndex - This is the contact ID example "5"b
   */
  function removeContact(contactIndex) {
    return currentUser.contacts.splice(contactIndex, 1)[0];
  }
  
  /**
   * Save deleted contact
   * @param {string} deletedContact - This is the deleted contact data
   */
  function saveAndLogDeletedContact(deletedContact) {  // 
    currentUser.save();
    console.log(`Kontakt "${deletedContact.name}" wurde erfolgreich gelöscht.`);
  }
  
  /**
   * Catch error
   */
  function handleDeleteError(error) {
    console.error("Fehler beim Löschen des Kontakts:", error);
  }
  
  /**
   * Show clicked contact details for mobile view
   * @param {string} contactId - This is the contact ID example "5"
   */
  function openContactScreenMobile(contactId) {
    const content = document.getElementById("contactsContent");
    const selectedContact = findSelectedContact(contactId);
    if (!selectedContact) {
        handleContactNotFound();
        return;
    }
    content.innerHTML = createContactScreenHTML(selectedContact);
    setupContactScreen(selectedContact.id);
    triggerSlideInAnimation();
  }
  
  /**
   * Setup function to finish open contact screen mobile on mobile view
   * @param {string} contactId - This is the contact ID example "5"
   */
  function setupContactScreen(contactId) {
    console.log(contactId);
    showHeaderAndFooter();
    contactsContentBackgroundColorWhiteGray();
    addDropdownMenuClickListener();
  }
  
  /**
   * Find the clicked contactID
   * @param {string} contactId - This is the contact ID example "5"
   */
  function findSelectedContact(contactId) {  // 
    return currentUser.contacts.find(contact => contact.id === contactId);
  }
  
  /**
   * Generate HTML for function createContactScreenHTML on mobile view
   * @param {string} selectedContact - This is the selected contact to open
   */
  function createContactScreenHTML(selectedContact) {
    return /*html*/ `
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
              ${singleMemberToHTML(selectedContact, 0)}
              <h2 class="openContactH2">${selectedContact.name}</h2>
          </div>
          <p class="openContactInformation">Contact Information</p>
          <p class="openContactEmail">Email</p>
          <a class="openContactEmailLink" href="mailto:${selectedContact.email}">${selectedContact.email}</a>
          <p class="openContactPhoneText">Phone</p>
          <p class="openContactPhoneNumber">${selectedContact.phone}</p>        
      </div>  
      <div class="dropdown-container" id="contactOptionsDropdownContainer">
          <div class="dropdown-triggerContainer">
            <div class="dropdown-trigger" onclick="toggleDropdownMenu()">
                <img id="menuContactOptionsButton" src="../assets/img/contact/menuContactOptionsButtonImg.svg" alt="">
            </div>
          </div>
          <div class="dropdown-menu" id="contactOptionsDropdown">
              <div class="dropdown-option" data-value="edit" onclick="editContactScreen(${selectedContact.id})">
                  <img src="../assets/img/contact/editContactsDropDownIcon.svg" alt="Edit Contact">
              </div>            
              <div class="dropdown-option" data-value="delete" onclick="deleteContactMobile(${selectedContact.id})">
                  <img src="../assets/img/contact/DeleteContactDropwDownIcon.svg" alt="Delete Contact">
              </div>
          </div>
      </div>
    `;
  }
  
  /**
   * Slide in animation call for class: contactsContent for openContactScreenMobile function
   */
  function triggerSlideInAnimation() {
    const content = document.getElementById("contactsContent");
    setTimeout(() => {
        content.classList.add("slideInContactsContentMobile");
    }, 10);
    setTimeout(() => {
        content.classList.remove("slideInContactsContentMobile");
    }, 2000);
  }
  
  /**
   * Function to generate user image with random background-color on mobile view
   */
  function singleMemberToHTMLOpenContactMobile(member, index) {
    let textcolor;
    let iconRightStep = 10;
    if (!isColorLight(member.colorCode)) textcolor = 'white';
    return `
        <div class="openContactUserImgMobile" style="background-color: ${member.colorCode};color:${textcolor};right:${index * iconRightStep}px">
              ${getFirstLettersOfName(member.name)}
        </div>
    `;
  }