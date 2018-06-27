import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app';

chai.use(chaiHttp);

// tests for all api endpoints
describe('test for ride-my-way app', () => {
  // dummy  ride data

  const rideOffer = {
    id: 1,
    location: 'Ikeja',
    destination: 'Oshodi',
    seats: 2,
    price: 2000,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const invalidRide = {
    id: 1,
    location: '    ',
    destination: 'Agege',
    seats: 2,
    price: 2000,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const rideRequest = {
    id: 3,
  };
  const noRideRequest = {
    id: 0,
  };
  /**
   * @description Test for all rides
   */
  describe('GET all ride offers', () => {
    it('should return all rides offers', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('All rides retrieved successfully');
        });
      done();
    });
  });
  /**
   * @description Test to retrieve a single ride
   */
  describe('GET a single ride offer', () => {
    it('should return a single ride offer', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Ride retrieved successfully');
        });
      done();
    });
    it('should return an error message when a ride is not found', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides/0')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res).to.be.an('object');
          expect(res.body.message).to.equal('No ride with specified id found');
        });
      done();
    });
  });
  /**
   * @description Test to Post a ride
   */
  describe('CREATE a new ride offer', () => {
    it('should create a new ride offer with status code 201', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides')
        .type('form')
        .send(rideOffer)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('New ride created successfully');
        });
      done();
    });
    it('should respond with 400 Bad Request', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides')
        .type('form')
        .send(invalidRide)
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equals(400);
          expect(res).to.be.an('object');
        });
      done();
    });
  });
  /**
   * @description Test to post a ride request
   */
  describe('POST to join a ride offer', () => {
    it('should POST a ride offer request with a specific id and return status 201', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides/3/requests')
        .type('form')
        .send(rideRequest)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Rider request successfully');
          expect(res).to.be.an('object');
        });
      done();
    });
    it('should return an error message when a ride that does not exist is requested', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides/0/requests')
        .type('form')
        .send(noRideRequest)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('No ride available. Please check back later');
          expect(res).to.be.an('object');
        });
      done();
    });
  });
});
