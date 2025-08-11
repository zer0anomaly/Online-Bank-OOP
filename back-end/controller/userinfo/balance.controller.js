const showBalance = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const ShowingBalance = require('../../services/userinfo/balance.service');  
    const service = new ShowingBalance(email);

    const balance = await service.methodShowingBalance();

    if (balance === null) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Balance fetched successfully",
      balance
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "An error occurred while fetching balance"
    });
  }
};


module.exports = {
    showBalance
};
