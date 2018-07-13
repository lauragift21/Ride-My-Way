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
    const text =
      'INSERT INTO users(firstname, lastname, email, location, password) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const {
      firstname, lastname, email, location, password,
    } = req.body;

    db.query('SELECT * FROM users WHERE email=$1', [email], (err, resp) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: 'An unexpected error occurred',
        });
      }
      if (resp.rowCount > 0) {
        return res.status(409).json({
          success: false,
          message: 'A user with that email already exists',
        });
      }
      return db.query(
        text,
        [firstname, lastname, email, location, bcrypt.hashPassword(password)],
        (errp, result) => {
          if (errp) {
            console.log(errp);
            return res.status(400).json({
              success: false,
              message: 'There was a problem trying to sign up user.',
            });
          }
          // create token with jwt that expires in 24 hours
          const token = jwt.sign({ id: result.rows[0].id }, secret, {
            expiresIn: 86400,
          });
          return res.status(201).json({
            success: true,
            message: 'User registration successful',
            token,
            user: {
              id: result.rows[0].id,
              firstname: result.rows[0].firstname,
              lastname: result.rows[0].lastname,
              email: result.rows[0].email,
              location: result.rows[0].location,
            },
          });
        },
      );
    });
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
        return res.status(400).json({
          success: false,
          message: 'There was a problem trying to sign in user',
        });
      }
      const user = result.rows[0];
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'No user found',
        });
      }
      const encryptPassword = result.rows[0].password;
      const validPassword = bcrypt.comparePassword(password, encryptPassword);
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: 'Email or Password does not match',
        });
      }
      const token = jwt.sign({ id: result.rows[0].id }, secret, {
        expiresIn: 86400,
      });
      return res.status(200).json({
        success: true,
        message: 'user login successful',
        token,
        user: {
          id: result.rows[0].id,
          firstname: result.rows[0].firstname,
          lastname: result.rows[0].lastname,
          email: result.rows[0].email,
          location: result.rows[0].location,
        },
      });
    });
  },
};
