const express = require('express');
const router = express.Router();
const ptoController = require('../controllers/ptoController');

router.get('/', ptoController.getPTOByRefreshToken);

module.exports = router;