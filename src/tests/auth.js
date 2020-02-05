import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import { validRegisterData, inValidRegisterData, inValidLoginData } from './mockData/user';


const { should, expect } = chai;
should();

chai.use(chaiHttp);

const url = '/api/signup';
const loginUrl = '/api/login';

describe('Test for user route', () => {
  describe('Test for register API', () => {
    it('Should return 201 status code and create new user', async () => {
      const res = await chai.request(app)
        .post(url)
        .send(validRegisterData[0]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });
    it('Should return 201 status code and create another user', async () => {
      const res = await chai.request(app)
        .post(url)
        .send(validRegisterData[1]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });

    it('Should return 201 status code and create another user', async () => {
      const res = await chai.request(app)
        .post(url)
        .send(validRegisterData[2]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });
    it('should return status code 400 and send error message for undefined/empty email', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[0]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for spaced email', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[1]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for invalid email format', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[2]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 409 and send error message for existing email', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[3]);
      res.should.have.status(409);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(409);
      expect(res.body.error).to.be.a('string');
    });
    // firstname
    it('should return status code 400 and send error message for undefined/empty firstname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[4]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for spaced firstname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[5]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for short firstname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[6]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    // lastname
    it('should return status code 400 and send error message for undefined/empty lastname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[7]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for spaced lastname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[8]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    // Password
    it('should return status code 400 and send error message for undefined/empty password', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[9]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for short password length', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[10]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
  });

  describe('Test for login API', () => {
    it('Should return 200 status code and log user in when correct details are supplied', async () => {
      const res = await chai.request(app)
        .post(loginUrl)
        .send(validRegisterData[0]);
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.a('object');
    });
    it('Should return 400 status code and error message when email is not supplied/empty', async () => {
      const res = await chai.request(app)
        .post(loginUrl)
        .send(inValidLoginData[0]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('Should return 401 status code and error message when email is not found in the db', async () => {
      const res = await chai.request(app)
        .post(loginUrl)
        .send(inValidLoginData[1]);
      res.should.have.status(401);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(401);
      expect(res.body.error).to.equal('Authentication failed');
    });
    it('Should return 400 status code and error message when correct email is supplied but password is empty/undefined', async () => {
      const res = await chai.request(app)
        .post(loginUrl)
        .send(inValidLoginData[2]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('Should return 401 status code and error message when correct email is supplied but password is not found in the db', async () => {
      const res = await chai.request(app)
        .post(loginUrl)
        .send(inValidLoginData[3]);
      res.should.have.status(401);
      res.body.should.be.an('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(401);
      expect(res.body.error).to.equal('Authentication failed');
    });
  });
});
