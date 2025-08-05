const authService = require('../services/auth.service');

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const result = await authService.loginUser(email, password);

		if (!result) {
			return res.status(401).json({ message: "Invalid email or password" });
		}

		res.status(200).json({ message: "Login successful", token: result.token }); 
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	loginUser,
};
