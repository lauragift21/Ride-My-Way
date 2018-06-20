import express from 'express';

const router = express.Router();

router.get('/', (req, res) =>
  res.status(200).json({ message: 'app has started successfully' }));

router.get('/rides', getAllRides);

router.get('/rides/:rideId', getRide);

router.post('/rides', postRide);

router.post('/rides/:rideId/requests');

export default router;
