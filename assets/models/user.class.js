class User {
    name;
    email;
    password;
    colorCode;
    contacts;
    tasks;

    constructor(name, email, password, colorCode) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.colorCode = colorCode;
        this.contacts = [];
        this.tasks = [];
    }

    addContact() {
        //Warte auf Martin
    }

    removeContact(index) {
        this.contacts.splice(index, 1)
    }

    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(index) {
        this.tasks.splice(index, 1)
    }
}