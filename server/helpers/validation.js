export default {
  /**
   * @description validate post ride
   * @param {object} req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  postRideValidation: (req, res, next) => {
    const { location, destination, seats, departure } = req.body;
    if (
      !location ||
      typeof location !== 'string' ||
      location.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Ride location is required',
      });
    } else if (
      !destination ||
      typeof destination !== 'string' ||
      destination.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Ride destination is required',
      });
    } else if (!seats || /\s/g.test(seats) === true) {
      return res.status(400).send({
        valid: false,
        message: 'Number of seats is required',
      });
    } else if (
      !departure ||
      /^\d{2}[./-]\d{2}[./-]\d{4}$/.test(departure) === false
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Departure date is required',
      });
    }
    return next();
  },
  /**
   * @description validate post ride request
   * @param {object} req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  rideRequestValidation: (req, res, next) => {
    const { accept, reject } = req.body;
    if (accept === undefined || accept.toString().trim() === '') {
      return res.status(400).send({
        message: 'Accept should not be empty.',
      });
    }
    if (accept !== 'true' && accept !== 'false') {
      console.log(req.body.accept);
      return res.status(400).send({
        message: 'Accept can either be true or false.',
      });
    }
    if (reject === undefined || reject.toString().trim() === '') {
      return res
        .status(400)
        .send({ valid: false, message: 'Accept should not be empty.' });
    }
    if (reject !== 'true' && reject !== 'false') {
      return res.status(400).send({
        valid: false,
        message: 'Invalid value, Reject can be either true or false',
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
      firstname, lastname, email, location, password,
    } = req.body;
    if (
      !firstname ||
      typeof firstname !== 'string' ||
      firstname.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid firstname',
      });
    } else if (
      !lastname ||
      typeof lastname !== 'string' ||
      lastname.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid lastname',
      });
    } else if (
      !email ||
      email.toString().trim() === '' ||
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid email',
      });
    } else if (
      !location ||
      typeof location !== 'string' ||
      location.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'User location is required',
      });
    } else if (
      !password ||
      password.toString().trim() === '' ||
      /.{7}/g.test(password) ||
      /[<>]/.test(password) === true ||
      /[=]/.test(password) === true
    ) {
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
    if (
      !email ||
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false ||
      email.toString().trim() === ''
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Please provide a valid email',
      });
    } else if (
      !password ||
      password.toString().trim() === '' ||
      /.{7/g.test(password) ||
      /[<>]/.test(password) === true ||
      /[=]/.test(password) === true
    ) {
      return res.status(400).send({
        valid: false,
        message: 'Incorrect Password entry',
      });
    }
    return next();
  },
};
