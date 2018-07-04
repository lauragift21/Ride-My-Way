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
        return res.status(500).json({
          message: 'No ride found',
        });
      }
      return res.status(200).json({
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
            message: 'Ride not found',
          });
        }
        const rideResult = result.rows;
        return res.status(200).json({
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
        return res.status(500).json({
          message: 'There was a problem trying to sign up user.',
        });
      }
      const rideResult = result.rows[0];
      if (result) {
        return res.status(201).json({
          message: 'Ride created successfully',
          ride: rideResult,
        });
      }
    });
  },
};
