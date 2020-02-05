import express from 'express';
import { teamValidator, getOneTeamChecker } from '../validations';
import { verifyToken, verifyAdmin } from '../middlewares/auth';
import { teamController } from '../controllers';


const {
  createTeam, getAllTeams, getOneTeam, editTeam, removeTeam
} = teamController;


export const teamRouter = express.Router();

// teams
teamRouter.post('/teams', verifyToken, verifyAdmin, teamValidator, createTeam);
teamRouter.get('/teams', verifyToken, getAllTeams);
teamRouter.get('/teams/:teamId', verifyToken, verifyAdmin, getOneTeamChecker, getOneTeam);
teamRouter.patch('/teams/:teamId', verifyToken, verifyAdmin, getOneTeamChecker, editTeam);
teamRouter.delete('/teams/:teamId', verifyToken, verifyAdmin, getOneTeamChecker, removeTeam);