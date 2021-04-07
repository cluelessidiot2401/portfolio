const express = require("express");
const { authenticate } = require("../controllers/gauthController");

const router = express.Router();

// Routing
router.route("/tokensignin").post(authenticate);

module.exports = router;
