const express = require("express");
const router = express.Router();
const TransferController = require("../controller/transfer.controller");

router.post("/", TransferController.transfer);

module.exports = router;
