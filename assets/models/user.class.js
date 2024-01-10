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

  loadFromJSON(obj) {
    this.name = obj.name,
    this.email = obj.email,
    this.password = obj.password,
    this.colorCode = obj.colorCode,
    this.contacts = obj.contacts,
    this.tasks = obj.tasks
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
    let u = currentUser;
    let cu = users.findIndex((a) => a.email == u.email);
    console.log(cu);
    editUser(cu, u.toJSON());
    await setItem("users", users);
  }

  toJSON() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      colorCode: this.colorCode,
      contacts: this.contacts,
      tasks: this.tasks
    }
  }
}
