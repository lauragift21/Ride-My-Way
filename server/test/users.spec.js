import { expect } from 'chai';
import request from 'supertest';
import app, { server } from '../app';
import db from '../db/index';
import bcrypt from '../helpers/bcrypt';

describe('Big head', () => {
  before((done) => {
    db.query('DELETE FROM users');
    done();
  });
  describe('POST /api/v1/auth/signup', () => {
    it('should be able to  create a new user', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'Jane@gmail.com',
          location: 'Lagos',
          password: '123456',
        })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User registration successful');
        });
      done();
    });

    it('should return a message "There was a problem trying to sign up user." when there is an error on sign up', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .type('form')
        .send({
          firstname: '',
          lastname: 'Doe',
          email: 'johndoe',
        })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res).to.be.an('object');
          expect(res.body.message).to.equal('Please provide a valid firstname');
        });
      done();
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('Logs a user in successfully', (done) =>
      request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: 'Jane@gmail.com',
          password: '123456',
        })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
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
    it('return an error when user login with incorrect credentials', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .type('form')
        .send({
          email: 'Jane@gmail.com',
          password: '23332',
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          console.log(err);
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Please provide a valid password');
        });
      done();
    });
});
