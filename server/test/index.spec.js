import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app';

chai.use(chaiHttp);

// tests for all api endpoints
describe('test for ride-my-way app', () => {
  // dummy  ride data

  const rideOffer = {
    id: 1,
    from: 'Ikeja',
    to: 'Oshodi',
    seats: 2,
    price: 2000,
    driver: 'John',
    riders: ['Timi', 'Gift'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const rideRequest = {
    id: 3,
  };
  const notRideRequest = {
    id: 0,
  };
  // test  for all rides
  describe('GET api/v1/rides', () => {
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
  // test for a single ride
  describe('GET api/v1/rides/0', () => {
    it('should return an error message when a ride is not found', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides/0')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('No ride with specified id found');
        });
      done();
    });
  });
  describe('GET api/v1/rides/1', () => {
    it('should return a single ride offer', (done) => {
      chai
        .request(server)
        .get('/api/v1/rides/1')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Ride retrieved successfully');
        });
      done();
    });
  });
  // test to post a ride
  describe('CREATE api/v1/rides', () => {
    it('should create a new ride offer with status code 201', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides')
        .send(rideOffer)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('New ride created successfully');
        });
      done();
    });
  });
  // test to post a ride request
  describe('POST api/v1/rides/3/request', () => {
    it('should POST a ride offer request with a specific id and return status 201', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides/3/requests')
        .send(rideRequest)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Rider request successful');
          expect(res).to.be.an('object');
        });
      done();
    });
  });
  describe('POST api/v1/rides/0/requests', () => {
    it('should return an error message when a ride that does not exist is requested', (done) => {
      chai
        .request(server)
        .post('/api/v1/rides/0/requests')
        .send(notRideRequest)
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
