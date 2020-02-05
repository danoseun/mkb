import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import { validRegisterData, inValidRegisterData } from './mockData/team';



const { should, expect } = chai;
should();

chai.use(chaiHttp);

const url = '/api/teams';
//const loginUrl = '/api/login';
let adminToken= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJGVWTE8xUUptSmR1OC81bUU5VlFZU3VGWG92MnZXMTZ3Q21OT21lblE4cFNPRy9QL1FKbHZDIiwiZmlyc3RuYW1lIjoiYWRtaW5maXJzdCIsImxhc3RuYW1lIjoiYWRtaW5sYXN0IiwiaXNfYWRtaW4iOnRydWUsImNyZWF0ZWRvbiI6IjIwMjAtMDItMDVUMTY6NTk6MTkuNDYzWiJ9LCJpYXQiOjE1ODA5MjMxNDR9.okTk92hzU73TcJvcS8Is63blNy2M7uMMCWTuo8nLfTE';
let userToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJlbWFpbCI6InVzZXJ0d29AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkZVZMTzFRSm1KZHU4LzVtRTlWUVlTdUZYb3YydlcxNndDbU5PbWVuUThwU09HL1AvUUpsdkMiLCJmaXJzdG5hbWUiOiJ1c2VydGhyZWUiLCJsYXN0bmFtZSI6Imxhc3R0aHJlZSIsImlzX2FkbWluIjpmYWxzZSwiY3JlYXRlZG9uIjoiMjAyMC0wMi0wNVQxNjo1OToxOS40NjNaIn0sImlhdCI6MTU4MDkyMzIxNX0.5eguJOJH26-oV9iQ9fRWkbQbUM9WL8VWZLr7vWhzN1E';


describe('Test for team route', () => {

  describe('Test for create API', () => {
    it('Should return 201 status code and create new team', async () => {
      const res = await chai.request(app)
        .post(url)
        .set('authorization', `Bearer ${adminToken}`)
        .send(validRegisterData[0]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });
    it('Should return 201 status code and create another team', async () => {
      const res = await chai.request(app)
        .post(url)
        .set('authorization', `Bearer ${adminToken}`)
        .send(validRegisterData[1]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });

    it('Should return 201 status code and create another team', async () => {
      const res = await chai.request(app)
        .post(url)
        .set('authorization', `Bearer ${adminToken}`)
        .send(validRegisterData[2]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });
    it('should return status code 400 and send error message for empty team name', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${adminToken}`)
        .send(inValidRegisterData[0]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for single alphabet team name', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${adminToken}`)
        .send(inValidRegisterData[1]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for numbers as team name', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .set('authorization', `Bearer ${adminToken}`)
        .send(inValidRegisterData[2]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('Should return 403 status code not create team without token', async () => {
        const res = await chai.request(app)
          .post(url)
        res.should.have.status(403);
        res.body.should.be.an('object');
        expect(res.body.status).to.equal(403);
        expect(res.body.error).to.be.equal('No token supplied');
      });

    it('Should return 401 status code not create team for non-admin', async () => {
        const res = await chai.request(app)
          .post(url)
          .set('authorization',`Bearer ${userToken}`);
        res.should.have.status(401);
        res.body.should.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.be.equal('You do not have permissions to access this route');
      });
    });

    describe('Test for other APIs', () => {
        // GET ROUTES
        it('Should return 200 status code and get all teams', async () => {
          const res = await chai.request(app)
            .get('/api/teams')
            .set('authorization', `Bearer ${adminToken}`)
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
        });

        it('Should return 200 status code and get single team', async () => {
            const res = await chai.request(app)
              .get('/api/teams/1')
              .set('authorization', `Bearer ${adminToken}`)
            res.should.have.status(200);
            res.body.should.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body.data).to.be.a('object');
          });

          //PATCH ROUTE
          it('Should return 200 status code and update team name', async () => {
            const res = await chai.request(app)
              .patch('/api/teams/1')
              .set('authorization', `Bearer ${adminToken}`)
              .send({name: 'London FC'});
            res.should.have.status(200);
            res.body.should.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body.data).to.be.a('string');
          });

          it('Should return 401 status code and not update team for non-admins', async () => {
            const res = await chai.request(app)
              .patch('/api/teams/1')
              .set('authorization', `Bearer ${userToken}`)
              .send({name: 'London FC'});
              res.should.have.status(401);
              res.body.should.be.an('object');
              expect(res.body.status).to.equal(401);
              expect(res.body.error).to.be.equal('You do not have permissions to access this route');
          });

          // DELETE
          it('Should return 200 status code and DELETE team', async () => {
            const res = await chai.request(app)
              .delete('/api/teams/11')
              .set('authorization', `Bearer ${adminToken}`)
            res.should.have.status(200);
            res.body.should.be.an('object');
            expect(res.body.status).to.equal(200);
            expect(res.body.data).to.be.a('string');
          });
    })
});


