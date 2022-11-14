const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.get('/', ticketController.getAllForRefreshToken);
// router.get('/email', ticketController.getByRefreshToken);
router.post('/create', ticketController.createTicketForRefreshToken); // this needs to be fixed to route /create

module.exports = router;