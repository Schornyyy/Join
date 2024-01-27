/**
 * Find the contact by ID
 * @param {string} contactId - This is the contact ID example "5"
 */
function findOldContactDesktop(contactId) {
    return currentUser.contacts.find((contact) => contact.id === contactId);
  }
  
  /**
   * Check if contact data changed
   * @param {string} oldContact - This are the old contact name / emal / phone number
   * @param {string} updatedInputs - This are the new contact / email / phone number
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
   * @param {string} contactId - This is the contact ID example "5"
   * @param {string} updatedInputs - This are the new contact / email / phone number
   * @param {boolean} hasChanged - Example {hasNameChanged: false, hasMailChanged: false, hasPhoneChanged: true}
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
   * @param {string} updatedContactsData - Includes the updated contacts data name / email / phone number
   */
  function saveAndInitDesktop(updatedContactsData) {
    currentUser.contacts = updatedContactsData;
    currentUser.save();
    clearAddContactDesktopRightSideContainer();
    hideOverlay();
    contactsInit();    
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
   * @param {string} event - Add the drop down menu to the event listener
   */
    const handleDocumentClick = function (event) {
      if (!dropdownTrigger.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
        document.removeEventListener("click", handleDocumentClick);
      }
    };
    dropdownTrigger.addEventListener("click", function (event) {
      const isDropdownVisible = (dropdownMenu.style.display === "block");    
      if (!isDropdownVisible) { 
        closeAllDropdowns();
      }
      dropdownMenu.style.display = isDropdownVisible ? "none" : "block";
      if (!isDropdownVisible) {
        document.addEventListener("click", handleDocumentClick);
      }
      event.stopPropagation();
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
   * Handle click on drop down menu option
   * @param {string} dropdownContainer - Drop down div Container
   * @param {string} addContactButtonContainerMobile - Render the contact button container mobile
   * @param {string} handleDocumentClick - Remove or add the event listener for the drop down menu
   */
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
  
  /**
   * Controll if the drop down menu are close or open
   */
  function toggleDropdownMenu() {
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
  }
  
  /**
   * Handle drop down menu option clicked
   * @param {string} action - Edit or delete click from user
   */
  function handleDropdownOptionClick(action) {
    if (action === "edit") {       
    } else if (action === "delete") {      
    }  
    const dropdownMenu = document.getElementById("contactOptionsDropdown");
    dropdownMenu.style.display = "none";
  }