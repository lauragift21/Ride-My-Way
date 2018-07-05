import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../db/index';
import bcrypt from '../helpers/bcrypt';

dotenv.config();

const secret = process.env.SECRET_KEY;
export default {
  /**
   * @description create a new user
   *
   * @function createUser
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} json data
   */
  createUser: (req, res) => {
    // hash password with bcrypt with salt round 10
    const text =
    'INSERT INTO users(firstname, lastname, email, location, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const {
      firstname, lastname, email, location, password,
    } = req.body;
    db.query(
      text,
      [firstname, lastname, email, location, bcrypt.hashPassword(password)],
      (err, result) => {
        if (err) {
          console.log(err, '>>>>>>>>>>>>>>>>>>>>>>');
          return res.status(500).json({
            message: 'There was a problem trying to sign up user.',
          });
        }
        // create token with jwt that expires in 24 hours
        const token = jwt.sign({ id: result.rows[0].id }, secret, {
          expiresIn: 86400,
        });
        return res.status(201).json({
          message: 'User registration successful',
          token,
        });
      },
    );
  },
  /**
   * @description login an existing user
   *
   * @function loginUser
   * @param {object} req
   * @param {object} res
   * @returns {object} json data
   */
  loginUser: (req, res) => {
    const text = 'SELECT * FROM users WHERE email=$1';
    const { email, password } = req.body;
    db.query(text, [email], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: 'There was a problem trying to sign in user',
        });
      } else if (!result) {
        return res.status(404).json({
          message: 'No user found',
        });
      }
      const user = result.rows[0];
      const validPassword = bcrypt.comparePassword(password, user.password);
      if (!validPassword) {
        return res.status(401).json({
          message: 'Password does not match',
        });
      }
      const token = jwt.sign({ id: result.rows[0].id }, secret, {
        expiresIn: 86400,
      });
      return res.status(200).json({
        message: 'user login successful',
        token,
      });
    });
  },
};
