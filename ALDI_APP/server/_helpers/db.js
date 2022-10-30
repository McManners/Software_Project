// // const config = require('../config.js');
// const mysql = require('mysql');
// const { Sequelize } = require('sequelize');
// const db = require('../models/index.js');

// module.exports = db = {};

// initialize();

// async function initialize() {
//     // create db if it doesn't already exist
//     // const { host, port, user, password, database } = config.database;
//     const connection = await mysql.createConnection({ host: "localhost", port: "3306", user: "root", password: "" });
//     //await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

//     // connect to db
//     const sequelize = new Sequelize("aldi", "root", "", { dialect: 'mysql' });

//     // init models and add them to the exported db object
//     db.Employee = require('../models/Employee.js')(sequelize, Sequelize);
//     db.Employee_Account = require('../models/Employee_Account.js')(sequelize, Sequelize);
//     db.Ticket = require('../models/Ticket');
//     // sync all models with database
//     await sequelize.sync({ alter: false });
// }