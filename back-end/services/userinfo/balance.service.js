const fs = require('fs').promises;
const path = require('path');

class ShowingBalance {
	constructor() {
		this.userFilePath = path.join(__dirname, '../../data/userinfo/balance.json');
	}

	async readBalance() {
		try {
			const data = await fs.readFile(this.userFilePath, 'utf-8');
			return JSON.parse(data);
		} catch (err) {
			console.error("Error reading balance file:", err);
			return [];
		}
	}

	async methodShowingBalance(email) {
		const allData = await this.readBalance();
		const user = allData.find(u => u.email === email);
		return user ? user.balance : null;
	}
}

module.exports = ShowingBalance;