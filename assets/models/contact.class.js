
class Contact {

    name;
    colorCode;
    email; 
    phone;
    from;

    constructor(name, email, phone, colorCode, from) {
        this.name = name;
        this.colorCode = colorCode;
        this.email = email;
        this.phone = phone;
        this.from = from;
    }

    createNameImage(appendTo) {
        let div = document.createElement("div").classList.add("profile-container");
        let firstLetter = this.name.split(" ")[0][0];
        let lastLetter = this.name.split(" ")[1][0];

        let span = document.createElement("span");
        span.innerHTML = `${firstLetter} ${lastLetter}`

        div.appendChild(span)

        appendTo.appendChild(div);
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