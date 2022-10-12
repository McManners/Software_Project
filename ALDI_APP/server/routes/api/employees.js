const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);
router.route('/api/employees')
    .get(employeeController.getAll());
    
router.route('/:employee_id')
    .get(employeeController.getEmployees);

module.exports = router;