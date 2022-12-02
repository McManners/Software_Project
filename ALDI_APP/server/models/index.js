'use strict';

/**
 * NOTE: EMPLOYEE.EMAIL is NOT equal to ACCOUNT.EMAIL, they can be DIFFERENT...maybe...
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
console.log("test");
// const sequelize = new Sequelize( "dynaF2020", "dynaF2020", "b0mbsAway", { dialect: 'mysql' });
// const sequelize = new Sequelize("mysql:45.55.136.114", { database: "dynaF2020", username: "dynaF2020", password: "b0mbsAway", dialect: 'mysql' })
const sequelize = new Sequelize("mysql:localhost", { database: "aldi_new", username: "root", password: "", dialext: "mysql" });
console.log("hey how yall doing from index.js model")
/**
 * Import and attach all of the model definitions within this 'models' directory to the sequelize instance.
 * https://stackoverflow.com/questions/55896380/sequelize-js-include-unexpected-element-has-to-be-either-a-model-an-associati 
*/
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // Here is where file tree order matters... the sequelize const may not have the required model added to it yet
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  // We need to add scopes that reference other tables once they have all been initialized
  if (db[modelName].addScopes) {
    db[modelName].addScopes(db);
  }
});

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
