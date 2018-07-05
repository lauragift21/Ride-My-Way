import { expect } from 'chai';
import request from 'supertest';
import { server } from '../app';
import db from '../db/index';
import userMock from './mock/userMock';

const {
  validUserInfo,
  invalidUserInfo,
  validLoginDetails,
} = userMock;

describe('POST /api/v1/auth/signup', () => {
  before((done) => {
    db.query('DELETE FROM users');
    done();
  });
  it('should be  create a new user', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .type('form')
      .send(validUserInfo)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('User registration successful');
      });
    done();
  });

  it('should return a message "There was a problem trying to sign up user." when there is an error on sign up', (done) => {
    request(server)
      .post('/api/v1/auth/signup')
      .type('form')
      .send(invalidUserInfo)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res).to.be.an('object');
        expect(res.body.message).to.equal('Please provide a valid firstname');
      });
    done();
  });
});

describe('POST /api/v1/auth/login', () => {
  beforeEach((done) => {
    db.query('INSERT INTO users VALUES (John, Doe, Jane@gmail.com, lagos, 123456) RETURNING *');
    done();
  });
  it('Logs a user in successfully', (done) => {
    request(server)
      .post('/api/v1/auth/login')
      .type('form')
      .send(validLoginDetails)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res).to.be.an('object');
        expect(res).to.have.property('message');
        expect(res.type).to.equal('application/json');
        expect(res.body.message).to.equal('user login successful');
        expect(res.body.token).to.be.a('string');
      });
    done();
  });
});
