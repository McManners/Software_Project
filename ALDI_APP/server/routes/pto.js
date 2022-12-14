const express = require('express');
const router = express.Router();
const ptoController = require('../controllers/ptoController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);
router.post('/create', ptoController.create);

module.exports = router;