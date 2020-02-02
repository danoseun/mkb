/* eslint-disable max-len */
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
// import {
//   defaultRouter, userRouter, protectedRouter, publicRouter
// } from './routes';


dotenv.config();

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// app.use('/api', userRouter);
// app.use('/api', protectedRouter);
// app.use('/api', publicRouter);
// app.use('/api', defaultRouter);


const port = process.env.PORT || 5500;

app.listen(port, () => {
  console.log(`Server is live on PORT ${port}`);
});


export default app;