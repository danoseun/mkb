import format from 'pg-format';
import pool from '../config/config';




const link='https://mockpremierleague/api/fixtures/330e0f3f-cf36-48f7-988b-17620218eece0rl5l8mkyydbdc5c550b'

const variables = [
  ['Temitayo FC', 'Liveasy United', 2, 0,'2020-01-19', 'temitayo pitch',link, true],
  ['Liveasy United', 'Temitayo FC', 2, 0, '2020-01-12', 'liveasy pitch',link, true],
  ['Lasisi FC', 'Slayers FC', 2, 0, '2020-01-11', 'lasisi trafford',link, false],
  ['Liveasy United', 'Slayers FC', 0, 0, '2020-01-02', 'liveasy pitch',link, false],
  ['Yolotoure FC', 'Temitayo FC', 2, 0, '2020-01-03', 'yolo house',link, false],
  ['Liveasy United', 'Vienna FC', 4, 0, '2020-01-04', 'liveasy pitch',link, false],
  ['Farcelona', 'Temitayo FC', 0, 3, '2020-01-05', 'farcelona camp',link, true],
  ['Hammers FC', 'Slayers FC', 2, 0, '2020-01-05', 'hammers stadium',link, true],
  ['Arselona FC', 'Xpress FC', 0, 0, '2020-01-02', 'arselona pitch',link, true],
  ['Xpress FC', 'Arselona FC', 2, 0, '2020-01-02', 'xpress pitch',link, false],
  ['Dirtysanchez United', 'Xpress FC', 0, 1, '2020-01-12', 'sanchez camp',link, true],
];
const sql = format('INSERT INTO fixtures (hometeam,awayteam,hometeamscore,awayteamscore,matchdate,venue,link,completed) VALUES %L returning id', variables);

/**
    * Function representing fixturesSeeder
    * @returns {object} representing success or failure
*/
export async function seedFixtures() {
  try {
    const result = await pool.query(sql);
    console.log(`Fixtures ${result.command}ED`);
  } catch (error) {
    console.log(`seedFixtures ${error}`);
  }
}