const express = require("express");
const { sign_s3 } = require("../controllers/s3Controller");

const router = express.Router();

// Routing
router.route("/sign_s3").post(sign_s3);

module.exports = router;
