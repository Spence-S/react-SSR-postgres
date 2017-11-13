import sequelize, { db } from '../../db';

const User = sequelize.define('user', {
  firstName: {
    type: db.STRING
  }
});

User.sync({ force: true }).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

export default User;
