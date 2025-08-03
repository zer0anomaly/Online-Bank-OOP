const RegisterService = require('../services/register.service');

class AuthController {
	async register(req, res) {
		try {
			const { full_name, user_name, email, password } = req.body;

			const registerInstance = new RegisterService(full_name, user_name, email, password);

			await registerInstance.duplicate_checking(email);
			const message = await registerInstance.registering();

			return res.status(200).json({ message });
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	}
}

module.exports = new AuthController();
