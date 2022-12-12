const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);
router.get('/closed', ticketController.getAllClosed);
router.get('/pending', ticketController.getAllPending);
router.post('/create', ticketController.createTicket);
router.get('/get/leader', ticketController.getAllLeaderTickets);
router.post('/response', ticketController.createResponse)

module.exports = router;