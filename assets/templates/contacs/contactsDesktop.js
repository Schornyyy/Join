/**
 * Show contacts content right side only for desktop view
 */
function showContactsContentRightSideDesktop() {
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "flex";
}

/**
 * Render function for contacts desktop view
 */
function renderContactsDesktop() {
  const content = document.getElementById("contactsContent");
  content.innerHTML = "";
  renderAddContactButtonDesktop();
  const contactsByFirstLetter = groupContactsByFirstLetter();
  renderContactsByFirstLetter(content, contactsByFirstLetter);
}

/**
 * Create letter div container for sorted contacts by first letter
 */
function groupContactsByFirstLetter() {
    const contactsByFirstLetter = {};
    currentUser.contacts.sort((a, b) => a.name.localeCompare(b.name));
    currentUser.contacts.forEach((oneContact) => {
        const firstLetter = oneContact.name.charAt(0).toUpperCase();
        if (!contactsByFirstLetter[firstLetter]) {
            contactsByFirstLetter[firstLetter] = createLetterContainer(firstLetter);
        }
        const oneContactContainer = createContactContainer(oneContact);
        contactsByFirstLetter[firstLetter] += oneContactContainer;
    });
    return contactsByFirstLetter;
}

/**
 * Generate HTML for the letters
 * @param {string} firstLetter - This is the first letter from contact name
 */
function createLetterContainer(firstLetter) {
    return /*html*/ `
        <div class="letterAndContactsContainer">
            <div class="letter-column">
                <h2 class="contact-first-letter">${firstLetter}</h2>
            </div>
        </div>
    `;
}

/**
 * Generate HTML for each contact
 * @param {string} oneContact - One contact data oneContact.id / oneContact color / oneContact.name / oneContact.email
 */
function createContactContainer(oneContact) {
    return /*html*/ `
        <div class="oneContactContainer" id="contact-${oneContact.id}" onclick="openContactScreenDesktop(${oneContact.id})" data-contact-id="${oneContact.id}">
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
 * Add each contact to the section on desktop view
 * @param {string} content - contactsContent div container
 * @param {string} contactsByFirstLetter - Sorted contacts by first letter
 */
function renderContactsByFirstLetter(content, contactsByFirstLetter) {  // 
    Object.values(contactsByFirstLetter).forEach((section) => {
        content.innerHTML += section;
    });
}

/**
 * Create add contact button for desktop view
 */
function renderAddContactButtonDesktop() {
  const contentDesktop = document.getElementById("contactsContent");
  const addContactButtonContainerDesktop = document.createElement("div");
  addContactButtonContainerDesktop.classList.add("addContactButtonContainerDesktop");
  addContactButtonContainerDesktop.innerHTML = /*html*/ `
    <button class="addContactButtonDesktop" onclick="addContactShowOverlayDesktop()">Add new contact
      <span><img class="addContactButtonDesktopImg" src="../assets/img/contact/addNewContactDesktopButtonImg.svg" alt=""></span></button>    
    `;    
  contentDesktop.appendChild(addContactButtonContainerDesktop);  
  addContactButtonContainerDesktop.addEventListener("click", function () { 
  });
}

/**
 * Show clicked contact details for desktop view
 * @param {string} contactId - This is the contact ID example "5"
 */
function openContactScreenDesktop(contactId) {
  const content = document.getElementById("contactsContentRightSideID");
  const selectedContact = currentUser.contacts.find(contact => contact.id === contactId);
  if (lastClickedContactId !== contactId) {
    openContactsScreenDesktopChangeColorWhite(lastClickedContactId);
    lastClickedContactId = contactId;
    openContactsScreenDesktopChangeColorBlack(contactId);
  }
  openContactScreenDesktopHTML(content, selectedContact);
  showHeaderAndFooter();
  showContactsContentRightSideDesktop();
  const contactContainer = document.getElementById("contactsContentRightSideContactDataContainerID");
  contactContainer.style.animation = "slide-in 0.5s ease-out";
}

/**
 * If contact is not clicked set background-color to white and set text color to black
 * @param {string} contactId - This is the contact ID example "5"
 */
function openContactsScreenDesktopChangeColorWhite(contactId) {
  const lastClickedContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${contactId}"]`);
  if (lastClickedContactContainer) {
    lastClickedContactContainer.style.backgroundColor = "white";
    const lastClickedContactH2 = lastClickedContactContainer.querySelector("h2");
    if (lastClickedContactH2) {
      lastClickedContactH2.style.color = "black";
    }
  }
}

/**
 * If contact is clicked set background-color to grey/black and set text color to white
 * @param {string} contactId - This is the contact ID example "5"
 */
function openContactsScreenDesktopChangeColorBlack(contactId) {
  if (contactId) {
    const currentContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${contactId}"]`);
    if (currentContactContainer) {
      currentContactContainer.style.backgroundColor = "#2A3647";
      const currentContactH2 = currentContactContainer.querySelector("h2");
      if (currentContactH2) {
        currentContactH2.style.color = "white";
      }
    }
  }
}

/**
 * Generate HTML for clicked contact details
 * @param {string} content - contactsContent div container
 * @param {string} selectedContact - This is the selected contact to open
 */
function openContactScreenDesktopHTML(content, selectedContact) {
  content.innerHTML = /*html*/ `
    <div class="contactsContentRightSideHeadLine">
        <h1 class="contactsContentRightSideH1">
          Contacts
        </h1>
        <img class="contactsContentRightSideBlueStribeSvg" src="../../assets/img/contact/contactsContentRightSideBlueStripe.svg" alt="">        
        <p class="contactsContentRightSideHeadLinePElement">Better with a team</p>
    </div>  
    <div id="contactsContentRightSideContactDataContainerID">
      <div class="contactsContentRightSideUserImgAndNameContainer">
        ${singleMemberToHTMLOpenContactDesktop(selectedContact, 0)}
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
      <div class="contactsContentRightSideContactPhoneH2DesktopContainer">
        <h2 class="contactsContentRightSideContactPhoneH2Desktop">Phone</h2>
      </div>
      <div class="openphoneNumberDesktopContainer">
        <p class="openphoneNumberDesktopPElement">${selectedContact.phone}</p>
      </div>
    </div>
   `;
}

/**
 * Show overlay for add contact at desktop view
 */
function addContactShowOverlayDesktop() {
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-container");
  document.body.appendChild(overlayContainer);
  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay-content");
  overlayContainer.appendChild(overlayContent);
  generateHTMLAddContactShowOverlayDesktop(overlayContent);    
  overlayContainer.style.animation = "slide-in 0.5s ease-out";
}

/**
 * Generate HTML for add contact show overlay desktop
 * @param {string} overlayContent - Overlay div container
 */
function generateHTMLAddContactShowOverlayDesktop(overlayContent) {
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
        <div class="addContactCloseXContainer">
          <button class="addContactCloseXButton" onclick="hideOverlay()">X</button>
        </div>
        <div class="addContactBlankUserImgContainer">
          <img class="addContactBlankUserImg" src="../../assets/img/contact/addContactBlankUserImg.svg" alt="">
        </div>
        <div class="addContactDesktopRightSideContent">          
          <form id="addContactShowOverlayDesktopID" onsubmit="createContactDesktop()">
            <div class="addContactContainerFooter">
            <input class="addContactInputNameDesktop" type="text" required pattern="[A-Za-z]+" placeholder="Name" data-contacts>
              <input class="addContactInputMailAddresssDesktop" type="email" required placeholder="E Mail" data-contacts>
              <input class="addContactInputPhoneDesktop" type="tel" required pattern="[0-9]{1,}" placeholder="Phone" data-contacts>
              <div class="addContactButtonContainerDesktop">
                <button class="cancelContactDesktopDeleteButton" onclick="hideOverlay()">Cancel</button>
                  <button class="createContactButton" onclick="createContactDesktop()">Create contact</button>
                </div>
              </div>
          </form>  
          </div>
        </div>
      </div>
    `;
}

/**
 * Create function for new contact person
 */
async function createContactDesktop() {
  const { newName, newMail, newPhone } = constForCreateContactDesktop();
  if (newName === "" || newMail === "" || newPhone === "") {
    showErrorBorder("[data-contacts]", false)
    
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
  setTimeout(() => {contactsInit();}, 1000 * 1.5);
  clearAddContactDesktopRightSideContainer();
}

/**
 * Const function for create contact desktop view
 */
function constForCreateContactDesktop() {
  const nameInput = document.querySelector(".addContactInputNameDesktop");
  const mailInput = document.querySelector(".addContactInputMailAddresssDesktop");
  const phoneInput = document.querySelector(".addContactInputPhoneDesktop");
  const newName = nameInput.value.trim();
  const newMail = mailInput.value.trim();
  const newPhone = phoneInput.value.trim();
  return { newName, newMail, newPhone };
}

/**
 * Function to hide the overlay screen on desktop view
 */
function hideOverlay() {
  const overlayContainer = document.querySelector(".overlay-container");
  if (overlayContainer) {
    overlayContainer.parentNode.removeChild(overlayContainer);
  }
}

/**
 * Edit contact desktop Screen for desktop view
 * @param {string} contactId - This is the contact ID example "5"
 */
function editContactDestop(contactId) {
  const selectedContact = currentUser.contacts.find(
    (contact) => contact.id === contactId
  );
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-container");
  document.body.appendChild(overlayContainer);
  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay-content");
  overlayContainer.appendChild(overlayContent);
  generateHTMLEditContactDesktop(overlayContent, selectedContact);
  overlayContainer.style.animation = "slide-in 0.5s ease-out";
}

/**
 * Generate HTML for editContactDestop
 * @param {string} overlayContent - Overlay div container
 * @param {string} selectedContact - This is the selected contact to open
 */
function generateHTMLEditContactDesktop(overlayContent, selectedContact) {
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
          ${singleMemberToHTMLOpenContactMobile(selectedContact, 0)}
        </div>
        <div class="addContactDesktopRightSideContent">
          <div class="addContactCloseXContainer">
            <button class="addContactCloseXButton" onclick="hideOverlay()">X</button>
          </div>
          <div id="editContactDestopID">
            <div class="addContactContainerFooter">
              <form id="addContactForm" onsubmit="event.preventDefault(); updateContactDesktop(${selectedContact.id})">
                <input class="addContactInputNameDesktop" type="text" required placeholder="Name" value="${selectedContact.name}">
                <input class="addContactInputMailAddresssDesktop" type="email" required placeholder="E-Mail" value="${selectedContact.email}">
                <input class="addContactInputPhoneDesktop" type="tel" required pattern="[0-9]{1,}" placeholder="Phone" value="${selectedContact.phone}">
                <div class="addContactButtonContainerDesktop">
                  <button class="cancelContactDesktopDeleteButton" onclick="deleteContact(${selectedContact.id})">Delete</button>
                  <button class="createContactButton" type="submit">Save</button>
                </div>
              </form>
            </div>
        </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Update function if already exist contact was edit
 * @param {string} contactId - This is the contact ID example "5"
 */
function updateContactDesktop(contactId) {
  const updatedInputs = getUpdatedInputsDesktop();
  if (validateInputs(updatedInputs)) {
      const existingContact = findExistingContactDesktop(updatedInputs, contactId);
      if (!existingContact) {
          const oldContact = findOldContactDesktop(contactId);
          const hasChanged = checkForChangesDesktop(oldContact, updatedInputs);
          const updatedContactsData = updateContactsDataDesktop(contactId, updatedInputs, hasChanged);
          saveAndInitDesktop(updatedContactsData);
      }
  }
}

/**
 * Get updated input data for desktop view
 */
function getUpdatedInputsDesktop() {
  const nameInput = document.querySelector(".addContactInputNameDesktop");
  const mailInput = document.querySelector(".addContactInputMailAddresssDesktop");
  const phoneInput = document.querySelector(".addContactInputPhoneDesktop");
  return {
      updatedName: nameInput.value.trim(),
      updatedMail: mailInput.value.trim(),
      updatedPhone: phoneInput.value.trim()
  };
}

/**
 * Get the contact to edit
 * @param {string} updatedInputs - Here are the new contact name / the new contact email / the new contact phone number
 * @param {string} contactId - This is the contact ID example "5"
 */
function findExistingContactDesktop(updatedInputs, contactId) {
  return currentUser.contacts.find(
      (contact) =>
          contact.name === updatedInputs.updatedName &&
          contact.email === updatedInputs.updatedMail &&
          contact.id !== contactId
  );
}