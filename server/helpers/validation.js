/*eslint-disable */
export default {
  /**
   * @description validate post ride
   * @param {object} req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  postRideValidation: (req, res, next) => {
    const {
      location,
      destination,
      seats,
    } = req.body;
    if ((!location) || location === undefined || location.toString().trim() === '' || typeof location !== 'string') {
      return res.status(400).send({
        valid: false,
        message: 'Ride location is required',
      });
    } else if ((!destination) || destination === undefined || destination.toString().trim() === '' || typeof destination !== 'string') {
      return res.status(400).send({
        valid: false,
        message: 'Ride destination is required',
      });
    } else if ((!seats) || seats === undefined || (/\s/g).test(seats) === true ) {
      return res.status(400).send({
        valid: false,
        message: 'Number of seats is required',
      });
    }
    return next();
  },
  /**
   * @description validate signup user
   * @param {object} req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  userSignupValidation: (req, res, next) => {
    const {
      firstname,
      lastname,
      email,
      location,
      password
    } = req.body;
    if ((!firstname) || firstname === undefined || firstname.toString().trim() === '' || typeof firstname !== 'string') {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid firstname',
      });
    } else if((!lastname) || lastname === undefined || lastname.toString().trim() === '' || typeof lastname !== 'string') {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid lastname',
      });
    } else if((!email) || email === undefined || email.toString().trim() === '' || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email) === false ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid email',
      });
    } else if ((!location) || location === undefined || location.toString().trim() === '' || typeof location !== 'string') {
      return res.status(400).send({
        valid: false,
        message: 'Ride location is required',
      });
    } else if((!password) || password === undefined || password.toString().trim() === '' || (/[<>]/.test(password) === true)  || (/[=]/.test(password) === true) ) {
    return res.status(400).send({
      valid: false,
      message: 'Please provide a valid password',
    });
  }
  return next();
  },
    /**
   * @description validate user login
   * @param {object}  req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  userLoginValidation: (req, res, next) => {
    const { email, password } = req.body;
    if ((!email) || email === undefined || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email) === false || email.toString().trim() === '' ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid email',
      });
    } else if((!password) || password === undefined || password.toString().trim() === '' || (/[<>]/.test(password) === true)  || (/[=]/.test(password) === true) ) {
      return res.status(400).send({
        valid: false,
        message: 'Incorrect Password entry',
      });
    }
    return next();
  }
};
