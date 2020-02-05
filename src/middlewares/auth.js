/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return `Bearer ${token}`;
};

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  //console.log('TOKEN', req.session.token);
  if (!token) {
    return res.status(403).json({
      status: 403,
      error: 'No token supplied'
    });
  }
  token = token.split(' ')[1];
  
  //const redisToken = req.session.token.split(' ')[1];
  

  /**
   * Check if token in the redis store
   * is same as that coming from the request headers
   */

  //  if(redisToken.localeCompare(token) === 0){
     
    jwt.verify(token, process.env.SECRETKEY, (error, authData) => {

      if (error) {
        if (error.message.includes('signature')) {
          return res.status(403).json({
            status: 403,
            error: 'Invalid token supplied'
          });
        }
        return res.status(403).json({
          status: 403,
          error: error.message
        });
      }
      req.authData = authData;
      return next();
    });
   
  
};

export const verifyAdmin = (req, res, next) => {
  const { is_admin } = req.authData.payload;
  if (is_admin) {
    return next();
  }

  return res.status(401).json({
    status: 401,
    error: 'You do not have permissions to access this route'
  });
};