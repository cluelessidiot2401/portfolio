const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Full Name is missing"],
  },
  mobileNumber: {
    type: String,
    trim: true,
    required: false,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is missing"],
  },
  isAdmin: {
    type: Boolean,
    trim: true,
    required: true,
    default: false,
  },
  isMaster: {
    type: Boolean,
    trim: true,
    required: true,
    default: false,
  },
  location: {
    type: String,
    trim: true,
    required: false,
  },
  userId: {
    type: String,
    trim: true,
    required: [true, "UserId is missing"],
    default: uuidv4(),
  },
  userName: {
    type: String,
    trim: true,
    required: [true, "UserName is missing"],
  },
  password: {
    type: String,
    trim: true,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  picture: {
    type: String,
    required: false,
    default: "",
  },
  email_verified: {
    type: Boolean,
    required: false,
    default: false,
  },
  token: {
    type: String,
    required: [true, "Google Token is missing"],
    default: "",
  },
  registrationStatus: {
    type: String,
    required: [true, "Google Token is missing"],
    default: "onboarded",
  },
});

module.exports = mongoose.model("User", UserSchema);
