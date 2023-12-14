class User {
    name;
    email;
    password;
    colorCode;
    contacts;

    constructor(name, email, password, colorCode) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.colorCode = colorCode;
        this.contacts = [];
    }

    addContact() {
        //Warte auf Martin
    }

    removeContact(index) {
        this.contacts.splice(index, 1)
    }
}