import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

describe('welcome route', () => {
  it('should return a welcome message', (done) => {
    request(app)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to ride my way app');
      });
    done();
  });
});

describe('Invalid routes', () => {
  it('should catch all non-existing routes', (done) => {
    request(app)
      .post('/api/v1/')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Invalid request, Route does not exist');
      });
    done();
  });
});

describe('POST sign up authentication', () => {
  it('should return an error message when user tries to sign up with no data', (done) => {
    const noData = {
      firstname: ' ',
      lastname: ' ',
      email: ' ',
      location: ' ',
      password: ' ',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(noData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
      });
    done();
  });
  it('should return an error message when user tries to sign up with no last name', (done) => {
    const novalidData = {
      firstname: 'Gift',
      lastname: ' ',
      email: ' ',
      location: ' ',
      password: ' ',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(novalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please provide a valid lastname');
      });
    done();
  });
  it('should return an error message when user tries to sign up with invalid email that does not contain @ or.com', (done) => {
    const novalidData = {
      firstname: 'Gift',
      lastname: 'Egwuenu',
      email: 'giftegw',
      location: ' ',
      password: ' ',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(novalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please provide a valid email');
      });
    done();
  });
  it('should return an error message when user tries to sign up with empty location', (done) => {
    const novalidData = {
      firstname: 'Gift',
      lastname: 'Egwuenu',
      email: 'gift@mail.com',
      location: ' ',
      password: ' ',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(novalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('User location is required');
      });
    done();
  });
  it('should return an error message when user tries to sign up with empty password', (done) => {
    const novalidData = {
      firstname: 'Gift',
      lastname: 'Egwuenu',
      email: 'gift@mail.com',
      location: 'Maryland',
      password: ' ',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(novalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Please provide a valid password');
      });
    done();
  });
  it('should create a new user', (done) => {
    const validData = {
      firstname: 'Gift',
      lastname: 'Egwuenu',
      email: 'gift@mail.com',
      location: 'Maryland',
      password: '123456',
    };
    request(app)
      .post('/api/v1/auth/signup')
      .send(validData)
      .end((err, res) => {
        expect(res.status).to.equal(409);
      });
    done();
  });
});

describe('POST login authentication', () => {
  it('should login user', (done) => {
    const validData = {
      email: 'gift@mail.com',
      password: '123456',
    };
    request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(validData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('user login successful');
      });
    done();
  });
  it('should throw error when login user with invalid data', (done) => {
    const invalidData = {
      email: 'giftail.com',
      password: '1256',
    };
    request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
      });
    done();
  });
  it('should throw error when login user with empty data', (done) => {
    const invalidData = {
      email: '',
      password: '',
    };
    request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(400);
      });
    done();
  });
  it('should throw error when login user with nonexisting  data', (done) => {
    const invalidData = {
      email: 'abigail@mail.com',
      password: 'qwerty',
    };
    request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(invalidData)
      .end((err, res) => {
        expect(res.status).to.equal(404);
      });
    done();
  });
});
