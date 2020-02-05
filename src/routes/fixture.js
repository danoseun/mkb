import express from 'express';
import { fixtureValidator } from '../validations';
import { verifyToken, verifyAdmin } from '../middlewares/auth';
import { fixtureController } from '../controllers';

const { validateFixture, getOneFixtureChecker } = fixtureValidator;
const {
  createFixture, getAllFixtures, getOneFixture, editFixture, 
  removeFixture, viewCompletedFixtures, viewPendingFixtures,
  searchByHomeTeam, searchByAwayTeam, fixturesBeforeDate, fixturesAfterDate
} = fixtureController;


export const fixtureRouter = express.Router();

// fixtures
fixtureRouter.post('/fixtures', verifyToken, verifyAdmin, validateFixture, createFixture);
fixtureRouter.get('/fixtures', verifyToken, verifyAdmin, getAllFixtures);
fixtureRouter.get('/fixtures/:fixtureId', verifyToken, verifyAdmin, getOneFixtureChecker, getOneFixture);
fixtureRouter.patch('/fixtures/:fixtureId', verifyToken, verifyAdmin, getOneFixtureChecker, editFixture);
fixtureRouter.delete('/fixtures/:fixtureId', verifyToken, verifyAdmin, getOneFixtureChecker, removeFixture);

// search routes
fixtureRouter.get('/completed', viewCompletedFixtures);
fixtureRouter.get('/pending', viewPendingFixtures);
fixtureRouter.get('/hometeam/:hometeam', searchByHomeTeam);
fixtureRouter.get('/awayteam/:awayteam', searchByAwayTeam);
fixtureRouter.get('/beforedate/:fixturesbeforedate', fixturesBeforeDate);
fixtureRouter.get('/afterdate/:fixturesafterdate', fixturesAfterDate);