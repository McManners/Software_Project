const express = require('express');
const router = express.Router();
const ticketResponseController = require('../controllers/ticketResponseController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);
// router.get('/get', ticketResponseController.createTicketResponse);
router.post('/create', ticketResponseController.createTicketResponse);

module.exports = router;