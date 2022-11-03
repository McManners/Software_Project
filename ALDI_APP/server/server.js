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
const db = require('./models/index');
const PORT = process.env.PORT || 3001;

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(errorHandler);

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// routes
app.use('/logout', require('./routes/logout'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/ticket', require('./routes/ticket'));

var con = mysql.createConnection({
  host: "45.55.136.114",
  user: "dynaF2020",
  password: "b0mbsAway",
  database: "dynaF2020"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});