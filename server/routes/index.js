import express from 'express';
import rideController from '../controllers/rideControllers';
import requestController from '../controllers/rideRequestController';
import userController from '../controllers/userControllers';
import validate from '../helpers/validation';
import verify from '../helpers/verifyToken';

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'Welcome to ride my way app' }));


// Authentication routes
router.post(
  '/auth/signup',
  validate.userSignupValidation,
  userController.createUser,
);
router.post(
  '/auth/login',
  validate.userLoginValidation,
  userController.loginUser,
);

//  All routes for rides endpoint
router.post(
  '/users/rides',
  verify.isLoggedIn,
  validate.postRideValidation,
  rideController.createRide,
);
router.get('/rides/:rideId', verify.isLoggedIn, rideController.getOneRide);
router.get('/rides', verify.isLoggedIn, rideController.getAllRides);

//  All routes for ride requests
router.post(
  '/rides/:rideId/requests',
  verify.isLoggedIn,
  requestController.createRideRequest,
);
router.get(
  '/users/rides/:rideId/requests',
  verify.isLoggedIn,
  requestController.getRideRequest,
);

router.put(
  '/users/rides/:rideId/requests/:requestId',
  verify.isLoggedIn,
  validate.rideRequestValidation,
  requestController.updateRideRequest,
);

router.all('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid request, Route does not exist',
  });
});

export default router;
