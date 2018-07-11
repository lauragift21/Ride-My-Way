import jwt from 'jsonwebtoken';

export default {
  /**
   * @description Verify token from the req provided by the user
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object}
   */
  isLoggedIn: (req, res, next) => {
    // check if the header is present
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: 'You are not logged in!',
      });
    }
    // split the bearer from the token
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please provide a valid token',
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'There was an error trying to process your request',
        });
      }
      req.userid = decoded.id;
    });
    next();
  },
};
