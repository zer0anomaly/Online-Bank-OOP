const UserStore = require('./user.store.service');

class AuthService {
  login(username, password) {
    if (username === 'admin' && password === '1234') {
      const user = {
        username,
        loginTime: new Date().toISOString()
      };

      UserStore.addUser(user);

      return { success: true, message: 'Login successful' };
    }

    return { success: false, message: 'Invalid credentials' };
  }

  logout(username) {
    UserStore.removeUser(username);
    return { success: true, message: 'Logged out' };
  }

  getLoggedInUsers() {
    return UserStore.getAllUsers();
  }
}

module.exports = new AuthService();
