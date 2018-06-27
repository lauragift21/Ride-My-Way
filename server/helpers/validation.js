/**
 * @description validate post ride
 * @param {object} req - The object that return a request
 * @param {object} res - The object that returns a response
 * @param {object} next- The object that tell the next action to run
 * @returns {object}
 */
/*eslint-disable */
export default {
  postRideValidation: (req, res, next) => {
    const {
      location,
      destination,
      seats,
      price
    } = req.body;
    console.log(req.body);
    if ((!location) || location === undefined || location.toString().trim() === ' ' || typeof location !== 'string') {
      return res.status(400).send({
        valid: false,
        message: 'Ride location is required',
      });
    } else if ((!destination) || destination === undefined || destination.toString().trim() === ' ' || typeof destination !== 'string') {
      return res.status(400).send({
        valid: false,
        message: 'Ride destination is required',
      });
    } else if ((!seats) || seats === undefined || (/\s/g).test(seats) === true ) {
      return res.status(400).send({
        valid: false,
        message: 'Number of seats is required',
      });
    } else if ((!price) || price === undefined || (/\s/g).test(price) === true) {
      return res.status(400).send({
        valid: false,
        message: 'Price should not be empty',
      });
    }
    return next();
  }
};
