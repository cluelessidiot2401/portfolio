const express = require("express");
const {
  // getUserByUserId,
  getUserByUsername,
  getUserByGoogleId,
  addUser,
  getUsers,
  updateUser,
  getUserByEmail,
} = require("../controllers/userController");

const router = express.Router();

// Routing
router.route("/").get(getUsers).post(addUser);
// router.route("/id/:userId").get(getUserByUserId);
router.route("/id/:userId").put(updateUser);
router.route("/email/:email").get(getUserByEmail);
router.route("/username/:userName").get(getUserByUsername);
router.route("/googleId/:googleId").get(getUserByGoogleId);

module.exports = router;
