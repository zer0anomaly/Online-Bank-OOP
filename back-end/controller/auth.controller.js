const authService = require ('../services/auth.service');

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const result = await authService.loginUser( email, password);

		res.status(201).json({ result: Login successful, data: result })
	}catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.export = {
	loginUser,
};