import express from 'express';
import rideController from '../controllers/rideControllers';
import userController from '../controllers/userControllers';
import validate from '../helpers/validation';

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'app has started successfully' }));

//  All routes for ride my way API
router.get('/rides', rideController.getAllRides);
router.get('/rides/:rideId', rideController.getOneRide);
router.post('/rides', validate.postRideValidation, rideController.createRide);
router.post('/rides/:rideId/requests', rideController.joinRide);

// Authentication routes
router.post('/auth/signup', validate.userSignupValidation, userController.createUser);
router.post('/auth/login', validate.userLoginValidation, userController.loginUser);

export default router;
