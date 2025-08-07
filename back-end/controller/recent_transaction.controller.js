const recentTransaction = require("../services/recent_transaction.service");

class recentTransactionController {
	static async transfer(req, res) {
		const { email } = req.body;

		if (!email){
			return res.status(400).json({
				result: "fail",
				message: "Invalid Input"
			});
		}

		try {
			const result = await recentTransaction.
		}
	}
}