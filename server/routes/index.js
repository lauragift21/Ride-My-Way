import express from 'express';
import rideController from '../controllers/rideControllers';
import postRideValidation from '../helpers/validation';

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'app has started successfully' }));

//  All routes for ride my way API
router.get('/rides', rideController.getAllRides);
router.get('/rides/:rideId', rideController.getOneRide);
router.post('/rides', postRideValidation.postRideValidation, rideController.createRide);
router.post('/rides/:rideId/requests', rideController.joinRide);

export default router;
