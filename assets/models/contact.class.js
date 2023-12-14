
class Contact {

    name;
    colorCode;
    email; 
    phone;

    constructor(name, email, phone, colorCode) {
        this.name = name;
        this.colorCode = colorCode;
        this.email = email;
        this.phone = phone;
    }

}

// let firstletter= [];

// function getFirstletterOfContacts() {
//     contacts.forEach(contact => {
//         if(!firstletter.includes(contact.name[0])) {
//             firstletter.push(contact.name[0])
//         }
//     })
// }