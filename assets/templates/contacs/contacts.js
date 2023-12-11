async function contactsInit() {
    try {
        contactsData = await fetchContactsData();
        renderContacts();
    } catch (error) {
        console.error("Fehler beim Initialisieren der Kontakte:", error);
    }
}

async function fetchContactsData() {
    try {
        const response = await fetch("../assets/templates/contacs/allContacts.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fehler beim Laden der Kontakte:", error);
        throw error; // Hier den Fehler erneut werfen, um ihn an contactsInit weiterzugeben
    }
}

function renderContacts() {
    const content = document.getElementById("contactsContentID");

    contactsData.forEach(oneContact => {
        const contactCard = document.createElement("div");
        contactCard.classList.add("contact-card");

        const nameElement = document.createElement("h2");
        nameElement.textContent = oneContact.contactName;

        const contactMailAddressElement = document.createElement("a");
        contactMailAddressElement.textContent = `${oneContact.contactMailAdress}`;

        contactCard.appendChild(nameElement);
        contactCard.appendChild(contactMailAddressElement);

        content.appendChild(contactCard);
    });
}
