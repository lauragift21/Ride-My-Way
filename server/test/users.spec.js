import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app';
import mockData from './mock/userMock';

chai.use(chaiHttp);

describe('tests case for signup auth endpoints', () => {
  /**
   * @description Test cases for signing up a user with validation
   */
  const {
    validUserInfo,
    emptyUserInfo,
  } = mockData;

  describe('POST user should be able to sign up', () => {
    it('should be able to sign up a new user and return a message "User registration successful"', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(validUserInfo)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
          expect(res).to.have.property('message');
          expect(res.body.message).to.equal('User registration successful');
        });
      done();
    });
    it('should return a message "User with email already exist" when you signup with an existing email address ', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(validUserInfo)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res).to.be.an('object');
          expect(res).to.have.property('message');
          expect(res.body.message).to.equal('User with email already exist');
        });
      done();
    });
    it('should return a message "Please provide a valid name" when you signup with empty input fields', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/signup')
        .type('form')
        .send(emptyUserInfo)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res).to.be.an('object');
          expect(res).to.have.property('message');
          expect(res.body.message).to.equal('Please provide a valid name');
        });
      done();
    });
  });
});

describe('test cases for logi auth endpoint', () => {
  /**
   * @description Test to login a user
   */
  const {
    validLoginInfo,
    invalidLoginEmail,
  } = mockData;
  describe('POST user should be able to login', () => {
    it('should be able to login with valid credentials', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .type('form')
        .send(validLoginInfo)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.an('object');
          expect(res).to.have.property('message');
          expect(res.body.message).to.equal('User login successfully');
        });
      done();
    });
  });
  describe('POST user should be able to login', () => {
    it('should return a message "Please provide a valid email" when a user login with an email that does not contain @ or .com', (done) => {
      chai
        .request(server)
        .post('/api/v1/auth/login')
        .type('form')
        .send(invalidLoginEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res).to.be.an('object');
          expect(res).to.have.property('message');
          expect(res.body.message).to.equal('Please provide a valid email');
        });
      done();
    });
  });
});
