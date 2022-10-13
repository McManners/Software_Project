require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const mysql = require('mysql');
const db = require('./config/db');
const PORT = process.env.PORT || 3001;

// Connect to db
// db();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and feetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencorded form data
// ie form data: 'content-type: application/x-www-form-url-encoded'
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

app.use(errorHandler);

// routes
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));

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
const logEvents = require("./middleware/logEvents");
const Employee = require('./models/Employee');
app.get("/api/test"), (req, res) => {
    console.log("test");
    Employee.findOne( { employee_id: { employee_id: "1" } })
    .then((e) => {
        res.json(e);
    });
}
app.get("/api/employe", (req, res) => {
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