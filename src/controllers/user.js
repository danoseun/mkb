import db from '../config';
import { createUser, findUser } from '../helpers/sql';
import { hashPassword, comparePassword } from '../helpers/password';
import { createToken } from '../middlewares/auth';

export const userController = {
  /**
     * Create user account on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof userController object
     */

  async signupUser(req, res) {
    const {
      email, password, firstname, lastname
    } = req.body;
    const hash = hashPassword(password);

    const params = [
        email,
        hash,
        firstname,
        lastname
      ];
  
      try {
        const { rows } = await db.query(createUser, params);
        if (rows) {
          return res.status(201).json({
            status: 201,
            data: rows[0]
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
  },

  async loginUser(req, res) {
    const { email } = req.body;
    try {
      const { rows } = await db.query(findUser, [email]);

          const compare = comparePassword(req.body.password, rows[0].password);
          if (compare) {
            const authUser = rows[0];
            const token = createToken(authUser);
            // save token in session
            req.session.token = token;
            return res.status(200).json({
              status: 200,
              data: { token }
            });
          }
          else {
            return res.status(401).json({
              status: 401,
              error: 'Authentication failed'
            });
          }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  async logSession(req, res){
    console.log('ARE YOU KIDDING ME?', req.session.token);
    return res.status(200).json({message: 'It entered'});
  }
};