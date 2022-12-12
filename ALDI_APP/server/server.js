// https://stackoverflow.com/questions/51025903/hosting-react-app-on-godaddy
// https://stackoverflow.com/questions/58425708/how-to-deploy-react-app-to-godaddy-server
// https://v5.reactrouter.com/web/api/BrowserRouter/basename-string

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
// const db = require('./models/index');
const db = require('./_helpers/db');
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
app.use('/pto', require('./routes/pto'));
app.use('/status', require('./routes/status'));
app.use('/ticketresponse', require('./routes/ticketresponse'));
app.use('/ptobalance', require('./routes/ptobalance'));

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

const winston = require('winston');

const log = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  log.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}