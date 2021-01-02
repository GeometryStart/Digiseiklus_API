const jwt = require('jsonwebtoken');
const config = require('../../config');
const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization ? req.headers.authorization.substring(7) : false;
    console.log(token);
    const verified = token ? jwt.verify(token, config.jwtSecret) : false;
    if (verified) {
      req.user = verified.id;
      next();
    } else {
      res.status(401).json({
        
        success: false,
        message: 'Invalid token'
      });
      console.log(req.user);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = isLoggedIn;