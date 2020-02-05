import Validator from 'validatorjs';
import db from '../config';
import { findTeamById, findTeamByName } from '../helpers/sql';


/** This functions validates team name
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
*/
export const teamValidator = async (req, res, next) => {
  let { name } = req.body;
  const rule = {
    name: 'required|min:2|string'
  };

  const validation = new Validator(req.body, rule);
  if (validation.fails()) {
    return res.status(400).json({
      status: 400,
      error: validation.errors.errors
    });
  }
  name = name.toLowerCase().trim();
  try {
    const { rowCount } = await db.query(findTeamByName, [name]);
    if (rowCount > 0) {
      return res.status(400).json({
        status: 400,
        error: `${name} already exists`
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message
    });
  }
  req.body.name = name;
  return next();
};

/** This functions checks whether a team with a particular id exists
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
*/
export const getOneTeamChecker = async (req, res, next) => {
  let { teamId } = req.params;
  teamId = Number(teamId);
  
  /**
     * Check if parameter
     * is valid
    */
  if(isNaN(teamId)){
      return res.status(400).json({
          status: 400,
          error:'Invalid type of parameter'
      });
  }

  try {
    const { rows,rowCount } = await db.query(findTeamById, [teamId]);
    if (rowCount === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Team not found'
      });
    }
    req.body.team = rows[0];
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message
    });
  }
};