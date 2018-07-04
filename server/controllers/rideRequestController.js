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
      'INSERT INTO requestride(accept, reject, userid, rideid, created_at) VALUES ($1, $2, $3, $4, NOW())';
    const rideid = parseInt(req.params.rideId, 10);
    const { accept, reject } = req.body;
    const { userid } = req;
    db.query(text, [accept, reject, userid, rideid], (err, result) => {
      if (err) {
        return res.status(400).json({
          message: 'Ride does not exist',
        });
      }
      const requestResult = result.rows[0];
      return res.status(201).json({
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
            message: 'No request available',
          });
        }
        if (requestId.length === 0) {
          return res.status(404).json({
            message: 'No ride found',
          });
        }
        const requestResult = result.rows;
        return res.status(200).json({
          message: 'All ride request retrieved successfully',
          rides: requestResult,
        });
      },
    );
  },
};
