const recentTransaction = require("../services/recent_transaction.service");

class recentTransactionController {
    static async getRecentTransactions(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                result: "fail",
                message: "Invalid Input"
            });
        }

        try {
            const result = recentTransaction.getUserInfo(email);
            if (!result) {
                return res.status(404).json([]);
            }
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                result: "fail",
                message: "Server Error"
            });
        }
    }
}

module.exports = recentTransactionController;
