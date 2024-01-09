// JavaScript Logik für die Desktop Ansicht

function showContactsContentRightSideDesktop() {
    const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
    showcontactsContentRightSide.style.display = "flex";
  }
  
function hidecontactsContentRightSideDesktop() {
  const showcontactsContentRightSide = document.getElementById("contactsContentRightSideID");
  showcontactsContentRightSide.style.display = "none";
} 

function renderContactsDesktop() {
  const content = document.getElementById("contactsContent");
  content.innerHTML = "";
  renderAddContactButtonDesktop();  // Add contact button desktop
  const contactsByFirstLetter = groupContactsByFirstLetter();
  renderContactsByFirstLetter(content, contactsByFirstLetter);
}

function groupContactsByFirstLetter() {
    const contactsByFirstLetter = {};
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

function createLetterContainer(firstLetter) {
    return /*html*/ `
        <div class="letterAndContactsContainer">
            <div class="letter-column">
                <h2 class="contact-first-letter">${firstLetter}</h2>
            </div>
        </div>
    `;
}

function createContactContainer(oneContact) {
    return /*html*/ `
        <div class="oneContactContainer" id="contact-${oneContact.id}" onclick="openContactScreenDesktop(${oneContact.id})" data-contact-id="${oneContact.id}">
            <div>
                <!-- <img src="${oneContact.contactImg}" class="contactImg"> -->
                ${singleMemberToHTML(oneContact, 0)}
            </div>
            <div class="contact-info-container">
                <h2 class="oneContactContainerH2Desktop">${oneContact.name}</h2>
                <a class="oneContactContainerAElement">${oneContact.email}</a>
            </div>
        </div>
    `;
}

function renderContactsByFirstLetter(content, contactsByFirstLetter) {
    Object.values(contactsByFirstLetter).forEach((section) => {
        content.innerHTML += section;
    });
}

function renderAddContactButtonDesktop() {
  const contentDesktop = document.getElementById("contactsContent");
  const addContactButtonContainerDesktop = document.createElement("div");
  addContactButtonContainerDesktop.classList.add("addContactButtonContainerDesktop");  // Für die desktop Ansicht
  addContactButtonContainerDesktop.innerHTML = /*html*/ `
    <button class="addContactButtonDesktop" onclick="addContactShowOverlayDesktop()">Add new contact</button>`;
  contentDesktop.appendChild(addContactButtonContainerDesktop);  
  addContactButtonContainerDesktop.addEventListener("click", function () {  // Fügt einen Event-Listener hinzu, um das Overlay zu zeigen    
  });
}
  
function openContactScreenDesktop(contactId) {  
  const content = document.getElementById("contactsContentRightSideID");
  const selectedContact = currentUser.contacts.find(contact => contact.id === contactId); 
  if (lastClickedContactId !== contactId) {  // Überprüfen Sie, ob der Kontakt tatsächlich geändert wurde
    openContactsScreenDesktopChangeColorWhite(lastClickedContactId); // Ändern Sie die Hintergrundfarbe des vorherigen Kontakts auf Weiß
    lastClickedContactId = contactId;
    openContactsScreenDesktopChangeColorBlack(contactId); // Ändern Sie die Hintergrundfarbe des aktuellen Kontakts auf Grau
  }
  openContactScreenDesktopHTML(content, selectedContact);
  showHeaderAndFooter();
  showContactsContentRightSideDesktop();  
  const contactContainer = document.getElementById("contactsContentRightSideContactDataContainerID");
  contactContainer.style.animation = "slide-in 0.5s ease-out";
}
  
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

function openContactsScreenDesktopChangeColorBlack(contactId) {
  if (contactId) { // Überprüfen Sie, ob eine Kontakt-ID vorhanden ist
    const currentContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${contactId}"]`);
    if (currentContactContainer) {
      currentContactContainer.style.backgroundColor = "#2A3647"; // Ändern Sie "#2A3647" durch die gewünschte Farbe    
      const currentContactH2 = currentContactContainer.querySelector("h2");
      if (currentContactH2) {
        currentContactH2.style.color = "white";
      }
    }
  }
}

function openContactScreenDesktopHTML(content, selectedContact) {
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
        <!-- <img class="openContactUserImg" src="${selectedContact.contactImg}" alt=""> -->        
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

function addContactShowOverlayDesktop() {
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-container");
  document.body.appendChild(overlayContainer);
  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay-content");
  overlayContainer.appendChild(overlayContent);
  // Füge das Overlay-Inhaltselement hinzu
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
    overlayContainer.style.animation = "slide-in 0.5s ease-out";
  }

  function createContactDesktop() {
    const { newName, newMail, newPhone } = constForCreateContactDesktop();    
    if (newName === "" || newMail === "" || newPhone === "") {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }    
    const defaultImage = "../assets/img/contact/defaultContactImage.svg";
    let createdContact = new Contact(newName, newMail, newPhone, getRandomColorHex(), currentUser.name, currentUser.contacts.length + 1);
    currentUser.contacts.push(createdContact);
    currentUser.save();
    hideOverlay();
    contactsInit(); 
}
  
function constForCreateContactDesktop() {
  const nameInput = document.querySelector(".addContactInputNameDesktop");
  const mailInput = document.querySelector(".addContactInputMailAddresssDesktop");
  const phoneInput = document.querySelector(".addContactInputPhoneDesktop");
  const newName = nameInput.value.trim();
  const newMail = mailInput.value.trim();
  const newPhone = phoneInput.value.trim();
  return { newName, newMail, newPhone };
}
  
function hideOverlay() {
  const overlayContainer = document.querySelector(".overlay-container");
  if (overlayContainer) {
    overlayContainer.parentNode.removeChild(overlayContainer);
  }
}
  
function editContactDestop(contactId) {  
  const selectedContact = currentUser.contacts.find(
    (contact) => contact.id === contactId
  ); // Findet den ausgewählten Kontakt anhand der ID
  const overlayContainer = document.createElement("div");
  overlayContainer.classList.add("overlay-container");
  document.body.appendChild(overlayContainer);
  const overlayContent = document.createElement("div");
  overlayContent.classList.add("overlay-content");
  overlayContainer.appendChild(overlayContent);  
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
                <input class="addContactInputNameDesktop" type="text" required placeholder="Name" value="${selectedContact.name}"> 
                <input class="addContactInputMailAddresssDesktop" type="text" required placeholder="E Mail" value="${selectedContact.email}">
                <input class="addContactInputPhoneDesktop" type="text" required placeholder="Phone" value="${selectedContact.phone}">
                <div class="createContactButtonImgContainer">
                    <button class="editContactDesktopDeleteButton" onclick="deleteContact(${selectedContact.id})">Delete</button>
                    <button class="saveContactButtonDesktop" onclick="updateContactDesktop(${selectedContact.id})">Save</button>
                </div>                
            </div>
        </div>
        </div>
      </div>
    </div>
  `;
  overlayContainer.style.animation = "slide-in 0.5s ease-out";  
}
  
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

function findExistingContactDesktop(updatedInputs, contactId) {
  return currentUser.contacts.find(
      (contact) =>
          contact.name === updatedInputs.updatedName &&
          contact.email === updatedInputs.updatedMail &&
          contact.id !== contactId
  );
}

function findOldContactDesktop(contactId) {
  return currentUser.contacts.find((contact) => contact.id === contactId);
}

function checkForChangesDesktop(oldContact, updatedInputs) {
  return {
      hasNameChanged: oldContact.name !== updatedInputs.updatedName,
      hasMailChanged: oldContact.email !== updatedInputs.updatedMail,
      hasPhoneChanged: oldContact.phone !== updatedInputs.updatedPhone
  };
}

function updateContactsDataDesktop(contactId, updatedInputs, hasChanged) {
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

function saveAndInitDesktop(updatedContactsData) {
  currentUser.contacts = updatedContactsData;
  currentUser.save();
  contactsInit();
  hideOverlay();
}

// Drop down Menü
function addDropdownMenuClickListener() {
  const dropdownTrigger = document.getElementById("menuContactOptionsButton");
  const dropdownMenu = document.getElementById("contactOptionsDropdown");
  if (!dropdownTrigger || !dropdownMenu) {
    console.error("Dropdown trigger or menu not found");
    return;
  }
  const handleDocumentClick = function (event) {
    if (!dropdownTrigger.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
      document.removeEventListener("click", handleDocumentClick);
    }
  };
  dropdownTrigger.addEventListener("click", function (event) {
    const isDropdownVisible = (dropdownMenu.style.display === "block");    
    if (!isDropdownVisible) {  // Schließe alle anderen geöffneten Dropdowns, wenn das aktuelle geöffnet wird
      closeAllDropdowns();
    }
    dropdownMenu.style.display = isDropdownVisible ? "none" : "block";
    if (!isDropdownVisible) {
      document.addEventListener("click", handleDocumentClick);
    }
    event.stopPropagation();
  });
}
  
function closeAllDropdowns() {
  const allDropdowns = document.querySelectorAll(".dropdown-menu");
  allDropdowns.forEach((dropdown) => {
    dropdown.style.display = "none";
  });
  document.removeEventListener("click", handleDocumentClick);
}
  
function handleDocumentClick(dropdownContainer, addContactButtonContainerMobile, handleDocumentClick) {
  return function (event) {
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    if (!dropdownContainer.contains(event.target) &&
      !addContactButtonContainerMobile.contains(event.target) &&
      !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = "none";
      document.removeEventListener("click", handleDocumentClick);
    }
  };
}
  
function toggleDropdownMenu() {
  const dropdownMenu = document.getElementById("contactOptionsDropdown");
  dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
}
  
function handleDropdownOptionClick(action) {  // Hier die Logik für die ausgewählte Aktion (Edit oder Delete) implementieren  
  if (action === "edit") {  // Edit Contact    
    console.log("Edit Contact selected");  
  } else if (action === "delete") {  // Delete    
    console.log("Delete Contact selected");
  }  
  const dropdownMenu = document.getElementById("contactOptionsDropdown");  // Schließt das Dropdown-Menü nach der Auswahl
  dropdownMenu.style.display = "none";
}