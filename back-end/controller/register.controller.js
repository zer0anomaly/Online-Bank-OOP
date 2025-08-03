const Register = require('../services/register.service');

class AuthController {
	constructor() {
		this.Register = null;
	}

	async register(req, res) {
		try {
			const { full_name, user_name, email, password } = req.body;

			// Create service instance with data
			this.Register = new Register(full_name, user_name, email, password);

			// Check for duplicates (throws error if duplicate)
			await this.Register.duplicate_checking(email);

			// Register user
			const message = await this.Register.registering();

			return res.status(200).json({ message });
		} catch (error) {
			// Handle duplicate or other errors
			return res.status(400).json({ message: error.message });
		}
	}
}

module.exports = new AuthController();
