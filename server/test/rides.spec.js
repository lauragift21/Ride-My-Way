import { expect } from 'chai';
import request from 'supertest';
import { server } from '../app';
import db from '../db/index';

describe('App', () => {
  it('responds to a request', (done) => {
    request(server)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.body.message).to.equal('Welcome to ride my way app');
        done();
      });
  });
});

describe('Tests for Ride Controller', () => {
  before((done) => {
    db.query('DELETE FROM rides');
    done();
  });
  describe('GET all rides', () => {
    it('should return an array of all available rides', (done) => {
      request(server)
        .post('api/v1/auth/signup')
        .type('form')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'Jane@gmail.com',
          location: 'Lagos',
          password: '123456',
        })
        .end((err, res) => {
          const {
            token,
          } = res.body;
          console.log(token);
          request(server)
            .get('/api/v1/rides')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json/')
            .set('Authorization', `${token}`)
            .end(() => {
              expect(err).to.equal(null);
              expect(res.body.message).to.equal('All rides retrieved successfully');
              expect(res.status).to.equal(200);
            });
        });
      done();
    });
  });
  describe('GET one ride', () => {
    it.skip('should return an object of a specific ride', (done) => {
      request(server)
        .post('api/v1/auth/signup')
        .type('form')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'Jane@gmail.com',
          location: 'Lagos',
          password: '123456',
        })
        .end((err, res) => {
          const {
            token,
          } = res.body;
          request(server)
            .get('/api/v1/rides/1')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json/')
            .set('Authorization', `${token}`)
            .end(() => {
              expect(err).to.equal(null);
              expect(res.status).to.equal(200);
            });
        });
      done();
    });
  });
  describe('POST create a new ride', () => {
    it.skip('should create a new ride offer', (done) => {
      request(server)
        .set()
    });
  });
});
