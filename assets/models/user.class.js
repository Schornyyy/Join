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

  /**
   * Loads a user from a JSON object.
   * @param {JSON Object} obj
   */
  loadFromJSON(obj) {
    (this.name = obj.name),
      (this.email = obj.email),
      (this.password = obj.password),
      (this.colorCode = obj.colorCode),
      (this.contacts = obj.contacts),
      (this.tasks = obj.tasks);
  }

  /**
   * Save the current user to prepare it for the backend.
   */
  async save() {
    let u = currentUser;
    let cu = users.findIndex((a) => a.email == u.email);
    console.log(cu);
    editUser(cu, u.toJSON());
    await setItem("users", users);
  }

  /**
   * Class User in to JSON formatter.
   * @returns string
   */
  toJSON() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      colorCode: this.colorCode,
      contacts: this.contacts,
      tasks: this.tasks,
    };
  }
}
