const express = require('express');
const router = express.Router();
const employeeAccountController = require('../controllers/employeeAccountController');

router.get('/', employeeAccountController.getEmailByRefreshToken);

module.exports = router;