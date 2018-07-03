import bcrypt from 'bcrypt';

export default {
  /**
   * @description Hash the password
   * @function hashPassword
   * @param {string} password
   * @returns {object} hashed
   */
  hashPassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),

  /**
   * @description Compare the hashed password
   * @function comparePassword
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {object} hashed
   */
  comparePassword: (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword),
};
