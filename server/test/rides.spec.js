import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

let token;
let token2;

describe('Test for rides', () => {
  it('should throw an error if header is available', (done) => {
    request(app)
      .post('/api/v1/users/rides')
      .end((err, res) => {
        expect(res.status).to.equal(403);
      });
    done();
  });
  it('should throw an error if no valid token is available', (done) => {
    request(app)
      .post('/api/v1/users/rides')
      .set('authorization', 'qwert12345ewqwert')
      .end((err, res) => {
        expect(res.status).to.equal(401);
      });
    done();
  });
});
describe('POST create new ride', () => {
  it('should return error when passed empty ride data', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .post('/api/v1/users/rides')
          .send({
            location: '',
            destination: '',
            departure: '',
            seats: '',
          })
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
  });
  it('should return error when passed no location ride data', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .post('/api/v1/users/rides')
          .send({
            location: '     ',
            destination: 'Abuja',
            departure: '02-07-2018',
            seats: '3',
          })
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Ride location is required');
          });
      });
    done();
  });
  it('should return error when passed no destination ride data', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .post('/api/v1/users/rides')
          .send({
            location: 'Lagos',
            destination: '  ',
            departure: '02-07-2018',
            seats: '3',
          })
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Ride destination is required');
            done();
          });
      });
  });
  it('should return error when passed no departure date ride data', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .post('/api/v1/users/rides')
          .send({
            location: 'Lagos',
            destination: 'Maryland',
            departure: ' ',
            seats: '3',
          })
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Departure date is required');
            done();
          });
      });
  });
  it('should return error when passed invalid seats ride data', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .post('/api/v1/users/rides')
          .send({
            location: 'Lagos',
            destination: 'Maryland',
            departure: '12-07-2018',
            seats: ' ',
          })
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Number of seats is required');
            done();
          });
      });
  });
  it('should return a new ride', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .post('/api/v1/users/rides')
          .send({
            location: 'Lagos',
            destination: 'Abuja',
            departure: '02-07-2018',
            seats: '3',
          })
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body.message).to.equal('Ride created successfully');
            done();
          });
      });
  });
});

describe('GET all rides', () => {
  it('should get a list of all available rides', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .get('/api/v1/rides')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
  });
});

describe('GET a specific ride', () => {
  it('should get details of a ride', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .get('/api/v1/rides/7')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
  });
  it('should get details of a ride', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        ({ token } = res.body);
        request(app)
          .get('/api/v1/rides/112345')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
  });
});

describe('POST request to get a ride', () => {
  it('should make a request to join a ride', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sareddh@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        token2 = res.body.token;
        request(app)
          .post('/api/v1/rides/6/requests')
          .set('Authorization', `Bearer ${token2}`)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            done();
          });
      });
  });
  it('should throw an error when you make a request to join your ride', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        token2 = res.body.token;
        request(app)
          .post('/api/v1/rides/6/requests')
          .set('Authorization', `Bearer ${token2}`)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
  });
});

describe('GET all request to get a ride', () => {
  it('should get all ride requests', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sareddh@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        // ({ token2 } = res.body.token);
        token2 = res.body.token;
        request(app)
          .get('/api/v1/users/rides/6/requests')
          .set('Authorization', `Bearer ${token2}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
  });
  it('should throw an error when no ride request is available', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'sareddh@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        // ({ token2 } = res.body.token);
        token2 = res.body.token;
        request(app)
          .get('/api/v1/users/rides/0/requests')
          .set('Authorization', `Bearer ${token2}`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
      });
  });
});

describe('UPDATE Accept or reject a request to get a ride', () => {
  it('should either accept or reject a ride request', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'gift@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        token = res.body.token;
        request(app)
          .put('/api/v1/users/rides/6/requests/2')
          .set('Authorization', `Bearer ${token}`)
          .send({
            status: 'accepted',
          })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
  });
});
