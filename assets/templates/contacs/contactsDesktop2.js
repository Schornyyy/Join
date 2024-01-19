/**
 * Find the contact by ID
 * @param {string} contactId
 */
function findOldContactDesktop(contactId) {
    return currentUser.contacts.find((contact) => contact.id === contactId);
  }
  
  /**
   * Check if contact data changed
   * @param {string} oldContact
   * @param {string} updatedInputs
   */
  function checkForChangesDesktop(oldContact, updatedInputs) {
    return {
        hasNameChanged: oldContact.name !== updatedInputs.updatedName,
        hasMailChanged: oldContact.email !== updatedInputs.updatedMail,
        hasPhoneChanged: oldContact.phone !== updatedInputs.updatedPhone
    };
  }
  
  /**
   * Overwrite the old contact data with the new contact data
   * @param {string} contactId
   * @param {string} updatedInputs
   * @param {string} hasChanged
   */
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
  
  /**
   * Save the edit contact at the current user
   * @param {string} updatedContactsData 
   */
  function saveAndInitDesktop(updatedContactsData) {
    currentUser.contacts = updatedContactsData;
    currentUser.save();
    clearAddContactDesktopRightSideContainer();
    contactsInit();
    hideOverlay();
  }
  
  /**
   * Drop down menu click event listener
   */
  function addDropdownMenuClickListener() {
    const dropdownTrigger = document.getElementById("menuContactOptionsButton");
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    if (!dropdownTrigger || !dropdownMenu) {
      console.error("Dropdown trigger or menu not found");
      return;
    }
  /**
   * Drop down menu click event listener
   * @param {string} event
   */
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
  
  /**
   * Close all other drop down menus
   */
  function closeAllDropdowns() {
    const allDropdowns = document.querySelectorAll(".dropdown-menu");
    allDropdowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });
    document.removeEventListener("click", handleDocumentClick);
  }
  
  /**
   * Close all other drop down menus
   * @param {string} dropdownContainer
   * @param {string} addContactButtonContainerMobile
   * @param {string} handleDocumentClick
   */
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
  
  /**
   * Controll if the drop down menu are close or open
   */
  function toggleDropdownMenu() {
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
  }
  
  /**
   * Handle drop down menu option clicked
   * @param {string} action
   */
  function handleDropdownOptionClick(action) {
    if (action === "edit") {
      console.log("Edit Contact selected");  
    } else if (action === "delete") {
      console.log("Delete Contact selected");
    }  
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    dropdownMenu.style.display = "none";
  }