const express = require("express");
const router = express.Router();
const balanceController = require('../controller/userinfo/balance.controller');

router.post('/', (req, res) => balanceController.show_balance(req, res));

module.exports = router;