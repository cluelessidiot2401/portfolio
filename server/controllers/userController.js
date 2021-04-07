const User = require("../models/User");

const processError = (error, res) => {
  console.error(error);
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      errors: messages,
    });
  } else {
    return res.status(500).json({
      success: false,
      errors: ["Server error"],
    });
  }
};

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        error: "No User found",
      });
    }
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    return processError(error, res);
  }
};

// @desc    Get a user
// @route   GET /api/v1/users/username/:userName
// @access  Public
exports.getUserByUsername = async (req, res, next) => {
  try {
    const users = await User.find({ userName: req.params.userName });
    if (users === undefined || users === null || users.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No User found",
      });
    } else if (users.length > 1) {
      return res.status(500).json({
        success: false,
        error: "Multiple users found",
      });
    }
    return res.status(200).json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    return processError(error, res);
  }
};

// @desc    Get a user
// @route   GET /api/v1/users/email/:email
// @access  Public
exports.getUserByEmail = async (req, res, next) => {
  try {
    const users = await User.find({ email: req.params.email });
    if (users === undefined || users === null || users.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No User found",
      });
    } else if (users.length > 1) {
      return res.status(500).json({
        success: false,
        error: "Multiple users found",
      });
    }
    return res.status(200).json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    return processError(error, res);
  }
};

// @desc    Get a user
// @route   GET /api/v1/users/googleId/:googleId
// @access  Public
exports.getUserByGoogleId = async (req, res, next) => {
  try {
    const users = await User.find({
      googleId: req.params.googleId,
    });
    if (users === undefined || users === null || users.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No User found",
      });
    } else if (users.length > 1) {
      return res.status(500).json({
        success: false,
        error: "Multiple users found",
      });
    }
    return res.status(200).json({
      success: true,
      data: users[0],
    });
  } catch (error) {
    return processError(error, res);
  }
};

// @desc    Add/Register a user
// @route   POST /api/v1/users
// @access  Public
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return processError(error, res);
  }
};

// @desc    Add/Update a user
// @route   PUT /api/v1/users/id/:id
// @access  Public
exports.updateUser = async (req, res, next) => {
  try {
    const userReceived = req.body;
    const user = await User.findOne({ userId: req.params.userId });
    if (user === undefined || user === null) {
      return res.status(404).json({
        success: false,
        error: "No User found",
      });
    }
    const result = await User.updateOne(
      { userId: req.params.userId },
      userReceived
    );

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {}
};
