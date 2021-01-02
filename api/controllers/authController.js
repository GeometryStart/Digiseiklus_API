const authService = require('../services/authService');

const authController = {};

// Endpoint for logging in
// POST - login
// Required values: email, password
// Optional values: none
// Returns:
//  Success: status 200 - Logged in
//  Fail: status 401 - Not authorized
authController.login = async (req, res) => {
  const username = typeof(req.body.username) === 'string' && req.body.username.trim().length > 0 ? req.body.username : false;
  const password = typeof(req.body.password) === 'string' && req.body.password.trim().length > 2 ? req.body.password : false;

  // Check if required data exists
  if (username && password) {
    const token = await authService.login(username, password);
    if (token) {
      // Return data
      res.status(200).json({
        success: true,
        token: token
      });
    } else {
      // Return error message
      res.status(401).json({
        success: false,
        message: 'Check Your credentials'
      });
    }
  } else {
      // Return error message
      res.status(400).json({
          success: false,
          message: 'Required field(s) missing or invalid'
      });
  }
}

module.exports = authController;