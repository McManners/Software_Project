const express = require('express');
const router = express.Router();
const ticketControllerReturn = require('../controllers/ticketControllerReturn');
const ticketController = require('../controllers/ticketController');

router.get('/', ticketControllerReturn.getAll);
router.get('/email', ticketControllerReturn.getByRefreshToken);
router.post('/create', ticketController.create);

module.exports = router;