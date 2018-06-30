import rides from '../models/rides';

const rideOffers = rides;

export default {
  /**
   * getAllRides: Fetch all ride offers
   *
   * @function getAllRides
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  getAllRides: (req, res) => {
    res.status(200).json({
      message: 'All rides retrieved successfully',
      rides: rideOffers,
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
  /* eslint consistent-return: ["off"] */
  getOneRide: (req, res) => {
    const { rideId } = req.params;
    const rideOffer = rideOffers.find(ride => ride.id === parseInt(rideId, 10));
    if (rideOffer === undefined) {
      return res.status(404).json({
        message: 'No ride with specified id found',
      });
    }
    return res.status(200).json({
      message: 'Ride retrieved successfully',
      rideOffer,
    });
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
    const newRide = {
      id: rideOffers.length + 1,
      location: req.body.location,
      destination: req.body.destination,
      seats: req.body.seats,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    rideOffers.push(newRide);
    if (rideOffers === undefined) {
      return res.status(404).json({
        message: 'Invalid Data',
      });
    }
    return res.status(201).json({
      message: 'New ride created successfully',
      ride: newRide,
    });
  },
  /**
   * joinRide: This endpoint makes a request to join a ride
   * @function joinRide
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  joinRide: (req, res) => {
    const { rideId } = req.params;
    const rideOffer = rideOffers.find(ride => ride.id === parseInt(rideId, 10));
    if (rideOffer === undefined) {
      return res.status(404).json({
        message: 'No ride available. Please check back later',
      });
    }
    return res.status(201).json({
      message: 'Rider request successfully',
    });
  },
};
