const TransferService = require("../services/transfer.service");

class TransferController {
    static async transfer(req, res) {
        const { from_email, to_email, amount } = req.body;

        
        if (!from_email || !to_email || !amount || amount <= 0) {
            return res.status(400).json({
                result: "fail",
                message: "Invalid input"
            });
        }

        if (from_email.toLowerCase() === to_email.toLowerCase()) {
            return res.status(400).json({
                result: "fail",
                message: "You cannot transfer to yourself"
            });
        }

        try {
            const result = await TransferService.transfer(from_email, to_email, amount);

            if (result.success) {
                return res.json({ result: "success", message: "Transfer completed" });
            } else {
                return res.status(400).json({ result: "fail", message: result.message });
            }
        } catch (error) {
            console.error("Transfer error:", error);
            return res.status(500).json({
                result: "fail",
                message: "Server error"
            });
        }
    }
}

module.exports = TransferController;
