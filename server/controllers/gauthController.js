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

// @desc    Add/Register a user
// @route   POST /api/v1/gauth/tokensignin
// @access  Public
exports.authenticate = async (req, res, next) => {
  try {
    if (req.verifiedUser) {
      res.status(200).json({
        success: true,
        data: req.verifiedUser,
      });
    } else {
      return res.status(401).json({
        success: false,
        error: "UnAuthenticated user",
      });
    }
  } catch (error) {
    return processError(error, res);
  }
};
