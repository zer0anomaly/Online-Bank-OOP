const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

class AuthService {
	constructor(){
		this.usersFilePath = path.join(__dirname, '../data/users.json');
	}

	readUsers(){
		const data = fs.readFileSync(this.usersFilePath, 'utf-8');
		return JSON.parse(data);
	}

	async loginUser(email, password){
		const users = this.readUsers();
		const user = users.find(u => u.email === email);

		if (!user) {
			return null; // user not found
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return null;
		}

		return user; 
	}
}

module.exports = new AuthService();
