const express = require('express');
const router = express.Router();
const ptoBalanceController = require('../controllers/ptoBalanceController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.get('/', ptoBalanceController.getPTOBalance);
router.get('/employee', ptoBalanceController.getEmployee);

module.exports = router;