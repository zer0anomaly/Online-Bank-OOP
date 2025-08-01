const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

class UserStore {
  readUsers() {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  writeUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  addUser(user) {
    const users = this.readUsers();
    users.push(user);
    this.writeUsers(users);
  }

  removeUser(username) {
    const users = this.readUsers();
    const filtered = users.filter(u => u.username !== username);
    this.writeUsers(filtered);
  }

  findUser(username) {
    const users = this.readUsers();
    return users.find(u => u.username === username);
  }

  getAllUsers() {
    return this.readUsers();
  }

  clearUsers() {
    this.writeUsers([]);
  }
}

module.exports = new UserStore();
