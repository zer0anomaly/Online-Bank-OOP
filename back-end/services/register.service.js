const fs = require('fs/promises');
const path = require('path');

const path_for_users = path.join(__dirname, '../data/users.json');

class Register {
	constructor(full_name, user_name, email, password) {
		this.full_name = full_name;
		this.user_name = user_name;
		this.email = email;
		this.password = password;
	}

	async duplicate_checking(email) {
		const fileContent = await fs.readFile(path_for_users, 'utf-8');
		const users = JSON.parse(fileContent);

		const userExists = users.find(user => user.email === email);

		if (userExists) {
			throw new Error('User already exists');
		}

		return false;
	}

	async registering() {
		try {
			const fileContent = await fs.readFile(path_for_users, 'utf-8');
			const users = JSON.parse(fileContent);

			users.push({
				full_name: this.full_name,
				user_name: this.user_name,
				email: this.email,
				password: this.password
			});

			await fs.writeFile(path_for_users, JSON.stringify(users, null, 2));
			return 'User added successfully!';
		} catch (err) {
			console.error('Error adding user:', err.message);
		}
	}
}
