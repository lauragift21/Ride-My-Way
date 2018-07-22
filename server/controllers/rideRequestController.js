import db from '../db/index';

export default {
  /**
   * @description: This endpoint makes a request to join a ride
   * @function createRideRequest
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  createRideRequest: (req, res) => {
    const rideId = parseInt(req.params.rideId, 10);
    const { userid } = req;
    db.query('SELECT * FROM rides WHERE id=$1', [rideId], (error, result) => {
      if (error) {
        return res.status(404).json({
          message: 'An error occurred',
        });
      } else if (!result.rowCount) {
        return res.status(404).json({
          success: false,
          message: 'Ride does not exist',
        });
      } else if (result.rows[0].userid === userid) {
        return res.status(400).json({
          success: false,
          message: 'You cannot request for a ride you created',
        });
      }
      const text =
        'INSERT INTO requests(userid, rideid, created_at) VALUES ($1, $2, NOW())';
      return db.query(text, [userid, rideId], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred',
          });
        }
        return res.status(201).json({
          success: true,
          message: 'Ride request added successfully',
        });
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
      'SELECT * FROM requests WHERE rideid=$1',
      [requestId],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Internal Server error',
          });
        } else if (!result.rowCount) {
          return res.status(404).json({
            success: false,
            message: 'No ride request found',
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
  /**
   * @description: This endpoint retrieves a ride request and then update it.
   * @function updateRideRequest
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  updateRideRequest: (req, res) => {
    const { userid } = req;
    const { rideId, requestId } = req.params;
    const { status } = req.body;
    db.query('SELECT * FROM requests WHERE rideid=$1 AND id=$2', [rideId, requestId], (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Internal server error',
        });
      } else if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: 'This request does not exist',
        });
      }
    });
    db.query('SELECT * FROM rides WHERE id=$1', [rideId], (err, result) => {
      if (result.rows[0].userid !== userid) {
        return res.status(400).json({
          success: false,
          message: 'Ride can ony be updated by creator',
        });
      }
      return db.query('UPDATE requests SET status=$1 WHERE id=$2 RETURNING *', [status, requestId], () => res.status(200).json({
        success: true,
        message: 'Ride request updated successfully',
      }));
    });
  },
};
