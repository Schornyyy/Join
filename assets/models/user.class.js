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

  removeContact(index) {
    this.contacts.splice(index, 1);
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
  }

  async save() {
    let s = await setItem("users", users);
    console.log(s, users);
  }
}
