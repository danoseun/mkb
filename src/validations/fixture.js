import dotenv from 'dotenv';
import db from '../config';
import Validator from 'validatorjs';
import { findFixtureById, findTeamByName } from '../helpers/sql';

dotenv.config();



export const fixtureValidator = {
  /** This functions validates fixture data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
      */
  async validateFixture(req, res, next) {
    let {
      hometeam, awayteam, hometeamscore, awayteamscore, matchdate, venue
    } = req.body;

    const rules = {
      hometeam: 'required',
      awayteam: 'required',
      hometeamscore: 'required|integer',
      awayteamscore: 'required|integer',
      matchdate: 'required',
      venue: 'required|string'
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
      });
    }
    hometeam = hometeam.trim();

    awayteam = awayteam.trim();

    let foundHomeTeam, foundAwayTeam;
    try {
      foundHomeTeam = await db.query(findTeamByName, [hometeam]);
    
      foundAwayTeam = await db.query(findTeamByName, [awayteam]);

      if (foundHomeTeam.rowCount === 0) {
        return res.status(400).json({
          status: 400,
          error: 'This home team does not exist'
        });
      }
      if (foundAwayTeam.rowCount === 0) {
        return res.status(400).json({
          status: 400,
          error: 'This away team does not exist'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
    req.body.hometeam = foundHomeTeam.rows[0].name;
    req.body.awayteam = foundAwayTeam.rows[0].name;
    req.body.hometeamscore = hometeamscore;
    req.body.awayteamscore = awayteamscore;
    req.body.matchdate = matchdate;
    req.body.venue = venue;
    return next();
  },

  /** This functions checks whether a fixture with a particular id exists
 *  It also confirms if the creator of the fixture is the one trying to get it
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
*/
  async getOneFixtureChecker(req, res, next) {
    let { fixtureId } = req.params;
    fixtureId = Number(fixtureId);

    /**
     * Check if parameter
     * is valid
     */
    if(isNaN(fixtureId)){
        return res.status(400).json({
            status: 400,
            error:'Invalid type of parameter'
        });
    }

    try {
      const { rows, rowCount } = await db.query(findFixtureById, [fixtureId]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Fixture not found'
        });
      }
      req.body.fixture = rows[0];
      return next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
};