/* eslint-disable max-len */
import dotenv from 'dotenv';
import express from 'express';
import redis from 'redis';
import session from 'express-session';
const redisStore = require('connect-redis')(session);
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  defaultRouter, userRouter, teamRouter, fixtureRouter
} from './routes';
import limiter from '.././src/helpers/rate'

const client = redis.createClient();

dotenv.config();

// verify redis connection
client.on('error', function(err) {
  console.log('Redis error: ' + err);
}); 

// create a top level instance of express
const app = express();

app.use(cookieParser());

app.use(session({
  secret: process.env.SECRETKEY,
  store: new redisStore({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, client: client, ttl:86400}),
  saveUninitialized: false,
  resave: false
}))




// limit IP api request
app.use(limiter);

app.use(logger('dev'));

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api', userRouter);
app.use('/api', teamRouter);
app.use('/api', fixtureRouter);
app.use('/api', defaultRouter);


const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server is live on PORT ${port}`);
});


export default app;