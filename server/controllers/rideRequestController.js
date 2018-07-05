import db from '../db/index';

export default {
  /**
   * @description: This endpoint makes a request to join a ride
   * @function rideRequest
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  rideRequest: (req, res) => {
    const text =
      'INSERT INTO requestride(status, userid, rideid, created_at) VALUES ($1, $2, $3, NOW())';
    const rideid = parseInt(req.params.rideId, 10);
    const { status } = req.body;
    const { userid } = req;
    db.query(text, [status, userid, rideid], (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Ride does not exist',
        });
      }
      const requestResult = result.rows[0];
      return res.status(201).json({
        success: true,
        message: 'Ride request added successfully',
        ride: requestResult,
      });
    });
  },
  /**
   * @description: This endpoint gets all the ride requests
   * @function getRideRequest
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  getRideRequest: (req, res) => {
    const requestId = parseInt(req.params.rideId, 10);
    db.query(
      'SELECT * FROM requestride WHERE rideid=$1',
      [requestId],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'No request available',
          });
        }
        if (requestId.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'No ride found',
          });
        }
        const requestResult = result.rows;
        return res.status(200).json({
          success: true,
          message: 'All ride request retrieved successfully',
          rides: requestResult,
        });
      },
    );
  },
};
