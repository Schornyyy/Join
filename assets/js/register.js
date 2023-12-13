function registerUser(name, email, password) {
    let user = new User(name, email, password);
    users.push(user);
    saveUsers();
}
