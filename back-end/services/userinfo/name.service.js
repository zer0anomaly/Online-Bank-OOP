const fs = require('fs');
const path = require('path');

class nameInfo {
	constructor(email){
		this.email = email;
	}

	const usersFilePath = path.join(__dirname, '../../data/users.json');

	readUsers(){
		const data = fs.readFileSync(this.usersFilePath, 'utf-8');
		return JSON.parse(data)
	}

	getting_user_name(email){
		
	}
}