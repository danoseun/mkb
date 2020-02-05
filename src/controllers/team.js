import db from '../config';
import { addTeam, allTeamsQuery, findTeamByName, editTeamQuery, deleteTeamQuery } from '../helpers/sql';


export const teamController = {
  /**
     * Admin create team on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */

  async createTeam(req, res) {
    const { name } = req.body;

    try {
      const result = await db.query(addTeam, [name]);
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
     * Admin get all teams on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async getAllTeams(req, res) {
    try {
      const teams = await db.query(allTeamsQuery);
      return res.status(200).json({
        status: 200,
        data: teams.rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin get single team by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async getOneTeam(req, res) {
    const { team } = req.body;
    return res.status(200).json({
      status: 200,
      data: team
    });
  },

  /**
     * Admin update team by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async editTeam(req, res) {
    let { team, name } = req.body;
    
    if (!name || !name.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Add the new team name'
      });
    }
    name = name.toLowerCase();
    const { rowCount } = await db.query(findTeamByName, [name]);

    if (rowCount > 0) {
      return res.status(409).json({
        status: 409,
        error: `${name} already exists, consider choosing another name`
      });
    }
    try {
      const result = await db.query(editTeamQuery, [name, team.id]);
      return res.status(200).json({
        status: 200,
        data: `Team information successfully updated, ${JSON.stringify(result.rows[0])}`
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin delete team by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async removeTeam(req, res) {
    const { team } = req.body;
    try {
        const { rowCount } = await db.query(deleteTeamQuery, [team.id]);
        if (rowCount !== 0) {
          return res.status(200).json({
            status: 200,
            data: 'Team successfully deleted'
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
  }
};