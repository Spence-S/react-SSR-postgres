import sequelize, { db } from '../../db';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcryptjs';
import chalk from 'chalk';

const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    type: db.UUID,
    defaultValue: db.UUIDV4
  },
  firstName: {
    type: db.STRING
  },
  lastName: {
    type: db.STRING
  },
  email: {
    type: db.STRING,
    isEmail: true,
    unique: true
  },
  password: {
    type: db.STRING
  },
  salt: {
    type: db.STRING
  }
});

/**
 * remove password and salt from responses
 */
User.prototype.toJSON = function() {
  const { password, salt, ...rest } = this.get();
  return rest;
};

/**
 * sequelize hooks should return promises for async actions
 * http://docs.sequelizejs.com/manual/tutorial/hooks.html#declaring-hooks
 */
User.beforeCreate((user, options) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) reject(err);
        user.salt = salt;
        user.password = hash;
        resolve();
      });
    });
  });
});

/**
 * @param {string} pw - password to compare to password hash in db
 */
User.prototype.isValidPw = function(pw) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pw, this.password, function(err, res) {
      resolve(res);
    });
  });
};

User.sync({ force: true })
  .then(() => {
    console.log(chalk.blue("\nUser's table has synced successfully"));
    User.create({
      firstName: 'John',
      lastName: 'Hancock',
      email: 'john@1234.com',
      id: uuidv4(),
      role: 'user',
      salt: '',
      password: 'password'
    });
  })
  .catch(err => console.log(chalk.red(err)));

export default User;
