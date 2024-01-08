// JavaScript Logik für die Mobile Ansicht
function contactsContentBackgroundColorWhiteGray() {
    const content = document.getElementById("contactsContent");
    content.style.backgroundColor = "var(--white-grey)";
  }
  
  function contactsContentBackgroundColorWhite() {
    const content = document.getElementById("contactsContent");
    content.style.backgroundColor = "white";
  }
  
  function hideHeaderAndFooter() {
    const mobileHeader = document.querySelector(".mobileHeader"); // Verstecke mobileHeader und menuTemplate
    const menuTemplate = document.querySelector(".menuTemplate");
    mobileHeader.style.display = "none";
    menuTemplate.style.display = "none";
  }
  
  function showHeaderAndFooter() {
    const mobileHeader = document.querySelector(".mobileHeader"); // Zeigt mobileHeader und menuTemplate
    const menuTemplate = document.querySelector(".menuTemplate");
    mobileHeader.style.display = "flex";
    menuTemplate.style.display = "flex";
  }

  function renderContacts() {  // Für die mobile Ansicht
    const content = document.getElementById("contactsContent");
    content.innerHTML = "";
    renderAddContactButtonDesktop();
    const contactsByFirstLetter = {};
    currentUser.contacts.forEach((oneContact) => {
      const firstLetter = oneContact.name.charAt(0).toUpperCase();
      updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact);
    });
    renderContactsByFirstLetter(content, contactsByFirstLetter);
  }

  function renderAddContactButton() {
    const content = document.getElementById("contactsContent");
    const addContactButtonContainer = document.createElement("div");
    addContactButtonContainer.classList.add("addContactButtonContainerMobile");  // Für die mobile Ansicht
    addContactButtonContainer.innerHTML =/*html*/ `
      <img src="../assets/img/contact/addContactButtonMobile.svg" class="addContactImage" onclick="handleAddContactClick()">`; // onclick-Funktion direkt im HTML-Code
    content.appendChild(addContactButtonContainer);  
  }
  
  function updateContactsByFirstLetter(contactsByFirstLetter, firstLetter, oneContact) {
    if (!contactsByFirstLetter[firstLetter]) {
      contactsByFirstLetter[firstLetter] = createLetterAndContactsContainer(firstLetter);
    }
    const oneContactContainer = createOneContactContainer(oneContact);
    contactsByFirstLetter[firstLetter] += oneContactContainer;
  }
  
  function createLetterAndContactsContainer(firstLetter) {
    return /*html*/ `
      <div class="letterAndContactsContainer">
        <div class="letter-column">
          <h2 class="contact-first-letter">${firstLetter}</h2>
        </div>
      </div>
    `;
  }
  
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
  
  function renderContactsByFirstLetter(content, contactsByFirstLetter) {
    Object.values(contactsByFirstLetter).forEach((section) => {
      content.innerHTML += section;
    });
  }

  function addContactScreen() {
    const content = document.getElementById("contactsContent");
    content.innerHTML = createAddContactScreenHTML();
    hideHeaderAndFooter();    
  }
  
  function createAddContactScreenHTML() {
    return /*html*/ addContactFormMobileHTML();
  }
  
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
          <input class="addContactInputNameMobile" type="text" required placeholder="Name">
          <input class="addContactInputMailAddresssMobile" type="text" required placeholder="E Mail">
          <input class="addContactInputPhoneMobile" type="text" required placeholder="Phone">
          <img class="createContactButtonImg" src="../assets/img/contact/createContactButton.svg" alt="" onclick="createContactMobile()">
        </div>
      </form>
    `;
  }
  
  function createContactMobile() {
    const { newName, newMail, newPhone } = constForCreateContactMobile();
    
    if (newName === "" || newMail === "" || newPhone === "") {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }
    
    const defaultImage = "../assets/img/contact/defaultContactImage.svg";
    let createdContact = new Contact(newName, newMail, newPhone, getRandomColorHex(), currentUser.name);
    currentUser.contacts.push(createdContact);
    currentUser.save();
    hideOverlay();
    contactsInit();  
  }
  
  function constForCreateContactMobile() {
    const nameInput = document.querySelector(".addContactInputNameMobile");
    const mailInput = document.querySelector(".addContactInputMailAddresssMobile");
    const phoneInput = document.querySelector(".addContactInputPhoneMobile");
    const newName = nameInput.value.trim();
    const newMail = mailInput.value.trim();
    const newPhone = phoneInput.value.trim();
    return { newName, newMail, newPhone };
  }

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
  
function findSelectedContact(contactId) {
  return currentUser.contacts.find(contact => contact.id === contactId);
}
  
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
        <!-- <img class="openContactUserImg" src="${selectedContact.contactImg}" alt=""> -->
        ${singleMemberToHTMLOpenContactMobile(selectedContact, 0)}
      </div>
      <form id="editcontactFormMobileID" onsubmit="updateContactMobile(${selectedContact.id})">
        <div class="addContactContainerFooter">
          <input class="addContactInputNameMobile" type="text" required placeholder="Name" value="${selectedContact.name}">
          <input class="addContactInputMailAddresssMobile" type="text" required placeholder="E Mail" value="${selectedContact.email}">
          <input class="addContactInputPhoneMobile" type="text" required placeholder="Phone" value="${selectedContact.phone}">
          <div>
            <img class="createContactButtonImg" src="../assets/img/contact/editContactDeleteButtonImg.svg" alt="" onclick="deleteContact(${selectedContact.id})">
            <img class="createContactButtonImg" src="../assets/img/contact/editContactSaveButtonImg.svg" alt="" onclick="updateContactMobile(${selectedContact.id})">
          </div>
        </div>
      </form>
    `;
  }
  
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
  
function validateInputs(updatedInputs) {
  if (Object.values(updatedInputs).some(value => value === "")) {
      alert("Bitte füllen Sie alle Felder aus.");
      return false;
  }
  return true;
}
  
function findExistingContact(updatedInputs, contactId) {
  return currentUser.contacts.find(
      (contact) =>
          contact.name === updatedInputs.updatedName &&
          contact.email === updatedInputs.updatedMail &&
          contact.id !== contactId
  );
}
  
function findOldContact(contactId) {
  return currentUser.contacts.find((contact) => contact.id === contactId);
}
  
function checkForChanges(oldContact, updatedInputs) {
  return {
      hasNameChanged: oldContact.name !== updatedInputs.updatedName,
      hasMailChanged: oldContact.email !== updatedInputs.updatedMail,
      hasPhoneChanged: oldContact.phone !== updatedInputs.updatedPhone
  };
}
  
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
  
function saveAndInit(updatedContactsData) {
  currentUser.contacts = updatedContactsData;
  currentUser.save();
  contactsInit();
}
  
function deleteContactMobile(contactId) {
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
  contactsInit();
}
  
function validateContactId(contactId) {
  if (!contactId) {
      console.error("Invalid contact ID");
      return false;
  }
  return true;
}
  
function findContactIndex(contactId) {
  return currentUser.contacts.findIndex((contact) => contact.id === contactId);
}
  
function removeContact(contactIndex) {
  return currentUser.contacts.splice(contactIndex, 1)[0];
}
  
function saveAndLogDeletedContact(deletedContact) {
  currentUser.save();
  console.log(`Kontakt "${deletedContact.name}" wurde erfolgreich gelöscht.`);
}
  
function handleDeleteError(error) {
  console.error("Fehler beim Löschen des Kontakts:", error);
}
  
  function openContactScreenMobile(contactId) {
    const content = document.getElementById("contactsContent");
    const selectedContact = findSelectedContact(contactId);
    if (!selectedContact) {
        handleContactNotFound();
        return;    }

    content.innerHTML = createContactScreenHTML(selectedContact);
    setupContactScreen(selectedContact.id);
}
  
function findSelectedContact(contactId) {
  return currentUser.contacts.find(contact => contact.id === contactId);
}
  
function handleContactNotFound() {
  console.error("Selected contact not found in currentUser.contacts.");
}
  
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
            <!-- <img class="openContactUserImg" src="${selectedContact.contactImg}" alt=""> -->
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
  
function setupContactScreen(contactId) {
  console.log(contactId);
  showHeaderAndFooter();
  contactsContentBackgroundColorWhiteGray();
  addDropdownMenuClickListener();
}

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