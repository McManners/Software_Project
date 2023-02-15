const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);
router.get('/getEmployees', employeeController.getLeaderEmployees);

module.exports = router;