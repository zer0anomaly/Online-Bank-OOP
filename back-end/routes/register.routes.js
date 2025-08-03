const express = require("express");
const router = express.Router();
const registerController = require('../controller/register.controller');

// Define POST /register route
router.post('/', (req, res) => registerController.register(req, res));

module.exports = router;
