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
    contactsData.forEach((oneContact) => {
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
  const content = document.getElementById("contactsContentRightSideID");  // Holen Sie das Kontaktelement mit der ID "contactsContentRightSideID"  
  const selectedContact = contactsData.find(contact => contact.id === contactId);  // Holen Sie den ausgewählten Kontakt anhand der ID  
  openContactsScreenDesktopChangeColorBlack();  
  openContactScreenDesktopChangeColorWhite(contactId);  
  lastClickedContactId = contactId;  // Aktualisieren des zuletzt geklickten Kontakts
  openContactScreenDesktopHTML(content, selectedContact);  
  showHeaderAndFooter();
  showContactsContentRightSideDesktop();  
  const contactContainer = document.getElementById("contactsContentRightSideContactDataContainerID");  // Select the container to slide in  
  contactContainer.style.animation = "slide-in 0.5s ease-out";  // Apply the animation to the selected container
}
  
function openContactScreenDesktopChangeColorWhite(contactId) {
  const currentContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${contactId}"]`); // Änderung der Hintergrundfarbe des aktuellen Kontakts
  if (currentContactContainer) {
    currentContactContainer.style.backgroundColor = "#2A3647"; // Ersetzen Sie "#2A3647" durch die gewünschte Farbe    
    const currentContactH2 = currentContactContainer.querySelector("h2"); // Ändern Sie die Schriftfarbe des H2-Elements innerhalb des Containers
    if (currentContactH2) {
      currentContactH2.style.color = "white";
    }
  }
}

function openContactsScreenDesktopChangeColorBlack() {
  if (lastClickedContactId) { // Änderung der Hintergrundfarbe des zuletzt geklickten Kontakts (wenn vorhanden)    
    const lastClickedContactContainer = document.querySelector(`.oneContactContainer[data-contact-id="${lastClickedContactId}"]`); // Holen Sie das zugehörige Kontaktelement anhand der Kontakt-ID    
    if (lastClickedContactContainer) { // Überprüfen, ob das Element gefunden wurde, bevor Sie die Hintergrundfarbe ändern
      lastClickedContactContainer.style.backgroundColor = "transparent";
      const lastClickedContactH2 = lastClickedContactContainer.querySelector("h2"); // Ändern Sie die Schriftfarbe des H2-Elements innerhalb des Containers
      if (lastClickedContactH2) {
        lastClickedContactH2.style.color = "black";
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
            <form id="addContactShowOverlayDesktopID" onsubmit="createContact()">
              <div class="addContactContainerFooter">
                <input class="addContactInputNameDesktop" type="text" required placeholder="Name">
                <input class="addContactInputMailAddresssDesktop" type="text" required placeholder="E Mail">
                <input class="addContactInputPhoneDesktop" type="text" required placeholder="Phone">
                <div class="addContactButtonContainerDesktop">                
                  <button class="editContactDesktopDeleteButton" onclick="hideOverlay()">Cancel</button>
                  <button class="createContactButton" onclick="createContact()">Create contact</button>
                </div>
              </div>
            </form>
  
          </div>
        </div>
      </div>
    `; 
    
    overlayContainer.style.animation = "slide-in 0.5s ease-out";
  }
  
  function hideOverlay() {
    const overlayContainer = document.querySelector(".overlay-container");
    if (overlayContainer) {
      overlayContainer.parentNode.removeChild(overlayContainer);
    }
  }
  
  function editContactDestop(contactId) {  
    const selectedContact = contactsData.find(
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
            <img class="openContactUserImg" src="${selectedContact.contactImg}" alt="">          
          </div>
          <div class="addContactDesktopRightSideContent">
            <div class="addContactCloseXContainer">
              <button class="addContactCloseXButton" onclick="hideOverlay()">X</button>
            </div>
            <form id="editContactDestopID" onsubmit=" updateContactDesktop(${selectedContact.id})">
              <div class="addContactContainerFooter">
                  <input class="addContactInputNameDesktop" type="text" required placeholder="Name" value="${selectedContact.name}"> 
                  <input class="addContactInputMailAddresssDesktop" type="text" required placeholder="E Mail" value="${selectedContact.email}">
                  <input class="addContactInputPhoneDesktop" type="text" required placeholder="Phone" value="${selectedContact.phone}">
                  <div class="createContactButtonImgContainer">
                      <button class="editContactDesktopDeleteButton" onclick="deleteContact(${selectedContact.id})">Delete</button>
                      <button class="saveContactButtonDesktop" onclick=" updateContactDesktop(${selectedContact.id})">Save</button>
                  </div>                
              </div>
          </form>
          </div>
        </div>
      </div>
    `;
    overlayContainer.style.animation = "slide-in 0.5s ease-out";  
  }
  
  function updateContactDesktop(contactId) {
    const nameInput = document.querySelector(".addContactInputNameDesktop");
    const mailInput = document.querySelector(".addContactInputMailAddresssDesktop");
    const phoneInput = document.querySelector(".addContactInputPhoneDesktop");
    const updatedName = nameInput.value.trim();
    const updatedMail = mailInput.value.trim();
    const updatedPhone = phoneInput.value.trim();
    if (updatedName === "" || updatedMail === "" || updatedPhone === "") {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }
    const existingContact = contactsData.find(
      (contact) =>
        contact.name === updatedName &&
        contact.email === updatedMail &&
        contact.id !== contactId
    );
    if (existingContact) {
      alert("Ein Kontakt mit diesen Informationen existiert bereits.");
      return;
    }
    const oldContact = contactsData.find(
      (contact) => contact.id === contactId
    );  
    const hasNameChanged = oldContact.name !== updatedName;  // Überprüfe, ob es Änderungen am Kontakt gab
    const hasMailChanged = oldContact.email !== updatedMail;
    const hasPhoneChanged = oldContact.phone !== updatedPhone;
    const updatedContactsData = contactsData.map((contact) =>  // Aktualisiere den Kontakt im Array
      contact.id === contactId
        ? {
            ...contact,
            name: hasNameChanged ? updatedName : contact.name,
            email: hasMailChanged ? updatedMail : contact.email,
            phone: hasPhoneChanged ? updatedPhone : contact.phone,
          }
        : contact
    );
    saveContactsData(updatedContactsData); // JSON-Array speichern
    contactsInit(); // Zurück zur Kontaktliste wechseln
  }
  
  function deleteContact(contactId) {
    if (!contactId) {
      console.error("Invalid contact ID");
      return;
    }
    const confirmDelete = confirm("Möchten Sie diesen Kontakt wirklich löschen?");
    if (!confirmDelete) {
      return;
    }
    try {
      const contactIndex = contactsData.findIndex((contact) => contact.id === contactId);
  
      if (contactIndex === -1) {
        console.error("Selected contact not found in contactsData.");
        return;
      }
      const deletedContact = contactsData.splice(contactIndex, 1)[0];
      saveContactsData(contactsData);
      console.log(`Kontakt "${deletedContact.name}" wurde erfolgreich gelöscht.`);
    } catch (error) {
      console.error("Fehler beim Löschen des Kontakts:", error);
    }
    const content = document.getElementById("contactsContentRightSideContactDataContainerID");
    content.innerHTML = "";
    contactsInit();  
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