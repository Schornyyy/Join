// JavaScript Logic for mobile view
function contactsContentBackgroundColorWhiteGray() {  // Change background color to white grey for contacts content on mobile view
  const content = document.getElementById("contactsContent");
  content.style.backgroundColor = "var(--white-grey)";
}
  
function contactsContentBackgroundColorWhite() {  // Change background color to white for contacts content on mobile view
  const content = document.getElementById("contactsContent");
  content.style.backgroundColor = "white";
}
  
function hideHeaderAndFooter() {  // Hide header and footer for edit contact and create contact screen on mobile view
  const mobileHeader = document.querySelector(".mobileHeader"); 
  const menuTemplate = document.querySelector(".menuTemplate");
  mobileHeader.style.display = "none";
  menuTemplate.style.display = "none";
}
  
function showHeaderAndFooter() {  // Show header and footer screen on mobile view
  const mobileHeader = document.querySelector(".mobileHeader");
  const menuTemplate = document.querySelector(".menuTemplate");
  mobileHeader.style.display = "flex";
  menuTemplate.style.display = "flex";
}

function hidecontactsContentRightSideDesktop() {  // Hide contacts content right side only for mobile view
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "none";
}
//-------------------------------------------------------------------------------------------------------------------------
function renderContacts() {  // Render contacts for mobile view
  const content = document.getElementById("contactsContent");
  content.innerHTML = "";  
  const contactsByFirstLetter = {};
  currentUser.contacts.sort((a, b) => a.name.localeCompare(b.name));  // Sort the contact name at alphabet
  currentUser.contacts.forEach((oneContact) => {  // // For each contact sorted by first letter
  const firstLetter = oneContact.name.charAt(0).toUpperCase();
  updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact);  // Sort the contacts by first letter
  });
  renderContactsByFirstLetter(content, contactsByFirstLetter);  // Render the contacts by first letter
}

function renderAddContactButton() {  // Create add contact button for mobile view
  const content = document.getElementById("contactsContent");
  const addContactButtonContainer = document.createElement("div");  // Create div container for add contact button
  addContactButtonContainer.classList.add("addContactButtonContainerMobile");  // Add div container class addContactButtonContainerMobile for mobile view
  addContactButtonContainer.innerHTML =/*html*/ `
    <img src="../assets/img/contact/addContactButtonMobile.svg" class="addContactImage" onclick="handleAddContactClick()">`; // onclick-Funktion direct in HTML-Code
  content.appendChild(addContactButtonContainer);  // Append the addContactButtonContainer to the content
}
  
function updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact) {  // Sort the contacts by first letter
  if (!contactsByFirstLetter[firstLetter]) {
    contactsByFirstLetter[firstLetter] = createLetterAndContactsContainer(firstLetter);  // Create div container for letters
  }
  const oneContactContainer = createOneContactContainer(oneContact);  // Create new contact container for each contact
  contactsByFirstLetter[firstLetter] += oneContactContainer;
}
  
function createLetterAndContactsContainer(firstLetter) {  // Create div container for letters in HTML
  return /*html*/ `
    <div class="letterAndContactsContainer">
      <div class="letter-column">
        <h2 class="contact-first-letter">${firstLetter}</h2>
      </div>
    </div>
  `;
}
  
function createOneContactContainer(oneContact) {  // Create div container for each contact in HTML
  return /*html*/ `
    <div class="oneContactContainer" onclick="openContactScreenMobile(${oneContact.id})">
      <div>
        ${singleMemberToHTML(oneContact, 0)}  <!-- Create user image random background-color -->
      </div>
      <div class="contact-info-container">
        <h2 class="oneContactContainerH2Desktop">${oneContact.name}</h2>
        <a class="oneContactContainerAElement">${oneContact.email}</a>
      </div>
    </div>
  `;
}
  
function renderContactsByFirstLetter(content, contactsByFirstLetter) {  // Add each contact to the section on mobile view
  Object.values(contactsByFirstLetter).forEach((section) => {
    content.innerHTML += section;
  });
}
//---------------------------------------------------------------------------------------------------------------------------
function addContactScreen() {  // Add contact screen on mobile view
  const content = document.getElementById("contactsContent");
  content.innerHTML = createAddContactScreenHTML();
  hideHeaderAndFooter();  // Hide header and footer
}
  
function createAddContactScreenHTML() {  // Function to call function addContactFormMobileHTML
  return /*html*/ addContactFormMobileHTML();
}
  
function addContactFormMobileHTML() {  // Generate HTML for add contact mobile on mobile view
  return /*html*/ `
    <div class="addContactContainerHeader">
      <div class="addContactCloseXContainer">
        <button class="addContactCloseXButtonMobile" onclick="contactsInit()">X</button>  <!-- Create X close button on mobile view -->
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
    <form id="addContactFormMobileID" onsubmit="createContactMobile()">  <!-- Form for add contact on mobile view -->
      <div class="addContactContainerFooter">
        <input class="addContactInputNameMobile" type="text" required placeholder="Name">
        <input class="addContactInputMailAddresssMobile" type="text" required placeholder="E Mail">
        <input class="addContactInputPhoneMobile" type="text" required placeholder="Phone">
        <img class="createContactButtonImg" src="../assets/img/contact/createContactButton.svg" alt="" onclick="createContactMobile()">  <!-- Create button vor create contact mobile on mobile view -->
      </div>
    </form>
  `;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------- 
async function createContactMobile() {  // Function to create a new contact person
  const { newName, newMail, newPhone } = constForCreateContactMobile();  // Const to create contact mobile on mobile view
  if (newName === "" || newMail === "" || newPhone === "") {  // Check if all inputs are not empty
    alert("Bitte füllen Sie alle Felder aus.");
    return;
  }
  let createdContact = new Contact(newName, newMail, newPhone, getRandomColorHex(), currentUser.name, currentUser.contacts.length + 1);  // Create new contact with parameters
  await currentUser.contacts.push(createdContact);  // create new contact
  await currentUser.save();  // Save new contact for currentUser
  hideOverlay();  // If contact added ... hide the overlay screen
  contactsInit();  // Back to contacts start to show the new contact
}
  
function constForCreateContactMobile() {  // Const for create contact desktop view
  const nameInput = document.querySelector(".addContactInputNameMobile");  // Get contact name input data on mobile view
  const mailInput = document.querySelector(".addContactInputMailAddresssMobile");  // Get contact mail address input data on mobile view
  const phoneInput = document.querySelector(".addContactInputPhoneMobile");  // Get contact phone number input data on desktop view
  const newName = nameInput.value.trim();  // Remove free spaces
  const newMail = mailInput.value.trim();  // Remove free spaces
  const newPhone = phoneInput.value.trim();  // Remove free spaces
  return { newName, newMail, newPhone };
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------------
function editContactScreen(contactId) {  // Edit contact screen on mobile view
  const content = document.getElementById("contactsContent");
  const selectedContact = findSelectedContact(contactId);  // Find clicked contact ID
  if (!selectedContact) {
      handleContactNotFound();  // Function if no contact was found
      return;
  }
  content.innerHTML = createEditContactHTML(selectedContact);  // Function call createEditContactHTML to Generate edit contact HTML on mobile view
  hideHeaderAndFooter();  // Hide header and footer on mobile view
}
  
function findSelectedContact(contactId) {  // Find clicked contact ID
  return currentUser.contacts.find(contact => contact.id === contactId);
}
  
function createEditContactHTML(selectedContact) {  // Function createEditContactHTML to Generate edit contact HTML on mobile view
  return /*html*/ `
    <div class="addContactContainerHeader">
      <div class="addContactCloseXContainer">
        <button class="addContactCloseXButtonMobile" onclick="contactsInit()">X</button>  <!-- Create x close button on mobile view -->
      </div>
      <div class="addContactBlockHeader">
        <p class="addContactH1">Edit contact</p>
        <img class="addContactBlueStroked" src="../assets/img/contact/addContactBlueStroked.svg" alt="">          
      </div>
    </div>
    <div class="addContactBlankUserImg">        
      ${singleMemberToHTMLOpenContactMobile(selectedContact, 0)}  <!-- Create user image with random background-color -->
    </div>
    <form id="editcontactFormMobileID" onsubmit="updateContactMobile(${selectedContact.id})">  <!-- Form for edit contact mobile view -->
      <div class="addContactContainerFooter">
        <input class="addContactInputNameMobile" type="text" required pattern="[A-Za-z]+" placeholder="Name" value="${selectedContact.name}">
        <input class="addContactInputMailAddresssMobile" type="email" required placeholder="E Mail" value="${selectedContact.email}">
        <input class="addContactInputPhoneMobile" type="tel" required pattern="[0-9]{1,}" placeholder="Phone" value="${selectedContact.phone}">
        <div>
          <img class="createContactButtonImg" src="../assets/img/contact/editContactDeleteButtonImg.svg" alt="" onclick="deleteContact(${selectedContact.id})">  <!-- Create delete contact button on mobile view -->
          <img class="createContactButtonImg" src="../assets/img/contact/editContactSaveButtonImg.svg" alt="" onclick="updateContactMobile(${selectedContact.id})">  <!-- Create edit contact button on mobile view -->
        </div>
      </div>
    </form>
  `;
}

function handleContactNotFound() {  // Catch console error if contact not found
  console.error("Selected contact not found in currentUser.contacts.");
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------  
function updateContactMobile(contactId) {  // Update function if already exist contact was edit on mobile view
  const updatedInputs = getUpdatedInputs();  // Get updated input data for mobile view 
  if (validateInputs(updatedInputs)) {  // Check if contact data changed
    const existingContact = findExistingContact(updatedInputs, contactId);  // Get the contact to edit
    if (!existingContact) {
        const oldContact = findOldContact(contactId);  // Find the contact by ID
        const hasChanged = checkForChanges(oldContact, updatedInputs);  // Check if contact data changed
        const updatedContactsData = updateContactsData(contactId, updatedInputs, hasChanged);  // Overwrite the old contact data with the new contact data
        saveAndInit(updatedContactsData);  // Save the edit contact
    }
  }
}

function getUpdatedInputs() {  // Get updated input data for mobile view
  const nameInput = document.querySelector(".addContactInputNameMobile");
  const mailInput = document.querySelector(".addContactInputMailAddresssMobile");
  const phoneInput = document.querySelector(".addContactInputPhoneMobile");
  return {
    updatedName: nameInput.value.trim(),  // Remove free spaces
    updatedMail: mailInput.value.trim(),  // Remove free spaces
    updatedPhone: phoneInput.value.trim()  // Remove free spaces
  };
}
  
function validateInputs(updatedInputs) {  // Check if all inputs are not empty
  if (Object.values(updatedInputs).some(value => value === "")) {
      alert("Bitte füllen Sie alle Felder aus.");
      return false;
  }
  return true;
}
  
function findExistingContact(updatedInputs, contactId) {  // Get the contact to edit
  return currentUser.contacts.find(
      (contact) =>
          contact.name === updatedInputs.updatedName &&
          contact.email === updatedInputs.updatedMail &&
          contact.id !== contactId
  );
}
  
function findOldContact(contactId) {  // Find the contact by ID
  return currentUser.contacts.find((contact) => contact.id === contactId);
}
  
function checkForChanges(oldContact, updatedInputs) {  // Check if contact data changed
  return {
      hasNameChanged: oldContact.name !== updatedInputs.updatedName,
      hasMailChanged: oldContact.email !== updatedInputs.updatedMail,
      hasPhoneChanged: oldContact.phone !== updatedInputs.updatedPhone
  };
}
  
function updateContactsData(contactId, updatedInputs, hasChanged) {  // Overwrite the old contact data with the new contact data
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
  
function saveAndInit(updatedContactsData) {  // Save the edit contact at the current user
  currentUser.contacts = updatedContactsData;
  currentUser.save();  // After contact saved back to contacts to show the new contact
  contactsInit();  // Hide overlay for edit contact
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------  
function deleteContactMobile(contactId) {  // Delete contact function on mobile view
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
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------  
function openContactScreenMobile(contactId) {  // Show clicked contact details for mobile view
  const content = document.getElementById("contactsContent");
  const selectedContact = findSelectedContact(contactId);  // Find the clicked contactID
  if (!selectedContact) {
      handleContactNotFound();  // Catch console error if contact not found
      return;
  }
  content.innerHTML = createContactScreenHTML(selectedContact);  // Generate HTML for function createContactScreenHTML on mobile view
  setupContactScreen(selectedContact.id);
  triggerSlideInAnimation();
}

function setupContactScreen(contactId) {  // Setup function to finish open contact screen mobile on mobile view
  console.log(contactId);
  showHeaderAndFooter();  // Show header and footer
  contactsContentBackgroundColorWhiteGray();  // Change background-color for open contact screen mobile on mobile view
  addDropdownMenuClickListener();  // Add the drop down menu to the eventlistener
}
  
function findSelectedContact(contactId) {  // Find the clicked contactID
  return currentUser.contacts.find(contact => contact.id === contactId);
}
  
function createContactScreenHTML(selectedContact) {  // Generate HTML for function createContactScreenHTML on mobile view
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
                    <img src="../assets/img/contact/arrow-left-line.svg" alt="">  <!-- Create X close button -->
                </div>
            </div>                                                                
        </div>                    
    </div>  
    <div class="openContactContainerFooter">
        <div class="openContactUserImageAndNameContainer"> 
            ${singleMemberToHTML(selectedContact, 0)}  <!-- Create user image with random background-color -->
            <h2 class="openContactH2">${selectedContact.name}</h2>
        </div>
        <p class="openContactInformation">Contact Information</p>
        <p class="openContactEmail">Email</p>
        <a class="openContactEmailLink" href="mailto:${selectedContact.email}">${selectedContact.email}</a>
        <p class="openContactPhoneText">Phone</p>
        <p class="openContactPhoneNumber">${selectedContact.phone}</p>        
    </div>  
    <div class="dropdown-container" id="contactOptionsDropdownContainer">  <!-- Drop down menu -->
        <div class="dropdown-triggerContainer">
          <div class="dropdown-trigger" onclick="toggleDropdownMenu()">  <!-- Toggle drop down menu -->
              <img id="menuContactOptionsButton" src="../assets/img/contact/menuContactOptionsButtonImg.svg" alt="">  <!-- Create button to open the drop down menu -->
          </div>
        </div>
        <div class="dropdown-menu" id="contactOptionsDropdown">  <!-- Drop down menu options -->
            <div class="dropdown-option" data-value="edit" onclick="editContactScreen(${selectedContact.id})">  <!-- Drop down menu option edit contact screen on mobile view -->
                <img src="../assets/img/contact/editContactsDropDownIcon.svg" alt="Edit Contact">  <!-- Drop down menu option edit image on mobile view -->
            </div>            
            <div class="dropdown-option" data-value="delete" onclick="deleteContactMobile(${selectedContact.id})">  <!-- Drop down menu option delete contact screen on mobile view -->
                <img src="../assets/img/contact/DeleteContactDropwDownIcon.svg" alt="Delete Contact">  <!-- Drop down menu option delete image on mobile view -->
            </div>
        </div>
    </div>
  `;
}

function triggerSlideInAnimation() {  // Slide in animation call for class: contactsContent for openContactScreenMobile function
  const content = document.getElementById("contactsContent");
  setTimeout(() => {
      content.classList.add("slideInContactsContentMobile");
  }, 10);
  setTimeout(() => {
      content.classList.remove("slideInContactsContentMobile");
  }, 2000);
}
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

function singleMemberToHTMLOpenContactMobile(member, index) {  // Function to generate user image with random background-color on mobile view
  let textcolor;
  let iconRightStep = 10;
  if (!isColorLight(member.colorCode)) textcolor = 'white';
  return `
      <div class="openContactUserImgMobile" style="background-color: ${member.colorCode};color:${textcolor};right:${index * iconRightStep}px">
            ${getFirstLettersOfName(member.name)}
      </div>
  `;
}