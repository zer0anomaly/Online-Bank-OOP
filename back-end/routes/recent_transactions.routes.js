const express = require("express");
const router = express.Router();
const recentTransactionController = require("../controller/recent_transaction.controller");

router.post("/", recentTransactionController.getRecentTransactions);

module.exports = router;