import db from '../db/index';

export default {
  /**
   * getAllRides: Fetch all ride offers
   *
   * @function getAllRides
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   * @memberOf Ride
   */
  getAllRides: (req, res) => {
    const text = 'SELECT * FROM rides';
    db.query(text, (err, result) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: 'No ride found',
        });
      }
      return res.status(200).json({
        success: true,
        message: 'All rides retrieved successfully',
        rides: result.rows,
      });
    });
  },
  /**
   * getRide: Fetch a single ride offer
   *
   * @function getRide
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  getOneRide: (req, res) => {
    // parse rideid string to integer
    const rideId = parseInt(req.params.rideId, 10);
    db.query(
      'SELECT * FROM rides WHERE id=$1',
      [rideId],
      (err, result) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: 'Specified ride not found',
          });
        } else if (result.rowCount === 0) {
          return res.status(404).json({
            success: false,
            message: 'Specified ride with that id does not exist',
          });
        }
        const rideResult = result.rows;
        return res.status(200).json({
          success: true,
          message: 'Ride retrieved successfully',
          ride: rideResult,
        });
      },
    );
  },
  /**
   * createRide: This endpoint create a ride offer
   *
   * @function createRIde
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  createRide: (req, res) => {
    const text =
      'INSERT INTO rides(location, destination, seats, departure, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const {
      location, destination, seats, departure,
    } = req.body;
    const { userid } = req;
    db.query(text, [location, destination, seats, departure, userid], (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Invalid request, Can\'t create a new ride',
        });
      }
      const rideResult = result.rows[0];
      if (result) {
        return res.status(201).json({
          success: true,
          message: 'Ride created successfully',
          ride: rideResult,
        });
      }
      return null;
    });
  },
};
