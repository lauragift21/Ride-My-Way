import express from 'express';
import rideController from '../controllers/rideControllers';
import userController from '../controllers/userControllers';
import validate from '../helpers/validation';
import verify from '../helpers/verifyToken';

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'app has started successfully' }));

// Authentication routes
router.post('/auth/signup', validate.userSignupValidation, userController.createUser);
router.post('/auth/login', validate.userLoginValidation, userController.loginUser);

//  All routes for ride my way API
router.post('/users/rides', verify.isLoggedIn, validate.postRideValidation, rideController.createRide);
router.get('/rides', verify.isLoggedIn, rideController.getAllRides);
router.get('/rides/:rideId', verify.isLoggedIn, rideController.getOneRide);

export default router;
