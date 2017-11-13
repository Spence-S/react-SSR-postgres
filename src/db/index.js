import Sequelize from 'sequelize';
import chalk from 'chalk';

const sequelize = new Sequelize('postgres://Spencer@localhost:5432/Test', {
  benchmark: true,
  logging: (msg, time) =>
    console.log(
      // pretty custom logging
      chalk.magenta(`\n${msg}${chalk.cyan(`\nExecution time of ${time}ms`)}`)
    ),
  operatorsAliases: false // better security -- future deprecation
});

export { Sequelize as db };
export default sequelize;
