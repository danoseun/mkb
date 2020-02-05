import express from 'express';
import { userValidator } from '../validations';
//import { verifyToken, verifyAdmin } from '../middlewares/auth';
import { userController } from '../controllers';

const { validateSignup, validateLogin } = userValidator;
const { signupUser, loginUser, logSession } = userController;

export const userRouter = express.Router();

userRouter.post('/signup', validateSignup, signupUser);
userRouter.post('/login', validateLogin, loginUser);
//userRouter.get('/log', verifyToken, logSession);