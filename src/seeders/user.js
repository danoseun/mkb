import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import format from 'pg-format';
import pool from '../config/config';



dotenv.config();


const password = process.env.PASSWORD;


const saltRounds = Number(process.env.SALT_ROUNDS);

const newPassword = bcrypt.hashSync(password, saltRounds);

const email = process.env.EMAIL;
const onemail = process.env.EMAIL_ONE;
const twomail = process.env.EMAIL_TWO;
const threeemail = process.env.EMAIL_THREE;
const emailone = process.env.EMAILL;

const variables = [
  [email, newPassword, 'adminfirst', 'adminlast', true],
  [emailone, newPassword, 'adminsecond', 'adminsecond', true],
  [onemail, newPassword, 'userone', 'lastone', false],
  [twomail, newPassword, 'usertwo', 'lasttwo', false],
  [threeemail, newPassword, 'userthree', 'lastthree', false]
];
const sql = format('INSERT INTO users (email,password,firstname,lastname,is_admin) VALUES %L returning id', variables);

/**
    * Function representing usersSeeder
    * @returns {object} representing success or failure
*/
export async function seedUsers() {
  try {
    const result = await pool.query(sql);
    console.log(`Users ${result.command}ED`);
  } catch (error) {
    console.log(`seedUsers ${error}`);
  }
}