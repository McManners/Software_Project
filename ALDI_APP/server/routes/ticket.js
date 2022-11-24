const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.get('/', ticketController.getAll);
router.post('/create', ticketController.createTicket);
router.get('/get/leader', ticketController.getAllLeaderTickets);

module.exports = router;