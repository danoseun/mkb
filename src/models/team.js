import pool from '../config/config';

const teamsTable = `DROP TABLE IF EXISTS teams;
        CREATE TABLE teams (
            id SERIAL PRIMARY KEY NOT NULL,
            name CHARACTER VARYING(255) UNIQUE NOT NULL
        )`;

/**
         * Function representing teamtableHandler
         * @returns {object} representing success or failure
*/
export default async function createTeamTable() {
  try {
    const create = await pool.query(teamsTable);
    console.log(`teamsTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`teamsTable ${error}`);
  }
}