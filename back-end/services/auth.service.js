const fs = require('fs');
const path = require('path');

class AuthService {
	constructor(){
		this.usersFilePath = path.join(__dirname, '../users/users.json');
	}

	readUsers(){
		const data = fs.readFileSync(this.usersFilePath, 'utf-8');
		return JSON.parse(data);
	}

	loginUser(email, password){
		const users = this.readUsers();
		const user = users.find(u => u.email === email && u.password === password);
		return user || null;
	}
}

module.exports = new AuthService();