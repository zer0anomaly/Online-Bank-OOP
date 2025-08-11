const fs = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');

const path_for_users = path.join(__dirname, '../data/users.json');
const path_for_transactions = path.join(__dirname, "../data/userinfo/transactions");
const path_for_balance = path.join(__dirname, "../data/userinfo/balance")

class RegisterService {
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
	}

	async userTransactionFile() {
	    try {
	        const safeEmail = this.email.replace(/[@.]/g, "_"); 
	        const userFilePath = path.join(path_for_transactions, `${safeEmail}.json`);

	        await fs.mkdir(path_for_transactions, { recursive: true });

	        const initialData = [{
	            date: new Date().toISOString(), 
	            email: this.email,
	            recent_transaction: null,
	            type: null 
	        }];

	        await fs.writeFile(userFilePath, JSON.stringify(initialData, null, 2));

	        console.log(`Transaction file created: ${userFilePath}`);
	    } catch (err) {
	        console.error("Error creating transaction file:", err);
	    }
	}
	

	async zeroBalanceCreation() {
	    try {
	        const safeEmail = this.email.replace(/[@.]/g, "_");
	        const userBalanceCreation = path.join(path_for_balance, `${safeEmail}.json`);

	        await fs.mkdir(path_for_balance, { recursive: true });

	        const initialData = [{
	            email: this.email,
	            balance: 0
	        }];

	        await fs.writeFile(userBalanceCreation, JSON.stringify(initialData, null, 2));

	        console.log(`Balance file created: ${userBalanceCreation}`);
	    } catch (err) {
	        console.error("Error creating balance file:", err);
	    }
	}



	async registering() {
		const fileContent = await fs.readFile(path_for_users, 'utf-8');
		const users = JSON.parse(fileContent);
		const hashedPassword = await bcrypt.hash(this.password, 10)

		users.push({
			full_name: this.full_name,
			user_name: this.user_name,
			email: this.email,
			password: hashedPassword
		});

		await fs.writeFile(path_for_users, JSON.stringify(users, null, 2));
		await this.userTransactionFile();
		await this.zeroBalanceCreation();
		return 'User added successfully!';
	}
}

module.exports = RegisterService;
