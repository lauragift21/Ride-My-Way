/**
 * @description validate post ride
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object}
 */
/*eslint-disable */
export default {
  postRideValidation: (req, res, next) => {
    if (req.body.from === undefined || req.body.from.toString().trim() === '') {
      return res.status(400).send({
        valid: false,
        message: 'Ride location is required',
      });
    }
    if (req.body.to === undefined || req.body.to.toString().trim() === '') {
      return res.status(400).send({
        valid: false,
        message: 'Ride destination is required',
      });
    }
    if (req.body.seats === undefined || (/\s/g).test(req.body.seats) === true) {
      return res.status(400).send({
        valid: false,
        message: 'Number of seats is required',
      });
    }
    if (req.body.price === undefined || (/\s/g).test(req.body.price) === true) {
      return res.status(400).send({
        valid: false,
        message: 'Price should not be empty',
      });
    }
    return next();
  }
};
