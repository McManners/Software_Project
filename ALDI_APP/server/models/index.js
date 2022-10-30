'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize("aldi", "root", "", { dialect: 'mysql' });

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
