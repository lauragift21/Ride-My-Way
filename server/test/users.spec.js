import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../app';
import db from '../db/index';
import userMock from './mock/userMock';

chai.use(chaiHttp);
const {
  validUserInfo,
  invalidUserInfo,
} = userMock;

describe('authentication test endpoint', () => {
  before((done) => {
    db.query('DELETE FROM users');
    done();
  });

  it('should be able to sign up a new user and return a message "User registration successful"', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .type('form')
      .send(validUserInfo)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(201);
        expect(res).to.be.an('object');
        expect(res).to.have.property('message');
        expect(res.type).to.equal('application/json');
        expect(res.body.message).to.equal('User registration successful');
        expect(res.body.token).to.be.a('string');
      });
    done();
  });

  it('should return a message "There was a problem trying to sign up user." when there is an error on sign up', (done) => {
    chai
      .request(server)
      .post('/api/v1/auth/signup')
      .type('form')
      .send(invalidUserInfo)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(400);
        expect(res).to.be.an('object');
        expect(res.body.message).to.equal('Please provide a valid firstname');
      });
    done();
  });
});

