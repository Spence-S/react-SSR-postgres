import sequelize, { db } from '../../db';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcryptjs';

const User = sequelize.define('user', {
  id: { primaryKey: true, type: db.UUID, defaultValue: db.UUIDV4 },
  firstName: {
    type: db.STRING
  },
  lastName: {
    type: db.STRING
  },
  email: {
    type: db.STRING,
    isEmail: true
  },
  password: {
    type: db.STRING
  },
  salt: {
    type: db.STRING
  }
});

// sequelize hooks should return promises for async actions
// http://docs.sequelizejs.com/manual/tutorial/hooks.html#declaring-hooks
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

User.prototype.isValidPw = function(pw) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pw, this.password, function(err, res) {
      resolve(res);
    });
  });
};

User.sync({ force: true })
  .then(() => {
    console.log('added that bum jogn');
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
  .catch(err => console.log(err));

export default User;
