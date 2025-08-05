const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = 'WOUBALUBADUBDUB'

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
			return null; 
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return null;
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			JWT_SECRET,
			{ expiresIn: '1h' } // You can change '1h' to '2d', etc.
		);	



		return { user, token };
	}
}

module.exports = new AuthService();
