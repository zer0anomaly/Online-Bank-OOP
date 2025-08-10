const express = require("express");
const router = express.Router();
const balanceController = require('../../controller/userinfo/balance.controller');

// POST /balance
router.post('/balance', balanceController.showBalance);

module.exports = router;
