// server/index.js

const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();
// var sql = require('mysql');
var mysql = require('mysql');
const { stringify } = require("querystring");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "aldi"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM employee", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    return result;
  });
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// THIS WORKS!
// app.get("/api/employee", (req, res) => {
//     con.query("SELECT * FROM employee", function (err, result, fields) {
//         console.log(result);
//         res.json(result);
//     });
// });
const employeeController = require('./controllers/employeeController');
app.get("/api/employees", (req, res) => {
    employeeController.getAll()
    .then((employees) => {
        res.json(employees);
    });
});
app.get("/api/employees/:employee_id", (req, res) => {
    employeeController.getById(req.params.employee_id)
    .then((employee) => {
        res.json(employee);
    });
});
// GET API
// app.get("/api/employee/:id", (req, res) => {
//     con.query("SELECT * FROM employee WHERE employee_id = " + req.params.id, function (err, result, fields) {
//         console.log(result);
//         res.json(result);
//     });
// });
// app.put("/api/employee/create", (req, res) => {
//     con.query("INSERT INTO title(title, vacation_days, sick_days, personal_days) VALUES ('test', 10, 10, 10)", function (err, result, fields) {
//         console.log("cool");
//         res.json(result);
//     });
// });
app.put("/api/employees/create", (req, res) => {
    employeeController.create({ 
        employee_id: 12, 
        first_name: "Frankie", 
        last_name: "Salerno", 
        email: "frankiesalerno@gmail.com",
        hire_date: 11162003,
        supervisor_id: 11,
        employee_type_id: 2
    });
    });

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});