import format from 'pg-format';
import pool from '../config/config';


const variables = [
  ['Temitayo FC'],
  ['Liveeasy United'],
  ['Lasisi FC'],
  ['Slayers FC'],
  ['Rampage FC'],
  ['Pros FC'],
  ['Cyclones United'],
  ['Xpress FC'],
  ['Dirtysanchez United'],
  ['Yolotoure FC'],
  ['Farcelona FC'],
  ['Banatalona United'],
  ['Arselona FC'],
  ['Vienna FC'],
  ['Hammers FC']
];
const sql = format('INSERT INTO teams (name) VALUES %L returning id', variables);

/**
    * Function representing teamsSeeder
    * @returns {object} representing success or failure
*/
export async function seedTeams() {
  try {
    const result = await pool.query(sql);
    console.log(`Teams ${result.command}ED`);
  } catch (error) {
    console.log(`seedTeams ${error}`);
  }
}