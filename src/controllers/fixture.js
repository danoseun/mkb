import dotenv from 'dotenv';
import db from '../config';
import uuidv4 from 'uuid/v4';
import { addFixtureQuery, allFixturesQuery, editFixtureQuery, deleteFixtureQuery, 
        completedStatusSearch, pendingStatusSearch, hometeamQuery,awayteamQuery,
        beforeDateQuery, afterDateQuery
    } from '../helpers/sql';

dotenv.config();


export const fixtureController = {
  /**
     * Admin create fixture on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async createFixture(req, res) {
    const {
      hometeam, awayteam, hometeamscore, awayteamscore, matchdate, venue
    } = req.body;
    
    const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;

    
    const link = `${url}/${uuidv4() + Math.random().toString(36).substr(2) + uuidv4()}`;
    const params = [hometeam,awayteam,hometeamscore,awayteamscore,matchdate,venue,link]

    try {
      const result = await db.query(addFixtureQuery, params);
      return res.status(201).json({
        status: 201,
        data: result.rows[0]
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin can get all fixtures on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */

  async getAllFixtures(req, res) {
    try {
        const fixtures = await db.query(allFixturesQuery);
        return res.status(200).json({
          status: 200,
          data: fixtures.rows
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
  },

  /**
     * Admin can get a single fixture on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async getOneFixture(req, res) {
    const { fixture } = req.body;
    return res.status(200).json({
      status: 200,
      data: fixture
    });
  },
  /**
     * Admin can edit fixture on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async editFixture(req, res) {
    let {
      fixture, hometeamscore, awayteamscore
    } = req.body;
    

    if (!hometeamscore || hometeamscore.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Hometeam score should be stated'
      });
    }
    if (!awayteamscore || awayteamscore.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Away team score should be stated'
      });
    }
    if(isNaN(hometeamscore) || isNaN(awayteamscore)) {
      return res.status(400).json({
        status: 400,
        error: 'hometeam scores and awayteam scores should be numbers'
      });
    }

    hometeamscore = Number(hometeamscore);
    awayteamscore = Number(awayteamscore);
    

    try {
      const result = await db.query(editFixtureQuery, [hometeamscore, awayteamscore, fixture.id]);
      return res.status(200).json({
        status: 200,
        data: `Fixture successfully updated, ${JSON.stringify(result.rows[0])}`
      });
    } catch (error) {
      return res.status(200).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin delete fixture by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async removeFixture(req, res) {
    const { fixture } = req.body;
    try {
        const { rowCount } = await db.query(deleteFixtureQuery, [fixture.id]);
        if (rowCount !== 0) {
          return res.status(200).json({
            status: 200,
            data: 'fixture successfully deleted'
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
  },

  // PUBLIC ROUTES
  /**
     * Users(ROBUST SEARCH) can view completed fixtures on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async viewCompletedFixtures(req, res) {
      
    try {
      const fixtures = await db.query(completedStatusSearch);
      if (fixtures.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no fixtures matching that search at the moment'
        });
      }
      return res.status(200).json({
        status: 200,
        data: fixtures.rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }

  },

  /**
     * Users(ROBUST SEARCH) can view pending fixtures on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async viewPendingFixtures(req, res) {
      
    try {
      const result = await db.query(pendingStatusSearch);
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no pending fixtures matching that search at the moment'
        });
      }
      return res.status(200).json({
        status: 200,
        data: result.rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },

  /**
     * Robust search(PUBLIC ROUTE)by homeTeam on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async searchByHomeTeam(req, res) {
    let { hometeam } = req.params;
    hometeam = hometeam.trim();
    try {
      const foundHomeTeam = await db.query(hometeamQuery, [hometeam]);
      if (foundHomeTeam.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: foundHomeTeam.rows
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'No home team with that name yet'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
       * Robust search(PUBLIC ROUTE)by away team on the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof fixtureController object
       */
  async searchByAwayTeam(req, res) {
    let { awayteam } = req.params;
    awayteam = awayteam.trim();
    try {
        const foundAwayTeam = await db.query(awayteamQuery, [awayteam]);
      if (foundAwayTeam.rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: foundAwayTeam.rows
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'No away team with that name yet'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
       * Robust search(PUBLIC ROUTE)for fixtures before the match date
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof fixtureController object
       */
  async fixturesBeforeDate(req, res) {
    const { fixturesbeforedate } = req.params;
    try {
      const fixtures = await db.query(beforeDateQuery, [fixturesbeforedate])

      if (fixtures.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no fixtures before this date'
        });
      }
      return res.status(200).json({
        status: 200,
        data: fixtures.rows
      });
    } catch (error) {
      return res.status(500).jaon({
        status: 500,
        error: error.message
      });
    }
  },

  /**
       * Robust search(PUBLIC ROUTE)for fixtures before the match date
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success/error
       * @memeberof fixtureController object
       */
  async fixturesAfterDate(req, res) {
    const { fixturesafterdate } = req.params;
    try {
      const fixtures = await db.query(afterDateQuery, [fixturesafterdate])
      console.log('fixturesC', fixtures.rows);
      if (fixtures.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no fixtures after this date'
        });
      }
      return res.status(200).json({
        status: 200,
        data: fixtures.rows
      });
    } catch (error) {
      return res.status(500).jaon({
        status: 500,
        error: error.message
      });
    }
  }
};