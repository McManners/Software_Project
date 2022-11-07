const express = require("express");

const config = {
  database: {
    /* don't expose password or any sensitive info, done only for demo */
    // host: "45.55.136.114",
    // user: "dynaF2020",
    // password: "b0mbsAway",
    // database: "dynaF2020",

    host: "localhost",
    username: "root",
    password: "",
    dialect: "mysql",
    database: "aldi_new",
  },
  listPerPage: 10,
};

module.exports = config;