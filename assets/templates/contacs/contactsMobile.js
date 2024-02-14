/**
  * Change background color to white or grey for contacts content on mobile view
  */
function contactsContentBackgroundColorWhiteGray() {
  const content = document.getElementById("contactsContent");
  content.style.backgroundColor = "var(--white-grey)";
}

/**
  * Change background color to white for contacts content on mobile view
  */
function contactsContentBackgroundColorWhite() {
  const content = document.getElementById("contactsContent");
  content.style.backgroundColor = "white";
}

/**
  * Hide header and footer for edit contact and create contact screen on mobile view
  */
function hideHeaderAndFooter() {
  const mobileHeader = document.querySelector(".mobileHeader"); 
  const menuTemplate = document.querySelector(".menuTemplate");
  mobileHeader.style.display = "none";
  menuTemplate.style.display = "none";
}

/**
  * Show header and footer screen on mobile view
  */
function showHeaderAndFooter() {
  const mobileHeader = document.querySelector(".mobileHeader");
  const menuTemplate = document.querySelector(".menuTemplate");
  mobileHeader.style.display = "flex";
  menuTemplate.style.display = "flex";
}

/**
  * Hide contacts content right side only for mobile view
  */
function hidecontactsContentRightSideDesktop() {
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "none";
}

/**
  * Render contacts for mobile view
  */
function renderContacts() {
  const content = document.getElementById("contactsContent");
  content.innerHTML = "";  
  const contactsByFirstLetter = {};
  currentUser.contacts.sort((a, b) => a.name.localeCompare(b.name));
  currentUser.contacts.forEach((oneContact) => {
  const firstLetter = oneContact.name.charAt(0).toUpperCase();
  updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact);
  });
  renderContactsByFirstLetter(content, contactsByFirstLetter);
}

/**
  * Create add contact button for mobile view
  */
function renderAddContactButton() {
  const content = document.getElementById("contactsContent");
  const addContactButtonContainer = document.createElement("div");
  addContactButtonContainer.classList.add("addContactButtonContainerMobile");
  addContactButtonContainer.innerHTML =/*html*/ `
    <img src="../assets/img/contact/addContactButtonMobile.svg" class="addContactImage" onclick="handleAddContactClick()">`;
  content.appendChild(addContactButtonContainer);
}

/**
  * Sort the contacts by first letter
  * @param {string} contactsByFirstLetter - Contacts sorted by first letter
  * @param {string} firstLetter - First letter for the contact list
  * @param {string} oneContact - One contact data oneContact.id / oneContact color / oneContact.name / oneContact.email
  */
function updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact) {
  if (!contactsByFirstLetter[firstLetter]) {
    contactsByFirstLetter[firstLetter] = createLetterAndContactsContainer(firstLetter);
  }
  const oneContactContainer = createOneContactContainer(oneContact);
  contactsByFirstLetter[firstLetter] += oneContactContainer;
}

/**
  * Sort the contacts by first letter  
  * @param {string} firstLetter - First letter for the contact list  
  */
function createLetterAndContactsContainer(firstLetter) {  // Create div container for letters in HTML
  return /*html*/ `
    <div class="letterAndContactsContainer">
      <div class="letter-column">
        <h2 class="contact-first-letter">${firstLetter}</h2>
      </div>
    </div>
  `;
}

/**
  * Create div container for each contact in HTML
  * @param {string} oneContact - One contact data oneContact.id / oneContact color / oneContact.name / oneContact.email
  */
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

/**
  * Add each contact to the section on mobile view  
  * @param {string} content - contactsContent div container
  * @param {string} contactsByFirstLetter - Contacts sorted by first letter  
  */
function renderContactsByFirstLetter(content, contactsByFirstLetter) {  // 
  Object.values(contactsByFirstLetter).forEach((section) => {
    content.innerHTML += section;
  });
}

/**
  * Add contact screen on mobile view
  */
function addContactScreen() {
  const content = document.getElementById("contactsContent");
  content.innerHTML = createAddContactScreenHTML();
  hideHeaderAndFooter();
}

/**
  * Function to call function addContactFormMobileHTML
  */
function createAddContactScreenHTML() {
  return addContactFormMobileHTML();
}

/**
  * Generate HTML for add contact mobile on mobile view
  */
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
        <input class="addContactInputNameMobile" name="addContactInputNameMobile" id="addContactInputNameMobileID" type="text" required placeholder="Name">
        <input class="addContactInputMailAddresssMobile" name="addContactInputMailAddresssMobile" id="addContactInputMailAddresssMobileID" type="text" required placeholder="E Mail">
        <input class="addContactInputPhoneMobile" name="addContactInputPhoneMobile" id="addContactInputPhoneMobileID" type="text" required placeholder="Phone">
        <img class="createContactButtonImg" src="../assets/img/contact/createContactButton.svg" alt="" onclick="createContactMobile()">
      </div>
    </form>
  `;
}

/**
  * Function to create a new contact person
  */
async function createContactMobile() {
  const { newName, newMail, newPhone } = constForCreateContactMobile();
  if (newName === "" || newMail === "" || newPhone === "") {
    
    return;
  }
  if (!/^\d+$/.test(newPhone)) {
    
    return;
  }
  if (!newMail.includes("@")) {
    
    return;
  }
  let createdContact = new Contact(newName, newMail, newPhone, getRandomColorHex(), currentUser.name, currentUser.contacts.length + 1);
  await currentUser.contacts.push(createdContact);
  await currentUser.save();
  hideOverlay();
  contactsInit();
}

/**
  * Const for create contact desktop view
  */
function constForCreateContactMobile() {
  const nameInput = document.querySelector(".addContactInputNameMobile");
  const mailInput = document.querySelector(".addContactInputMailAddresssMobile");
  const phoneInput = document.querySelector(".addContactInputPhoneMobile");
  const newName = nameInput.value.trim();
  const newMail = mailInput.value.trim();
  const newPhone = phoneInput.value.trim();
  return { newName, newMail, newPhone };
}

/**
 * Edit contact screen on mobile view
 * @param {string} contactId - This is the contact ID example "5"
 */
function editContactScreen(contactId) {
  const content = document.getElementById("contactsContent");
  const selectedContact = findSelectedContact(contactId);
  if (!selectedContact) {
      handleContactNotFound();
      return;
  }
  content.innerHTML = createEditContactHTML(selectedContact);
  hideHeaderAndFooter();
}

/**
 * Find clicked contact ID
 * @param {string} contactId - This is the contact ID example "5"
 */
function findSelectedContact(contactId) {  // 
  return currentUser.contacts.find(contact => contact.id === contactId);
}

/**
 * Function createEditContactHTML to Generate edit contact HTML on mobile view
 * @param {string} selectedContact - - This is the selected contact to open
 */
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
      ${singleMemberToHTMLOpenContactMobile(selectedContact, 0)}
    </div>
    <form id="editcontactFormMobileID" onsubmit="updateContactMobile(${selectedContact.id})">
      <div class="addContactContainerFooter">
        <input class="addContactInputNameMobile" name="editContactInputNameMobile" id="editContactInputNameMobileID" type="text" required pattern="[A-Za-z]+" placeholder="Name" value="${selectedContact.name}">
        <input class="addContactInputMailAddresssMobile" name="editContactInputMailAddresssMobile" id="editContactInputMailAddresssMobileID" type="email" required placeholder="E Mail" value="${selectedContact.email}">
        <input class="addContactInputPhoneMobile" name="editContactInputPhoneMobile" id="editContactInputPhoneMobileID" type="tel" required pattern="[0-9]{1,}" placeholder="Phone" value="${selectedContact.phone}">
        <div>
          <img class="createContactButtonImg" src="../assets/img/contact/editContactDeleteButtonImg.svg" alt="" onclick="deleteContact(${selectedContact.id})">
          <img class="createContactButtonImg" src="../assets/img/contact/editContactSaveButtonImg.svg" alt="" onclick="updateContactMobile(${selectedContact.id})">
        </div>
      </div>
    </form>
  `;
}

/**
 * Catch console error if contact not found
 */
function handleContactNotFound() {  // 
  console.error("Selected contact not found in currentUser.contacts.");
}

/**
 * Update function if already exist contact was edit on mobile view
 * @param {string} contactId - This is the contact ID example "5"
 */
function updateContactMobile(contactId) {
  const updatedInputs = getUpdatedInputs();
  if (validateInputs(updatedInputs)) {
    const existingContact = findExistingContact(updatedInputs, contactId);
    if (!existingContact) {
        const oldContact = findOldContact(contactId);
        const hasChanged = checkForChanges(oldContact, updatedInputs);
        const updatedContactsData = updateContactsData(contactId, updatedInputs, hasChanged);
        saveAndInit(updatedContactsData);
    }
  }
}

/**
 * Get updated input data for mobile view
 */
function getUpdatedInputs() {
  const nameInput = document.querySelector(".addContactInputNameMobile");
  const mailInput = document.querySelector(".addContactInputMailAddresssMobile");
  const phoneInput = document.querySelector(".addContactInputPhoneMobile");
  return {
    updatedName: nameInput.value.trim(),
    updatedMail: mailInput.value.trim(),
    updatedPhone: phoneInput.value.trim()
  };
}

/**
 * Check if all inputs are not empty
 * @param {string} updatedInputs - This are the new contact / email / phone number
 */
function validateInputs(updatedInputs) {
  if (Object.values(updatedInputs).some(value => value === "")) {      
      return false;
  }
  return true;
}

/**
 * Get the contact to edit
 */
function findExistingContact(updatedInputs, contactId) {
  return currentUser.contacts.find(
      (contact) =>
          contact.name === updatedInputs.updatedName &&
          contact.email === updatedInputs.updatedMail &&
          contact.id !== contactId
  );
}

/**
 * Find the contact by ID
 * @param {string} contactId - This is the contact ID example "5"
 */
function findOldContact(contactId) {
  return currentUser.contacts.find((contact) => contact.id === contactId);
}

/**
 * Check if contact data changed
 * @param {string} oldContact - This are the old contact name / emal / phone number
 * @param {string} updatedInputs - Here are the new contact name / the new contact email / the new contact phone number
 */
function checkForChanges(oldContact, updatedInputs) {  // 
  return {
      hasNameChanged: oldContact.name !== updatedInputs.updatedName,
      hasMailChanged: oldContact.email !== updatedInputs.updatedMail,
      hasPhoneChanged: oldContact.phone !== updatedInputs.updatedPhone
  };
}

/**
 * Overwrite the old contact data with the new contact data
 * @param {string} contactId - This is the contact ID example "5" 
 * @param {string} updatedInputs - Here are the new contact name / the new contact email / the new contact phone number
 * @param {boolean} hasChanged - Example {hasNameChanged: false, hasMailChanged: false, hasPhoneChanged: true}
 */
function updateContactsData(contactId, updatedInputs, hasChanged) {
  return currentUser.contacts.map((contact) =>
      contact.id === contactId
          ? {
              ...contact,
              name: hasChanged.hasNameChanged ? updatedInputs.updatedName : contact.name,
              email: hasChanged.hasMailChanged ? updatedInputs.updatedMail : contact.email,
              phone: hasChanged.hasPhoneChanged ? updatedInputs.updatedPhone : contact.phone
          }
          : contact
  );
}

/**
 * Save the edit contact at the current user
 * @param {string} updatedContactsData - Includes the updated contacts data name / email / phone number
 */
function saveAndInit(updatedContactsData) {
  currentUser.contacts = updatedContactsData;
  currentUser.save();
  contactsInit();
}