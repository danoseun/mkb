import pool from '../config/config';

const fixturesTable = `DROP TABLE IF EXISTS fixtures;
        CREATE TABLE fixtures (
            id SERIAL PRIMARY KEY NOT NULL,
            hometeam CHARACTER VARYING(255) NOT NULL,
            awayteam CHARACTER VARYING(255) NOT NULL,
            hometeamscore INTEGER NOT NULL,
            awayteamscore INTEGER NOT NULL,
            matchdate DATE NOT NULL,
            venue TEXT NOT NULL,
            link TEXT NOT NULL,
            completed boolean DEFAULT false,
            createdon TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )`;

/**
         * Function representing fixturetableHandler
         * @returns {object} representing success or failure
*/
export default async function createFixturesTable() {
  try {
    const create = await pool.query(fixturesTable);
    console.log(`fixturesTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`fixturesTable ${error}`);
  }
}