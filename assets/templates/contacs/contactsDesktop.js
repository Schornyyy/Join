// JavaScript Logic for Desktop view
function showContactsContentRightSideDesktop() {  // Show contacts content right side only for desktop view
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "flex";
}
// ---------------------------------------------------------------------------------------------------------------
function renderContactsDesktop() {  // Render function for contacts desktop view
  const content = document.getElementById("contactsContent");
  content.innerHTML = "";
  renderAddContactButtonDesktop();  // Add contact button desktop
  const contactsByFirstLetter = groupContactsByFirstLetter();  // Sorted the contacts by first letter
  renderContactsByFirstLetter(content, contactsByFirstLetter);  // Render function for sorted contacts by first letter
}

function groupContactsByFirstLetter() { // Create letter div container for sorted contacts by first letter
    const contactsByFirstLetter = {};
    currentUser.contacts.forEach((oneContact) => {  // For each contact sorted by first letter
        const firstLetter = oneContact.name.charAt(0).toUpperCase();
        if (!contactsByFirstLetter[firstLetter]) {
            contactsByFirstLetter[firstLetter] = createLetterContainer(firstLetter);  // Create div container for each contact with first letter sorted
        }
        const oneContactContainer = createContactContainer(oneContact);  // Create div container for each contact
        contactsByFirstLetter[firstLetter] += oneContactContainer;  // Add the contact to the right first letter section
    });
    return contactsByFirstLetter;
}

function createLetterContainer(firstLetter) {  // Generate HTML for the letters
    return /*html*/ `
        <div class="letterAndContactsContainer">
            <div class="letter-column">
                <h2 class="contact-first-letter">${firstLetter}</h2>
            </div>
        </div>
    `;
}

function createContactContainer(oneContact) {  // Generate HTML for each contact
    return /*html*/ `
        <div class="oneContactContainer" id="contact-${oneContact.id}" onclick="openContactScreenDesktop(${oneContact.id})" data-contact-id="${oneContact.id}">
            <div>                
                ${singleMemberToHTML(oneContact, 0)}  <!-- Create the user image with color code -->
            </div>
            <div class="contact-info-container">
                <h2 class="oneContactContainerH2Desktop">${oneContact.name}</h2>
                <a class="oneContactContainerAElement">${oneContact.email}</a>
            </div>
        </div>
    `;
}

function renderContactsByFirstLetter(content, contactsByFirstLetter) {  // Add each contact to the section on desktop view
    Object.values(contactsByFirstLetter).forEach((section) => {
        content.innerHTML += section;
    });
}
// -----------------------------------------------------------------------------------------------
function renderAddContactButtonDesktop() {  // Create add contact button for desktop view
  const contentDesktop = document.getElementById("contactsContent");
  const addContactButtonContainerDesktop = document.createElement("div");
  addContactButtonContainerDesktop.classList.add("addContactButtonContainerDesktop");  // Only for desktop view
  addContactButtonContainerDesktop.innerHTML = /*html*/ `
    <button class="addContactButtonDesktop" onclick="addContactShowOverlayDesktop()">Add new contact
      <span><img class="addContactButtonDesktopImg" src="../assets/img/contact/addNewContactDesktopButtonImg.svg" alt=""></span></button>    
    `;    
  contentDesktop.appendChild(addContactButtonContainerDesktop);  
  addContactButtonContainerDesktop.addEventListener("click", function () {  // Add renderAddContactButtonDesktop to Event-Listener to show Overlay on desktop view    
  });
}
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
function openContactScreenDesktop(contactId) {  // Show clicked contact details for desktop view
  const content = document.getElementById("contactsContentRightSideID");
  const selectedContact = currentUser.contacts.find(contact => contact.id === contactId);  // Find the clicked contactID
  if (lastClickedContactId !== contactId) {  // Check if contactId is not the same as lastClickedContactId for background-color change on click on contact
    openContactsScreenDesktopChangeColorWhite(lastClickedContactId); // Change background color to white if contact is not klicked
    lastClickedContactId = contactId;
    openContactsScreenDesktopChangeColorBlack(contactId); // Change background color to grey/black if contact is klicked
  }
  openContactScreenDesktopHTML(content, selectedContact);  // Generate HTML for clicked contact on dekstop view
  showHeaderAndFooter();  // Show header and footer on desktop view
  showContactsContentRightSideDesktop();  // Show contacts content right side desktop on desktop view
  const contactContainer = document.getElementById("contactsContentRightSideContactDataContainerID");
  contactContainer.style.animation = "slide-in 0.5s ease-out";  // Slide in animation from right side to the middle on desktop view
}
  
function openContactsScreenDesktopChangeColorWhite(contactId) {  // If contact is not clicked set background-color to white and set text color to black
  const lastClickedContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${contactId}"]`);
  if (lastClickedContactContainer) {
    lastClickedContactContainer.style.backgroundColor = "white";  // Set background-color to white
    const lastClickedContactH2 = lastClickedContactContainer.querySelector("h2");
    if (lastClickedContactH2) {
      lastClickedContactH2.style.color = "black";  // Set text color to black
    }
  }
}

function openContactsScreenDesktopChangeColorBlack(contactId) {  // If contact is clicked set background-color to grey/black and set text color to white
  if (contactId) { // Check if contactId exist
    const currentContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${contactId}"]`);
    if (currentContactContainer) {
      currentContactContainer.style.backgroundColor = "#2A3647"; // Set background-color to grey/black
      const currentContactH2 = currentContactContainer.querySelector("h2");
      if (currentContactH2) {
        currentContactH2.style.color = "white";  // Set text color to white
      }
    }
  }
}

function openContactScreenDesktopHTML(content, selectedContact) {  // Generate HTML for clicked contact details
  content.innerHTML = /*html*/ `
    <div class="contactsContentRightSideHeadLine">
        <h1 class="contactsContentRightSideH1">
          Contacts
        </h1>
        <img src="../../assets/img/contact/contactsContentRightSideBlueStripe.svg" alt="">        
        <p class="contactsContentRightSideHeadLinePElement">Better with a team</p>
    </div>  
    <div id="contactsContentRightSideContactDataContainerID">
      <div class="contactsContentRightSideUserImgAndNameContainer">
        ${singleMemberToHTMLOpenContactDesktop(selectedContact, 0)}  <!-- Create user image with random background-color -->
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
// -----------------------------------------------------------------------------------------------------------------------
function addContactShowOverlayDesktop() {  // Show overlay for add contact at desktop view
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-container");
  document.body.appendChild(overlayContainer);
  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay-content");
  overlayContainer.appendChild(overlayContent);  // Add overlay-element  
  generateHTMLAddContactShowOverlayDesktop(overlayContent);    
    overlayContainer.style.animation = "slide-in 0.5s ease-out";  // Slide in animation for add contact show overlay desktop
  }

function generateHTMLAddContactShowOverlayDesktop(overlayContent) {  // Generate HTML for add contact show overlay desktop
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
        <div class="addContactBlankUserImgContainer">
          <img class="addContactBlankUserImg" src="../../assets/img/contact/addContactBlankUserImg.svg" alt="">
        </div>
        <div class="addContactDesktopRightSideContent">
          <div class="addContactCloseXContainer">
           <button class="addContactCloseXButton" onclick="hideOverlay()">X</button>
          </div>
          <form id="addContactShowOverlayDesktopID" onsubmit="createContactDesktop()">
            <div class="addContactContainerFooter">
              <input class="addContactInputNameDesktop" type="text" required placeholder="Name">
              <input class="addContactInputMailAddresssDesktop" type="text" required placeholder="E Mail">
              <input class="addContactInputPhoneDesktop" type="text" required placeholder="Phone">
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
//---------------------------------------------------------------------------------------------------------------------------------------------
  function createContactDesktop() {  // Create function for new contact person
    const { newName, newMail, newPhone } = constForCreateContactDesktop();  // Const for create contact desktop  
    if (newName === "" || newMail === "" || newPhone === "") {  // Check if all inputs are not empty
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }    
    const defaultImage = "../assets/img/contact/defaultContactImage.svg"; // Const for blanc user image (grey user image icon)
    let createdContact = new Contact(newName, newMail, newPhone, getRandomColorHex(), currentUser.name, currentUser.contacts.length + 1);  // Create new contact with parameters
    currentUser.contacts.push(createdContact);  // create new contact
    currentUser.save();  // Save new contact for currentUser
    hideOverlay();  // If contact added ... hide the overlay screen
    contactsInit();  // Back to contacts start to show the new contact
}

function constForCreateContactDesktop() {  // Const for create contact desktop view
  const nameInput = document.querySelector(".addContactInputNameDesktop");  // Get contact name input data on desktop view
  const mailInput = document.querySelector(".addContactInputMailAddresssDesktop");  // Get contact mail address input data on desktop view
  const phoneInput = document.querySelector(".addContactInputPhoneDesktop");  // Get contact phone number input data on desktop view
  const newName = nameInput.value.trim();  // Remove free spaces
  const newMail = mailInput.value.trim();  // Remove free spaces
  const newPhone = phoneInput.value.trim();  // Remove free spaces
  return { newName, newMail, newPhone };
}
  
function hideOverlay() {  // Function to hide the overlay screen on desktop view
  const overlayContainer = document.querySelector(".overlay-container");
  if (overlayContainer) {
    overlayContainer.parentNode.removeChild(overlayContainer);
  }
}
//----------------------------------------------------------------------------------------------------------------------------------------

function editContactDestop(contactId) {  // Edit contact desktop Screen for desktop view
  const selectedContact = currentUser.contacts.find(
    (contact) => contact.id === contactId
  ); // Find clicked contact ID
  const overlayContainer = document.createElement("div");  // Create div container overlay
  overlayContainer.classList.add("overlay-container");  // Add div container class overlay-container
  document.body.appendChild(overlayContainer);  // Append the overlay container to the body
  const overlayContent = document.createElement("div");  // Create div container for overlay content
  overlayContent.classList.add("overlay-content");  // Add div container class overlay-content
  overlayContainer.appendChild(overlayContent);  // Append the overlay-content container to the overlayContainer
  generateHTMLEditContactDesktop(overlayContent, selectedContact);
  overlayContainer.style.animation = "slide-in 0.5s ease-out";  // Slide in animation for overlayContainer
}
  
function generateHTMLEditContactDesktop(overlayContent, selectedContact) {  // Generate HTML for editContactDestop
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
          ${singleMemberToHTMLOpenContactMobile(selectedContact, 0)}  <!-- Create user image with random background-color -->     
        </div>
        <div class="addContactDesktopRightSideContent">
          <div class="addContactCloseXContainer">
            <button class="addContactCloseXButton" onclick="hideOverlay()">X</button>  <!-- Create X button to close the overlay -->
          </div>
          <div id="editContactDestopID">
            <div class="addContactContainerFooter">
                <input class="addContactInputNameDesktop" type="text" required placeholder="Name" value="${selectedContact.name}"> 
                <input class="addContactInputMailAddresssDesktop" type="text" required placeholder="E Mail" value="${selectedContact.email}">
                <input class="addContactInputPhoneDesktop" type="text" required placeholder="Phone" value="${selectedContact.phone}">
                <div class="createContactButtonImgContainer">
                    <button class="editContactDesktopDeleteButton" onclick="deleteContact(${selectedContact.id})">Delete</button>  <!-- Create delete button for edit contact desktop-->   
                    <button class="saveContactButtonDesktop" onclick="updateContactDesktop(${selectedContact.id})">Save</button>  <!-- Create save button for edit contact desktop-->
                </div>                
            </div>
        </div>
        </div>
      </div>
    </div>
  `;
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------
function updateContactDesktop(contactId) {  // Update function if already exist contact was edit
  const updatedInputs = getUpdatedInputsDesktop();  // Get updated input data for desktop view 
  if (validateInputs(updatedInputs)) {  // Check if contact data changed
      const existingContact = findExistingContactDesktop(updatedInputs, contactId);  // Get the contact to edit
      if (!existingContact) {
          const oldContact = findOldContactDesktop(contactId);  // Find the contact by ID
          const hasChanged = checkForChangesDesktop(oldContact, updatedInputs);  // Check if contact data changed
          const updatedContactsData = updateContactsDataDesktop(contactId, updatedInputs, hasChanged);  // Overwrite the old contact data with the new contact data
          saveAndInitDesktop(updatedContactsData);  // Save the edit contact
      }
  }
}

function getUpdatedInputsDesktop() {  // Get updated input data for desktop view
  const nameInput = document.querySelector(".addContactInputNameDesktop");
  const mailInput = document.querySelector(".addContactInputMailAddresssDesktop");
  const phoneInput = document.querySelector(".addContactInputPhoneDesktop");
  return {
      updatedName: nameInput.value.trim(),  // Remove free spaces
      updatedMail: mailInput.value.trim(),  // Remove free spaces
      updatedPhone: phoneInput.value.trim()  // Remove free spaces
  };
}

function findExistingContactDesktop(updatedInputs, contactId) {  // Get the contact to edit
  return currentUser.contacts.find(
      (contact) =>
          contact.name === updatedInputs.updatedName &&
          contact.email === updatedInputs.updatedMail &&
          contact.id !== contactId
  );
}

function findOldContactDesktop(contactId) {  // Find the contact by ID
  return currentUser.contacts.find((contact) => contact.id === contactId);
}

function checkForChangesDesktop(oldContact, updatedInputs) {  // Check if contact data changed
  return {
      hasNameChanged: oldContact.name !== updatedInputs.updatedName,
      hasMailChanged: oldContact.email !== updatedInputs.updatedMail,
      hasPhoneChanged: oldContact.phone !== updatedInputs.updatedPhone
  };
}

function updateContactsDataDesktop(contactId, updatedInputs, hasChanged) {  // Overwrite the old contact data with the new contact data
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

function saveAndInitDesktop(updatedContactsData) {  // Save the edit contact at the current user
  currentUser.contacts = updatedContactsData;
  currentUser.save();
  contactsInit();  // After contact saved back to contacts to show the new contact
  hideOverlay();  // Hide overlay for edit contact
}
//-------------------------------------------------------------------------------------------------------------------------------------------
function addDropdownMenuClickListener() {  // Drop down menu click event listener
  const dropdownTrigger = document.getElementById("menuContactOptionsButton");
  const dropdownMenu = document.getElementById("contactOptionsDropdown");
  if (!dropdownTrigger || !dropdownMenu) {  // Check if drop down menu exist
    console.error("Dropdown trigger or menu not found");
    return;
  }
  const handleDocumentClick = function (event) {  // Check if drop down menu clicked if not close it
    if (!dropdownTrigger.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
      document.removeEventListener("click", handleDocumentClick);
    }
  };
  dropdownTrigger.addEventListener("click", function (event) {  // Check if drop down menu clicked than show drop down menu options
    const isDropdownVisible = (dropdownMenu.style.display === "block");    
    if (!isDropdownVisible) {  // If drop down menu visible
      closeAllDropdowns();  // Close all other drop down menus
    }
    dropdownMenu.style.display = isDropdownVisible ? "none" : "block";  // If drop down menu visible than add to event listener
    if (!isDropdownVisible) {
      document.addEventListener("click", handleDocumentClick);
    }
    event.stopPropagation();  // Stopp all other click events from parent element
  });
}
  
function closeAllDropdowns() {  // Close all other drop down menus
  const allDropdowns = document.querySelectorAll(".dropdown-menu");
  allDropdowns.forEach((dropdown) => {
    dropdown.style.display = "none";
  });
  document.removeEventListener("click", handleDocumentClick);
}
  
function handleDocumentClick(dropdownContainer, addContactButtonContainerMobile, handleDocumentClick) {  // Handle click on drop down mneu option
  return function (event) {
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    if (!dropdownContainer.contains(event.target) &&
      !addContactButtonContainerMobile.contains(event.target) &&
      !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
      document.removeEventListener("click", handleDocumentClick);  // Remove the eventlistener because one option is clicked
    }
  };
}
  
function toggleDropdownMenu() {  // Controll if the drop down menu are close or open
  const dropdownMenu = document.getElementById("contactOptionsDropdown");
  dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
}
  
function handleDropdownOptionClick(action) {  // Handle drop down menu option clicked 
  if (action === "edit") {  // If edit contact clicked
    console.log("Edit Contact selected");  
  } else if (action === "delete") {  // If delete contact clicked    
    console.log("Delete Contact selected");
  }  
  const dropdownMenu = document.getElementById("contactOptionsDropdown");  // Close the dropdown menu after clicked one option
  dropdownMenu.style.display = "none";
}