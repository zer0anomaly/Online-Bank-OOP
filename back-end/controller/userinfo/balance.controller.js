

const showBalance = async (req, res) => {
    try {
        const { email } = req.body;

        const ShowingBalance = require('../../services/userinfo/balance.service');  
        const service = new ShowingBalance();

        const balance = await service.methodShowingBalance(email);



        // If user not found
        if (balance === null || balance === undefined) {
            return res.status(404).json({ message: "User not found" });
        }

        // Success response
        res.status(200).json({
            message: "Balance fetched successfully",
            balance
        });
    } catch (error) {
        // Internal server error
        res.status(500).json({
            message: error.message || "An error occurred while fetching balance"
        });
    }
};

module.exports = {
    showBalance
};
