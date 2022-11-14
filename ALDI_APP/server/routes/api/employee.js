const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const ROLES_LIST = require('../../config/roles_lost');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(employeeController.getAllEmployees)
    .put(employeeController.createNewEmployee)
    // .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

router.route('/api/employee')
    .get(employeeController.getAll());
    
router.route('/:eid')
    .get(employeeController.getEmployees);

module.exports = router;